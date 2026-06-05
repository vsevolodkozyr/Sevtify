
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;
using server.Services;
using server.Services.Interfaces;

namespace server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ReactApp", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            // Add services to the container
            builder.Services.Configure<FormOptions>(options =>
            {
                options.MultipartHeadersLengthLimit = 100 * 1024 * 1024;        // 100 MB
                options.MultipartBodyLengthLimit = 100 * 1024 * 1024;     // 100 MB
                options.ValueLengthLimit = 100* 1024 * 1024;                   // 1 MB
            });

            
            builder.WebHost.ConfigureKestrel(options =>
            {
                options.Limits.MaxRequestBodySize = 100 * 1024 * 1024;    // 100 MB
            });
            builder.Services.AddControllers();

            // Налаштування сервісів

            builder.Services.AddScoped<IPlaylistService, PlaylistService>();
            builder.Services.AddScoped<ITrackService, TrackService>();

            builder.Services.AddScoped<FileService>();

            var app = builder.Build();
            
            // Перевірка корсів
            app.UseCors("ReactApp");

            // Налаштування викориcтання статичних файлів
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "Uploads")),
                RequestPath = "/uploads"
            });

            // Допуст до контролерів
            app.MapControllers();

            // Data Seeding
            // Створюємо обов'язковий плейлист "Улюблене", якщо не створено
            using (var scope = app.Services.CreateScope()) // Штучний запит
            {
                try
                {
                    var playlistService = scope.ServiceProvider.GetRequiredService<IPlaylistService>();
                    playlistService.SeedFavoritePlaylist();
                }
                catch (Exception ex)
                { 
                    Console.WriteLine($"Помилка ініціалізації бази даних: {ex.Message}");
                }
            }

            app.Run();
        }
    }
}
