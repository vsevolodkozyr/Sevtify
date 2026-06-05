using Microsoft.AspNetCore.Mvc;

namespace server.DTOs
{
    public class TracksGetAllDto
    {
        public string? search { get; set; } = string.Empty;
        public string? genre { get; set; } = string.Empty;
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }
    }
}
