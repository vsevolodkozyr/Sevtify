using System.Text.Json;

namespace server.Repositories
{
    public class JsonRepository<T>
    {
        private readonly string _filePath;
        private readonly JsonSerializerOptions _options = new() { WriteIndented = true };

        public JsonRepository(string filePath)
        {
            _filePath = filePath;
           
            if (!File.Exists(filePath))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);
                File.WriteAllText(filePath, "[]");
            }
        }
        
        
        public List<T> GetAll()
        {
            var json = File.ReadAllText(_filePath);
            return JsonSerializer.Deserialize<List<T>>(json) ?? new List<T>(0);
        }

       
        public void SaveAll(List<T> items)
        {
            var json = JsonSerializer.Serialize(items, _options);
            File.WriteAllText(_filePath, json);
        }
    }
}
