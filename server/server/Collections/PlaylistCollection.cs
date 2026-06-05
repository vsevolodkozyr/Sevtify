using server.DTOs;
using server.Models;

namespace server.Collections
{
    public class PlaylistCollection
    {
        private readonly List<Playlist> _playlists;

        public PlaylistCollection(List<Playlist> playlists)
        {
            _playlists = playlists;
        }

        public List<Playlist> GetAll(string? search = null)
        {
            var playlists = _playlists.AsEnumerable();


            if (!string.IsNullOrWhiteSpace(search))
            {
                playlists = playlists.Where(p =>
                    p.Title.Contains(search, StringComparison.OrdinalIgnoreCase)
                );
            }
            return playlists.ToList();
        }

        public Playlist Create(Playlist playlist)
        {
            playlist.Id = _playlists.Count > 0 ? _playlists.Max(t => t.Id) + 1 : 1;
            _playlists.Add(playlist);
            return playlist;
        }

        public Playlist CreateWithId(Playlist playlist)
        {
            _playlists.Add(playlist);
            return playlist;
        }

        public Playlist? GetById(int id)
        {
            var playlist = _playlists.FirstOrDefault(t => t.Id == id);
            return playlist;
        }

        public Playlist? Update(int id, Playlist updatedPlaylist)
        {
            var playlist = this.GetById(id);
            if (playlist is null) return null;
            playlist.ImagePath = updatedPlaylist.ImagePath;
            playlist.Title = updatedPlaylist.Title;
            return playlist;
        }

        public Playlist? Delete(int id)
        {
            var playlist = this.GetById(id);
            if (playlist is null) return null;
            _playlists.Remove(playlist);
            return playlist;
        }

        public Playlist? AddTrackToPlaylist(int id, int trackId)
        {
            var playlist = this.GetById(id);
            if (playlist is null) return null;
            if (!playlist.TracksIds.Contains(trackId))
            {
                playlist.TracksIds.Add(trackId);
            }
            return playlist;
        }


        public Playlist? RemoveTrackFromPlaylist(int id, int trackId)
        {
            var playlist = this.GetById(id);
            if (playlist is null) return null;
            if (playlist.TracksIds.Contains(trackId))
            {
                playlist.TracksIds.Remove(trackId);
            }
            return playlist;
        }

        public List<PlaylistHasTrackDto> PlaylistsHasTrack(int trackId)
        {
            List<PlaylistHasTrackDto> playlistsWithFlag = new List<PlaylistHasTrackDto>(0);
            foreach (var playlist in _playlists)
            {
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

        public List<Playlist> RemoveTrackFromAll(int trackId)
        {
            var playlistsHasTrack = _playlists.Where(p => p.TracksIds.Contains(trackId));
            foreach (var item in playlistsHasTrack)
            {
                item.TracksIds.Remove(trackId);
            }
            return _playlists;
        }


        public List<Playlist> ToList() => _playlists;

    }
}
