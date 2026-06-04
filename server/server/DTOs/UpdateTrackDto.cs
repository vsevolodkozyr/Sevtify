using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class UpdateTrackDto
    {
        [Required(ErrorMessage = "Назва треку є обов'язковою")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Автор є обов'язковим")]
        public string Author { get; set; } = string.Empty;

        [Required(ErrorMessage = "Жанр є обов'язковим")]

        public string Genre { get; set; } = string.Empty;

        [Range(0, 36000)]
        public int Duration { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
