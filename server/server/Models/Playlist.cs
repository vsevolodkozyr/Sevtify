namespace server.Models
{
    public class Playlist
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;

        public List<int>? TracksIds { get; set; } = new List<int>(0);
        public List<Track>? Tracks { get; set; } = new List<Track>(0);
        public string ImagePath { get; set; } = string.Empty;
        public bool IsDeletable { get; set; } = true;
        public DateTime CreatedAt { get; set; }  = DateTime.Now;
    }
}
