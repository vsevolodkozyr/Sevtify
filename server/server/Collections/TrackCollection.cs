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
            var query = _tracks.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(t =>
                    t.Title.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                    t.Author.Contains(search, StringComparison.OrdinalIgnoreCase)
                );
            }

            if (!string.IsNullOrWhiteSpace(genre))
            {
                query = query.Where(t =>
                    t.Genre.Equals(genre, StringComparison.OrdinalIgnoreCase)
                );
            }


            if (startDate.HasValue)
            {
                query = query.Where(t => t.CreatedAt >= startDate.Value.Date);
            }


            if (endDate.HasValue)
            {
                var endOfDay = endDate.Value.Date.AddDays(1).AddTicks(-1);
                query = query.Where(t => t.CreatedAt <= endOfDay);
            }
            
            return query.ToList();
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
            var track = this.GetById(id);
            if (track is null) return track;
            _tracks.Remove(track);
            return track;
        }
        public Track? Update(int id, Track updatedTrack)
        {
            var track = this.GetById(id);
            if (track is null) return track;
            track.Title = updatedTrack.Title;
            track.Author = updatedTrack.Author;
            track.Genre = updatedTrack.Genre;
            track.ImagePath = updatedTrack.ImagePath;
            return track;
        }



        public List<Track> ToList() => _tracks;
    }
}
