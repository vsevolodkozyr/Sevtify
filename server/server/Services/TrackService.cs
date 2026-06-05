using server.Collections;
using server.DTOs;
using server.Models;
using server.Repositories;
using server.Services.Interfaces;

namespace server.Services
{
    public class TrackService : ITrackService
    {
        private readonly JsonRepository<Track> _repo;
        private readonly TrackCollection _col;


        public TrackService(IConfiguration config)
        {
            _repo = new JsonRepository<Track>(config["DataPaths:Tracks"]!);
            _col = new TrackCollection(_repo.GetAll());
        }

        public List<Track> GetAll(string? search = null, string? genre = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            var tracks = _col.GetAll(search, genre, startDate, endDate);
            return tracks;
        }

        public Track Create(CreateTrackDto dto,string imagePath,string trackPath)
        {
            var tracks = _repo.GetAll();
            var track = new Track
            {
                Id = tracks.Count > 0 ? tracks.Max(t => t.Id) + 1 : 1,
                Title = dto.Title.Trim(),
                Author = dto.Author.Trim(),
                Genre = dto.Genre.Trim(),
                ImagePath = imagePath,
                TrackPath = trackPath,
            };
            tracks.Add(track);
            _repo.SaveAll(tracks);
            return track;
        }

        public Track? GetById(int id) =>
        _repo.GetAll().FirstOrDefault(t => t.Id == id);

        public Track? Delete(int id)
        {
            var tracks = _repo.GetAll();
            var track = tracks.FirstOrDefault(t => t.Id == id);
            if (track is null) return track;
            tracks.Remove(track);
            
            _repo.SaveAll(tracks);
            return track;
        }
        public Track? Update(int id, UpdateTrackDto dto, string imagePath)
        {
            var tracks = _repo.GetAll();
            var track = tracks.FirstOrDefault(t => t.Id == id);
            if(track is null) return null;
            tracks.Remove(track);
            
            var updateTrack = new Track
            {
                Id = track.Id,
                Title = dto.Title.Trim(),
                Author = dto.Author.Trim(),
                Genre = dto.Genre.Trim(),
                ImagePath = imagePath != string.Empty ? imagePath : track.ImagePath,
                TrackPath = track.TrackPath,
            };
            tracks.Add(updateTrack);
            _repo.SaveAll(tracks);
            return updateTrack;

        }
    }
}
   
    
