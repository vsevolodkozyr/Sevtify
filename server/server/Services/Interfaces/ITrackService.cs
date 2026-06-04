using server.DTOs;
using server.Models;

namespace server.Services.Interfaces
{
    public interface ITrackService
    {
        List<Track> GetAll(string? search = null, string? genre = null, DateTime? startDate = null, DateTime? endDate = null);
        Track Create(CreateTrackDto dto,string imagePath,string trackPath);
        Track? GetById(int id);
        Track? Delete(int id);
        Track? Update(int id, UpdateTrackDto dto, string imagePath);
    }
}
