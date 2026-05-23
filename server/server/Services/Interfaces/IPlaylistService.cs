using server.DTOs;
using server.Models;

namespace server.Services.Interfaces
{
    public interface IPlaylistService
    {
        List<Playlist> GetAll();
        Playlist Create(CreatePlaylistDto dto,string imagePath);
        Playlist? Update(int id, CreatePlaylistDto dto,string imagePath);
        Playlist? Delete(int id);
        Playlist? GetById(int id);

        Playlist? GetPlaylistWithTracks(int id);

        Playlist? AddTrackToPlaylist(int id, int trackId);
        Playlist? RemoveTrackFromPlaylist(int id, int trackId);
        List<PlaylistHasTrackDto> PlaylistsHasTrack(int trackId);

        void RemoveTrackFromAll(int id);

    }
}
