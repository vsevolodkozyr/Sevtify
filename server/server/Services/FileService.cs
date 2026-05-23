namespace server.Services
{
    public class FileService
    {
        private readonly string _uploadsRoot;

        public FileService(IWebHostEnvironment env)
        {
            _uploadsRoot = Path.Combine(env.ContentRootPath, "Uploads");
        }

        /// <summary>
        /// Зберігає файл у вказану підпапку.
        /// Повертає відносний URL для зберігання в JSON.
        /// </summary>
        public async Task<string> SaveFileAsync(IFormFile file, string subFolder)
        {
            // Uploads/Images  або  Uploads/Tracks
            var folder = Path.Combine(_uploadsRoot, subFolder);
            Directory.CreateDirectory(folder); // створює якщо не існує

            // Унікальне ім'я файлу щоб не було конфліктів
            var extension = Path.GetExtension(file.FileName);
            var uniqueName = $"{Guid.NewGuid()}{extension}";
            var fullPath = Path.Combine(folder, uniqueName);

            using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            // Повертаємо відносний URL: /uploads/images/abc123.jpg
            return $"/uploads/{subFolder.ToLower()}/{uniqueName}";
        }

        /// <summary>Видаляє файл за відносним URL.</summary>
        public void DeleteFile(string? relativePath)
        {
            if (string.IsNullOrEmpty(relativePath)) return;

            // /uploads/images/abc.jpg → Uploads/images/abc.jpg
            var relativeFsPath = relativePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
            var fullPath = Path.Combine(
                _uploadsRoot.Replace("Uploads", ""), relativeFsPath);

            if (File.Exists(fullPath))
                File.Delete(fullPath);
        }
    }
}
