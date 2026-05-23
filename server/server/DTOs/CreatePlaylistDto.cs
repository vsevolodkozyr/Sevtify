using server.Models;

namespace server.DTOs
{
    public class CreatePlaylistDto
    {
        public string Title { get; set; } = string.Empty;
        public IFormFile? ImageFile { get; set; }

    }
}
