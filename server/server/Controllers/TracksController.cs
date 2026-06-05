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

        // GET api/tracks Запит на отриманян всіх треків відповіно до параметрів
        [HttpGet]
        public IActionResult GetAll([FromQuery] TracksGetAllDto dto)
        {
            try
            {
                if (dto.startDate.HasValue && dto.endDate.HasValue && dto.startDate > dto.endDate)
                {
                    return Problem(
                    detail: "Start date cannot be later than end date.",
                    title: "Invalid Date Range",
                    statusCode: 400
        );
                }
                    var tracks = _trackService.GetAll(dto.search, dto.genre, dto.startDate, dto.endDate);
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

   
        // POST api/tracks Створення треку 
        [HttpPost]
        [Consumes("multipart/form-data")] 
        public async Task<IActionResult> Create([FromForm] CreateTrackDto dto)
        {
            try
            {
                if (dto.ImageFile is not null)
                {
                   _fileService.ValidateImage(dto.ImageFile);
                }

               
                if (dto.TrackFile is not null)
                {
                  _fileService.ValidateAudio(dto.TrackFile);
                }


                string imagePath = string.Empty;
                string audioPath = string.Empty;

                if (dto.ImageFile is not null)
                    imagePath = await _fileService.SaveFileAsync(dto.ImageFile, "Images");


                if (dto.TrackFile is not null)
                    audioPath = await _fileService.SaveFileAsync(dto.TrackFile, "Tracks");

                var track = _trackService.Create(dto, imagePath, audioPath);
                return Created($"/api/tracks/{track.Id}", track);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
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

        // GET api/tracks/:id Отримати трек за його id, якщо не знайдено повертати 404
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


        // DELETE api/tracks/:id Видалення трек за його id
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var deletedTrack = _trackService.Delete(id);
                if (deletedTrack is null) return NotFound(new { message = $"Трек з id={id} не знайдено" });
                _fileService.DeleteFile(deletedTrack.ImagePath);
                _fileService.DeleteFile(deletedTrack.TrackPath);
                _playlistService.RemoveTrackFromAll(id);
                return Ok(deletedTrack);
            }
            catch (Exception ex) {
                return Problem(
                detail: ex.Message,
                title: "Internal Server Error",
                statusCode: 500
            );
            }
        }

        // PUT api/tracks/:id Оновити дані про трек за його id
        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] UpdateTrackDto dto)
        {
            try
            {
                var existingTrack = _trackService.GetById(id);
                if (existingTrack is null) return NotFound(new { message = $"Трек з id={id} не знайдено" });

                if (dto.ImageFile is not null)
                {
                   _fileService.ValidateImage(dto.ImageFile);
                }

                string imagePath = string.Empty;

                if (dto.ImageFile is not null)
                    imagePath = await _fileService.SaveFileAsync(dto.ImageFile, "Images");

                string oldTrackImagePath = string.Empty;
                if (imagePath != string.Empty)
                {
                    oldTrackImagePath = existingTrack.ImagePath;
                }

                var track = _trackService.Update(id, dto, imagePath);
                if (track is null) return NotFound("Track does not exist");
                if (oldTrackImagePath != string.Empty) _fileService.DeleteFile(oldTrackImagePath);
                return Created($"/api/tracks/{track.Id}", track);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message }); 
            }
            catch (IOException ex)
            {
                return Problem(
            detail: $"Failed to save file: {ex.Message}",
            title: "File Save Error",
            statusCode: 500
        );
            }
            catch (Exception ex)
            {
                return Problem(
            detail: ex.Message,
            title: "Internal Server Error",
            statusCode: 500
        );
            }
        }
    }
}
