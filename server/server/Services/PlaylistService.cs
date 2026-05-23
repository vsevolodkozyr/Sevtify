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

        public PlaylistService(IConfiguration config, ITrackService trackService)
        {
            _repo = new JsonRepository<Playlist>(config["DataPaths:Playlists"]!);
            _trackService = trackService;
        }

        public List<Playlist> GetAll()
        {
            return _repo.GetAll();
        }

        public Playlist Create(CreatePlaylistDto dto, string imagePath)
        {
            var playlists = _repo.GetAll();
            var playlist = new Playlist
            {
                Id = playlists.Count > 0 ? playlists.Max(t => t.Id) + 1 : 1,
                Title = dto.Title,
                ImagePath = imagePath
            };
            playlists.Add(playlist);
            _repo.SaveAll(playlists);
            return playlist;
        }

        public Playlist? Update(int id, CreatePlaylistDto dto, string imagePath)
        {
            var playlists = _repo.GetAll();
            var playlist = playlists.FirstOrDefault(p => p.Id == id);
            if (playlist is null) return null;
            playlist.ImagePath = imagePath != string.Empty ? imagePath : playlist.ImagePath;
            playlist.Title = dto.Title;
            _repo.SaveAll(playlists);
            return playlist;
        }

        public Playlist? Delete(int id)
        {
            var playlists = _repo.GetAll();
            var playlist = playlists.FirstOrDefault(t => t.Id == id);
            if (playlist is null) return null;
            playlists.Remove(playlist);
            _repo.SaveAll(playlists);
            return playlist;
        }

        public Playlist? GetById(int id) {
            var playlists = _repo.GetAll();
            var playlist = playlists.FirstOrDefault(t => t.Id == id);
            return playlist;
        }

        public Playlist? GetPlaylistWithTracks(int id)
        {
            var playlists = _repo.GetAll();
            var playlist = playlists.FirstOrDefault(p => p.Id == id);
            if (playlist is null) return null;
            var tracks = new List<Track>(0);
            if (playlist.TracksIds.ToArray().Length == 0) return playlist;

            playlist.TracksIds.ToList().ForEach(trackId =>
            {
                var track = _trackService.GetById(trackId);
                tracks.Add(track);
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
            var playlists = _repo.GetAll();
            var playlist = playlists.FirstOrDefault(p => p.Id == id);
            if (playlist is null) return null;
            if (!playlist.TracksIds.Contains(trackId))
            {
                playlist.TracksIds.Add(trackId);
                _repo.SaveAll(playlists); 
            }
            return playlist;
        }

        public Playlist? RemoveTrackFromPlaylist(int id, int trackId)
        {
            var track = _trackService.GetById(trackId);
            if (track is null) return null;
            var playlists = _repo.GetAll();
            var playlist = playlists.FirstOrDefault(p => p.Id == id);
            if (playlist is null) return null;
            if (playlist.TracksIds.Contains(trackId))
            {
                playlist.TracksIds.Remove(trackId);
                _repo.SaveAll(playlists);
            }
            return playlist;
        }

        public List<PlaylistHasTrackDto> PlaylistsHasTrack(int trackId)
        {
            
            var playlists = _repo.GetAll();
            List<PlaylistHasTrackDto> playlistsWithFlag = new List<PlaylistHasTrackDto>(0);
            foreach (var playlist in playlists) {
                bool isAdded = false;
                if (playlist.TracksIds.Contains(trackId))
                {
                    isAdded = true;
                }
                var playlistCopy = new PlaylistHasTrackDto
                {
                    Id = playlist.Id,
                    CreatedAt = playlist.CreatedAt,
                    ImagePath = playlist.ImagePath,
                    IsDeletable = playlist.IsDeletable,
                    Title = playlist.Title,
                    TracksIds = playlist.TracksIds,
                    isAdded = isAdded,
                };
                playlistsWithFlag.Add(playlistCopy); 
            }
            return playlistsWithFlag;
        }

        public void RemoveTrackFromAll(int trackId)
        {
            var playlists = _repo.GetAll();
            var playlistsHasTrack = playlists.Where(p => p.TracksIds.Contains(trackId));
            foreach (var item in playlistsHasTrack)
            {
                item.TracksIds.Remove(trackId);
            }
            _repo.SaveAll(playlists);
        }
    }
}
