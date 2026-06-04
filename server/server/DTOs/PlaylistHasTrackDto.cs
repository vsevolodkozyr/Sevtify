using server.Models;

namespace server.DTOs
{
    public class PlaylistHasTrackDto: Playlist
    {
        public bool isAdded { get; set; } = false;
    }
}
