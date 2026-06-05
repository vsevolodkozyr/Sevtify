namespace server.Services
{
    public class FileService
    {
        private static readonly string[] AllowedImages = { ".jpg", ".jpeg", ".png", ".webp", ".jfif" };
        private static readonly string[] AllowedAudio = { ".mp3" };

        private readonly string _uploadsRoot;
        
        public FileService(IWebHostEnvironment env)
        {
            _uploadsRoot = Path.Combine(env.ContentRootPath, "Uploads");
        }


        public void ValidateImage(IFormFile file)
        {
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedImages.Contains(ext))
                throw new ArgumentException($"Неприпустимий формат зображення. Дозволені: {string.Join(", ", AllowedImages)}");
        }

        public void ValidateAudio(IFormFile file)
        { 
            var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!AllowedAudio.Contains(ext))
                throw new ArgumentException($"Неприпустимий формат аудіо. Дозволені: {string.Join(", ", AllowedAudio)}");
        }


        
        public async Task<string> SaveFileAsync(IFormFile file, string subFolder)
        {
            var folder = Path.Combine(_uploadsRoot, subFolder);
            Directory.CreateDirectory(folder);

            var extension = Path.GetExtension(file.FileName);
            var uniqueName = $"{Guid.NewGuid()}{extension}";
            var fullPath = Path.Combine(folder, uniqueName);

            using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            return $"/uploads/{subFolder.ToLower()}/{uniqueName}";
        }

        public void DeleteFile(string? relativePath)
        {
            if (string.IsNullOrEmpty(relativePath)) return;

            var relativeFsPath = relativePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
            var fullPath = Path.Combine(
                _uploadsRoot.Replace("Uploads", ""), relativeFsPath);
            
            if (File.Exists(fullPath))
                File.Delete(fullPath);
        }
    }
}
