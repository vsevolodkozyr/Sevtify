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



        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var playlists =  _playlistService.GetAll();
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

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] CreatePlaylistDto dto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

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
        
        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] CreatePlaylistDto dto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

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

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                if (id == 0) return Problem(
                            title: "Плейлсит Favorite заборонено змінювати",
                            statusCode: 403);
                var playlist = _playlistService.GetById(id);
                if (playlist is null) return NotFound("Playlist was not found");
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
        [HttpGet("{id:int}/tracks")]
        public IActionResult GetPlaylistWithTracks(int id)
        {
            var playlist = _playlistService.GetById(id);
            if (playlist is null) return NotFound("Not found");

            var updatedPlaylist = _playlistService.GetPlaylistWithTracks(id);

            return Ok(updatedPlaylist);
        }

        [HttpPost("{id:int}/tracks")]
        public IActionResult AddTrackToPlaylist(int id,[FromBody] AddTrackDto dto)
        {
            try
            {
                int trackId = dto.Id;
                var checkPlaylist = _playlistService.GetById(id);
                if (checkPlaylist is null) return NotFound("Not found");
                var playlist = _playlistService.AddTrackToPlaylist(id, trackId);
                if (playlist is null) return NotFound("Not found");
                return Ok(playlist);

            }
            catch (Exception ex) {
                return Problem(
                              detail: ex.Message,
                              title: "Internal Server Error",
                              statusCode: 500);

            }

        }
        [HttpDelete("{id:int}/tracks")]
        public IActionResult RemoveTrackFromPlaylist(int id, [FromBody] AddTrackDto dto)
        {
            try
            {
                int trackId = dto.Id;
                var checkPlaylist = _playlistService.GetById(id);
                if (checkPlaylist is null) return NotFound("Not found");
                var playlist = _playlistService.RemoveTrackFromPlaylist(id, trackId);
                if (playlist is null) return NotFound("Not found");
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
        [HttpGet("has/track/{id:int}")]
        public IActionResult PlaylistsHasTrack(int id)
        {
            try
            {
                // First check if track exists
                var track = _trackService.GetById(id);
                if (track is null)
                    return NotFound(new { message = $"Track with id={id} not found" });

                // Track exists — return all playlists with isActive flag
                var playlists = _playlistService.PlaylistsHasTrack(id);
                return Ok(playlists); // always 200 with array (can be empty)
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
