using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using server.DTOs;
using server.Services;
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TracksController : Controller
    {
        private readonly ITrackService _trackService;
        private readonly IPlaylistService _playlistService;
        private readonly FileService _fileService;


        public TracksController(ITrackService trackService, FileService fileService, IPlaylistService playlistService)
        {
            _trackService = trackService;
            _fileService = fileService;
            _playlistService = playlistService;
        }

        // Get all Tracks
        [HttpGet]
        public IActionResult GetAll([FromQuery] string? search)
        {
            try
            {
                var tracks = _trackService.GetAll(search);
                return Ok(tracks);
            }
            catch(Exception ex)
            {
                return Problem(
            detail: ex.Message,
            title: "Internal Server Error",
            statusCode: 500
        );
            }
            
        }

   
        // Create Track     
        [HttpPost]
        [Consumes("multipart/form-data")] 
        public async Task<IActionResult> Create([FromForm] CreateTrackDto dto)
        {
            try
            {



                if (!ModelState.IsValid) return BadRequest(ModelState);

                string imagePath = string.Empty;
                string audioPath = string.Empty;


                if (dto.ImageFile is not null)
                    imagePath = await _fileService.SaveFileAsync(dto.ImageFile, "Images");


                if (dto.TrackFile is not null)
                    audioPath = await _fileService.SaveFileAsync(dto.TrackFile, "Tracks");

                var track = _trackService.Create(dto, imagePath, audioPath);
                return Created($"/api/tracks/{track.Id}", track);
            }
            catch (IOException ex)
            {
                return Problem(
            detail: $"Failed to save file: {ex.Message}",
            title: "File Save Error",
            statusCode: 500
        );
            }
            catch(Exception ex)
            {
                return Problem(
            detail: ex.Message,
            title: "Internal Server Error",
            statusCode: 500
        );
            }
        }

        // Get Track by Id
        [HttpGet("{id:int}")]  
        public IActionResult GetById(int id)  
        {
            try
            {


                var track = _trackService.GetById(id);
                return track is null
                    ? NotFound(new { message = $"Трек з id={id} не знайдено" })
                    : Ok(track);
            }
            catch (Exception ex) {
                return Problem(
                detail: ex.Message,
                title: "Internal Server Error",
                statusCode: 500
            );
            }

            }


        // Delete Track by Id
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var track = _trackService.GetById(id);
                if (track is null) return NotFound();
                _trackService.Delete(id);
                _playlistService.RemoveTrackFromAll(id);
                return Ok(track);
            }
            catch (Exception ex) {
                return Problem(
                detail: ex.Message,
                title: "Internal Server Error",
                statusCode: 500
            );
            }
        }

        // Update Track's Title Author or Image by Id
        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] CreateTrackDto dto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                string imagePath = string.Empty;

                if (dto.ImageFile is not null)
                    imagePath = await _fileService.SaveFileAsync(dto.ImageFile, "Images");
                if (imagePath != string.Empty)
                {
                    var oldTrack = _trackService.GetById(id);
                    if (oldTrack is null) return NotFound("Track now found!");
                    _fileService.DeleteFile(oldTrack.ImagePath);
                }

                var track = _trackService.Update(id, dto, imagePath);
                if (track is null) return NotFound("Track does not exist");
                return Created($"/api/tracks/{track.Id}", track);
            }
            catch (Exception ex) {
                return Problem(
                detail: $"Failed to save file: {ex.Message}",
                title: "File Save Error",
                statusCode: 500
            );
            }
            }
    }
}
