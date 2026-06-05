using server.Collections;
using server.DTOs;
using server.Models;
using server.Repositories;
using server.Services.Interfaces;
using System.Diagnostics;

namespace server.Services
{
    public class PlaylistService: IPlaylistService
    {
        private readonly JsonRepository<Playlist> _repo;
        private readonly ITrackService _trackService;
        private readonly PlaylistCollection _col;

        public PlaylistService(IConfiguration config, ITrackService trackService)
        {
            _repo = new JsonRepository<Playlist>(config["DataPaths:Playlists"]!);
            _trackService = trackService;
            _col = new PlaylistCollection(_repo.GetAll());
        }

        public void SeedFavoritePlaylist()
        {
            if (_col.GetById(0) is not null) return;
            
                var favoritePlaylist = new Playlist
                {
                    Id = 0, 
                    Title = "Favorite",
                    ImagePath = "uploads/images/favorite.jfif", 
                    IsDeletable = false,
                    CreatedAt = DateTime.UtcNow,
                    TracksIds = new List<int>()
                };

                _col.CreateWithId(favoritePlaylist);
                _repo.SaveAll(_col.ToList());
            
        }

        public List<Playlist> GetAll(string? search = null)
        {
            var playlists = _col.GetAll(search);
            return playlists;
        }

        public Playlist Create(CreatePlaylistDto dto, string imagePath)
        {
            var playlist = new Playlist
            {
                Title = dto.Title,
                ImagePath = imagePath
            };
            playlist = _col.Create(playlist);
            _repo.SaveAll(_col.ToList());
            return playlist;
        }

        public Playlist? Update(int id, UpdatePlaylistDto dto, string imagePath)
        {
            var playlist = _col.GetById(id);
            if (playlist is null) return null;
            var updatedPlaylist = new Playlist
            {
                Title = dto.Title,
                ImagePath = imagePath != string.Empty ? imagePath : playlist.ImagePath,
            };
            playlist = _col.Update(id, updatedPlaylist);
            if (playlist is null) return null;
            _repo.SaveAll(_col.ToList());
            return playlist;
        }

        public Playlist? Delete(int id)
        {
            var playlist = _col.Delete(id);
            if (playlist is null) return null;
            _repo.SaveAll(_col.ToList());
            return playlist;
        }

        public Playlist? GetById(int id) {
            var playlist = _col.GetById(id);
            return playlist;
        }

        public Playlist? GetPlaylistWithTracks(int id)
        {
            var playlist = _col.GetById(id);
            if (playlist is null) return null;
            var tracks = new List<Track>(0);
            if (playlist.TracksIds.ToArray().Length == 0) return playlist;

            playlist.TracksIds.ToList().ForEach(trackId =>
            {
                var track = _trackService.GetById(trackId);
                if (track is not null) tracks.Add(track);
            });
            var newPlaylist = new Playlist
            {
                Id = playlist.Id,
                Title = playlist.Title,
                ImagePath = playlist.ImagePath,
                CreatedAt = playlist.CreatedAt,
                IsDeletable = playlist.IsDeletable,
               Tracks = tracks,
            };
            return newPlaylist;
        }

        public Playlist? AddTrackToPlaylist(int id, int trackId)
        {
            var track = _trackService.GetById(trackId);
            if (track is null) return null;
            var playlist = _col.AddTrackToPlaylist(id, trackId);
            if (playlist is null) return playlist;
            _repo.SaveAll(_col.ToList()); 
            return playlist;
        }

        public Playlist? RemoveTrackFromPlaylist(int id, int trackId)
        {
            var track = _trackService.GetById(trackId);
            if (track is null) return null;
            var playlist = _col.RemoveTrackFromPlaylist(id, trackId);
            if (playlist is null) return playlist;
            _repo.SaveAll(_col.ToList());
            return playlist;
        }

        public List<PlaylistHasTrackDto> PlaylistsHasTrack(int trackId)
        {
            var playlists = _col.PlaylistsHasTrack(trackId);
            return playlists;
        }

        public void RemoveTrackFromAll(int trackId)
        {
            var playlists = _col.RemoveTrackFromAll(trackId);
            _repo.SaveAll(_col.ToList());
        }
    }
}
