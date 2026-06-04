namespace server.Models
{
    public class Track
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string ImagePath { get; set; } = string.Empty;
        public string TrackPath { get; set; } = string.Empty;

        public string Genre { get; set; } = string.Empty;
        public double Duration { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
