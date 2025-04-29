namespace backend.Models
{
    public class Movie
    {
        public int ID { get; set; }
        public string? Title { get; set; }
        public string? Genre { get; set; }
        public bool Watched { get; set; }
        public int Rating { get; set; }
    }
}
