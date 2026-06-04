using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Models;
using server.Services;
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaylistsController : Controller
    {
        private readonly IPlaylistService _playlistService;
        private readonly ITrackService _trackService;
        private readonly FileService _fileService;

        public PlaylistsController(IPlaylistService playlistService,ITrackService trackService, FileService fileService)
        {
            _playlistService = playlistService;
            _trackService = trackService;
            _fileService = fileService;
        }




        // GET api/playlists Отримання всіх плейлистів за параметром
        [HttpGet]
        public IActionResult GetAll([FromQuery] string? search)
        {
            try
            {
                var playlists =  _playlistService.GetAll(search);
                return Ok(playlists);
            }
            catch (Exception ex)
            {
                 return Problem(
                    detail: ex.Message,
                    title: "Internal Server Error",
                    statusCode: 500);
            }
        }

         // POST api/playlists Створення нового плейлисту
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] CreatePlaylistDto dto)
        {
            try
            {

                if (dto.ImageFile is not null)
                {
                    var allowedImageExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp", ".jfif" };

                    var imageExtension = Path.GetExtension(dto.ImageFile.FileName).ToLowerInvariant();

                    if (!allowedImageExtensions.Contains(imageExtension))
                    {
                        return BadRequest(new { message = $"Неприпустимий формат зображення. Дозволені формати: {string.Join(", ", allowedImageExtensions)}" });
                    }
                }


                string imagePath = string.Empty;
                if (dto.ImageFile is not null)
                    imagePath = await _fileService.SaveFileAsync(dto.ImageFile, "Images");


                var track = _playlistService.Create(dto, imagePath);
                return Created($"/api/playlists/{track.Id}", track);
            }
            catch (Exception ex) {
                return Problem(
                        detail: ex.Message,
                        title: "Internal Server Error",
                        statusCode: 500);

            }
        
        }


        // GET api/playlists/{id:int} Отримання пелйлисту за його id
        [HttpGet("{id:int}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var playlist = _playlistService.GetById(id);
                return playlist is null
                    ? NotFound(new { message = $"Плейлист з id={id} не знайдено" })
                    : Ok(playlist);
            }
            catch (Exception ex)
            {
                return Problem(
                            detail: ex.Message,
                            title: "Internal Server Error",
                            statusCode: 500);

            }
        }

        // PUT api/playlists/{id:int}
        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] UpdatePlaylistDto dto)
        {
            try
            {
                if (dto.ImageFile is not null)
                {
                    var allowedImageExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp", ".jfif" };

                    var imageExtension = Path.GetExtension(dto.ImageFile.FileName).ToLowerInvariant();

                    if (!allowedImageExtensions.Contains(imageExtension))
                    {
                        return BadRequest(new { message = $"Неприпустимий формат зображення. Дозволені формати: {string.Join(", ", allowedImageExtensions)}" });
                    }
                }

                if (id == 0) return Problem(
                            title: "Плейлсит Favorite заборонено змінювати",
                            statusCode: 403);

                string imagePath = string.Empty;

                if (dto.ImageFile is not null)
                    imagePath = await _fileService.SaveFileAsync(dto.ImageFile, "Images");
                if (imagePath != string.Empty)
                {
                    var oldTrack = _playlistService.GetById(id);
                    if (oldTrack is null) return NotFound("Track now found!");
                    _fileService.DeleteFile(oldTrack.ImagePath);
                }

                var playlist = _playlistService.Update(id, dto, imagePath);
                if (playlist is null) return NotFound("Track does not exist");
                return Created($"/api/tracks/{playlist.Id}", playlist);
            }
            catch (Exception ex) {
                return Problem(
                            detail: ex.Message,
                            title: "Internal Server Error",
                            statusCode: 500);

            }
        }

        // DELETE api/playlists/{id:int} Видалити плейлсит за його id
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                
                var playlist = _playlistService.GetById(id);
                if (playlist is null) return NotFound(new { message = $"Плейлист з id={id} не знайдено" });

                if (id == 0 || !playlist.IsDeletable) return Problem(
                            title: "Плейлсит Favorite заборонено змінювати",
                            statusCode: 403);
                if (!playlist.IsDeletable) return Problem(
                            title: "Плейлсит заборонено змінювати",
                            statusCode: 403);
                var deletedPlaylist = _playlistService.Delete(id);
                if(deletedPlaylist != null)
                {
                _fileService.DeleteFile(deletedPlaylist.ImagePath);
                }
                return Ok(deletedPlaylist);
            }
            catch (Exception ex) {
                return Problem(
                           detail: ex.Message,
                           title: "Internal Server Error",
                           statusCode: 500);

            }
        }

        // GET api/playlists/{id:int}/tracks Отримати плейлист з усіма його треками по id
        [HttpGet("{id:int}/tracks")]
        public IActionResult GetPlaylistWithTracks(int id)
        {
            var playlist = _playlistService.GetById(id);
            if (playlist is null) return NotFound(new { message = $"Плейлист з id={id} не знайдено" });

            var updatedPlaylist = _playlistService.GetPlaylistWithTracks(id);

            return Ok(updatedPlaylist);
        }

        // POST api/playlists/{id:int}/tracks Додати id треку до плейлисту за його id
        [HttpPost("{id:int}/tracks")]
        public IActionResult AddTrackToPlaylist(int id,[FromBody] AddTrackDto dto)
        {
            try
            {
                
                int trackId = dto.Id;
                var checkPlaylist = _playlistService.GetById(id);
                if (checkPlaylist is null) return NotFound(new { message = $"Плейлист з id={id} не знайдено" });
                var playlist = _playlistService.AddTrackToPlaylist(id, trackId);
                if (playlist is null) return NotFound(new { message = $"Плейлист з id={id} не знайдено" });
                return Ok(playlist);

            }
            catch (Exception ex) {
                return Problem(
                              detail: ex.Message,
                              title: "Internal Server Error",
                              statusCode: 500);

            }

        }


        // DELETE api/playlists/{id:int}/tracks Видалити трек з плейлисту по id
        [HttpDelete("{id:int}/tracks")]
        public IActionResult RemoveTrackFromPlaylist(int id, [FromBody] AddTrackDto dto)
        {
            try
            {
               
                int trackId = dto.Id;
                var checkPlaylist = _playlistService.GetById(id);
                if (checkPlaylist is null) return NotFound(new { message = $"Плейлист з id={id} не знайдено" });
                var playlist = _playlistService.RemoveTrackFromPlaylist(id, trackId);
                if (playlist is null) return NotFound(new { message = $"Плейлист з id={id} не знайдено" });
                return Ok(playlist);

            }
            catch (Exception ex)
            {
                return Problem(
                              detail: ex.Message,
                              title: "Internal Server Error",
                              statusCode: 500);

            }
        }

        // GET api/playlists/has/track/{id:int} 
        // Отримання списку плейлистів де присутній трек
        [HttpGet("has/track/{id:int}")]
        public IActionResult PlaylistsHasTrack(int id)
        {
            try
            {
                 var track = _trackService.GetById(id);
                if (track is null)
                    return NotFound(new { message = $"Track with id={id} not found" });
                var playlists = _playlistService.PlaylistsHasTrack(id);
                return Ok(playlists);
            }
            catch (Exception ex)
            {
                return Problem(
                    detail: ex.Message,
                    title: "Internal Server Error",
                    statusCode: 500);
            }
        }
    }
}
