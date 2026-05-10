namespace FitFood.API.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int Rating { get; set; } 
        public string Comment { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        
        public int UserId { get; set; }
        public int RestaurantId { get; set; }

        public User? User { get; set; }
        public Restaurant Restaurant { get; set; }
    }
}
