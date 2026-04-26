using System.Collections.Generic;

namespace FitFood.API.Models
{
    public class Restaurant
    {
        public int Id { get; set; } // Унікальний номер
        public string Name { get; set; } = string.Empty; // Назва
        public List<Review> Reviews { get; set; } = new List<Review>();
        public string Address { get; set; } = string.Empty; // Адреса
        public List<string> Categories { get; set; } = new(); // Відгуки
        public double Rating { get; set; } // Рейтинг
        public string? ImageUrl { get; set; } // Фото самого закладу
        public string? MapImageUrl { get; set; } // Скріншот карти (маршрут від ФІТ)
    }
}