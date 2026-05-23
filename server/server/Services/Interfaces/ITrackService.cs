using server.DTOs;
using server.Models;

namespace server.Services.Interfaces
{
    public interface ITrackService
    {
        List<Track> GetAll(string? search = null);
        Track Create(CreateTrackDto dto,string imagePath,string trackPath);
        Track? GetById(int id);
        Track? Delete(int id);
        Track? Update(int id, CreateTrackDto dto, string imagePath);
    }
}
