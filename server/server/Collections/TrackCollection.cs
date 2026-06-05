using server.DTOs;
using server.Models;
using System.Diagnostics;

namespace server.Collections
{
    public class TrackCollection
    {

        private List<Track> _tracks;
        
        public TrackCollection(List<Track> tracks)
        {
            _tracks = tracks ?? new List<Track>();
        }

        public List<Track> GetAll(string? search = null, string? genre = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            

            if (!string.IsNullOrWhiteSpace(search))
            {
                _tracks = _tracks.Where(t =>
                    t.Title.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    t.Author.Contains(search, StringComparison.OrdinalIgnoreCase)
                ).ToList();
            }

            if (!string.IsNullOrWhiteSpace(genre))
            {
                _tracks = _tracks.Where(t =>
                    t.Genre.Equals(genre, StringComparison.OrdinalIgnoreCase)
                ).ToList();
            }


            if (startDate.HasValue)
            {
                _tracks = _tracks.Where(t => t.CreatedAt >= startDate.Value.Date).ToList();
            }


            if (endDate.HasValue)
            {
                var endOfDay = endDate.Value.Date.AddDays(1).AddTicks(-1);
                _tracks = _tracks.Where(t => t.CreatedAt <= endOfDay).ToList();
            }
            
            return _tracks;
        }

        public Track Create(Track track)
        {
            track.Id = _tracks.Count > 0 ? _tracks.Max(t => t.Id) + 1 : 1;
            track.CreatedAt = DateTime.UtcNow;
            _tracks.Add(track);
            return track;
        }

        public Track? GetById(int id)
        {
            return _tracks.FirstOrDefault(t => t.Id == id);
        }

        public Track? Delete(int id)
        {
            var track = _tracks.FirstOrDefault(t => t.Id == id);
            if (track is null) return track;
            _tracks.Remove(track);
            return track;
        }


        public List<Track> ToList() => _tracks;
    }
}
