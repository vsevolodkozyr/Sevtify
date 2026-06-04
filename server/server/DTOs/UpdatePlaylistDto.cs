using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class UpdatePlaylistDto
    {
        [Required(ErrorMessage = "Назва треку є обов'язковою")]
        public string Title { get; set; } = string.Empty;
        
        public IFormFile? ImageFile { get; set; }
    }
}
