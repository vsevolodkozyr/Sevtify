using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class CreateTrackDto
    {
        [Required(ErrorMessage = "Назва треку є обов'язковою")]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Автор є обов'язковим")]
        [MaxLength(200)]
        public string Author { get; set; } = string.Empty;

        [Range(0, 36000)]
        public int Duration { get; set; }

        // Файли — не [Required], бо можуть бути необов'язковими
        public IFormFile? ImageFile { get; set; }
        public IFormFile? TrackFile { get; set; }
    }
}
