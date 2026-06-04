using server.Models;
using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class CreatePlaylistDto
    {
        [Required(ErrorMessage = "Назва треку є обов'язковою")]
        public string Title { get; set; } = string.Empty;
        [Required(ErrorMessage = "Файл обкладинка обов'зковий")]
        public IFormFile? ImageFile { get; set; }

    }
}
