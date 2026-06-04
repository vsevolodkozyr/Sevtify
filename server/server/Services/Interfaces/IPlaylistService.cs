using server.DTOs;
using server.Models;

namespace server.Services.Interfaces
{
    public interface IPlaylistService
    {
        void SeedFavoritePlaylist();


        List<Playlist> GetAll(string search);
        Playlist Create(CreatePlaylistDto dto,string imagePath);
        Playlist? Update(int id, UpdatePlaylistDto dto,string imagePath);
        Playlist? Delete(int id);
        Playlist? GetById(int id);

        Playlist? GetPlaylistWithTracks(int id);

        Playlist? AddTrackToPlaylist(int id, int trackId);
        Playlist? RemoveTrackFromPlaylist(int id, int trackId);
        List<PlaylistHasTrackDto> PlaylistsHasTrack(int trackId);

        void RemoveTrackFromAll(int id);

    }
}
