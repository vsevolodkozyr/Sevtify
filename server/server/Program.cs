
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
                        .WithOrigins("http://localhost:5173")  // Vite dev server
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            // Add services to the container.
            builder.Services.Configure<FormOptions>(options =>
            {
                options.MultipartHeadersLengthLimit = 100 * 1024 * 1024;        // 1 MB заголовки
                options.MultipartBodyLengthLimit = 100 * 1024 * 1024;     // 100 MB тіло
                options.ValueLengthLimit = 100* 1024 * 1024;                   // 1 MB текстові поля
            });

            // Kestrel також має свій ліміт — теж збільшуємо
            builder.WebHost.ConfigureKestrel(options =>
            {
                options.Limits.MaxRequestBodySize = 100 * 1024 * 1024;    // 100 MB
            });
            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            // Connect Services HERE 

            builder.Services.AddScoped<IPlaylistService, PlaylistService>();
            builder.Services.AddScoped<ITrackService, TrackService>();

            builder.Services.AddScoped<FileService>();

            var app = builder.Build();
            app.UseCors("ReactApp");

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "Uploads")),
                RequestPath = "/uploads"
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            //app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
