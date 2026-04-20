using Microsoft.EntityFrameworkCore;
using FitFood.API.Models;

namespace FitFood.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Favorite> Favorites { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Restaurant>().HasData(
                new Restaurant
                {
                    Id = 1,
                    Name = "Буфет",
                    Address = "вул. Богдана Гаврилишина, 24 (1 поверх)",
                    Rating = 4.0,
                    Categories = new List<string> { "Кава", "Випічка", "Перекус", "Швидке харчування" },
                    ImageUrl = "/images/restaurants/bufet.jpg",
                    MapImageUrl = "/images/maps/map_bufet.jpg"
                },
                new Restaurant
                {
                    Id = 2,
                    Name = "KFC",
                    Address = "Берестейський просп., 24",
                    Rating = 4.2,
                    Categories = new List<string> { "Фастфуд", "Курка", "Бургери", "Швидке харчування" },
                    ImageUrl = "/images/restaurants/kfc.jpg",
                    MapImageUrl = "/images/maps/map_kfc.jng"

                },
                new Restaurant
                {
                    Id = 3,
                    Name = "На-децу-до-газди",
                    Address = "вул. Богдана Гаврилишина, 12/16",
                    Rating = 4.5,
                    Categories = new List<string> { "Українська кухня", "Домашні страви", "Обід" },
                    ImageUrl = "/images/restaurants/nadecudogadzi.jpg",
                    MapImageUrl = "/images/maps/map_nadecudogadzi.jpg"

                },
                new Restaurant
                {
                    Id = 4,
                    Name = "Greek House",
                    Address = "Берестейський просп., 24 (Smart Plaza)",
                    Rating = 4.4,
                    Categories = new List<string> { "Швидке харчування", "Шаурма", "Фастфуд", "Перекус" },
                    ImageUrl = "/images/restaurants/greekhouse.jpg",
                    MapImageUrl = "/images/maps/map_greekhouse.jpg"

                },
                new Restaurant
                {
                    Id = 5,
                    Name = "Мenya Musashi",
                    Address = "вул. Богдана Гаврилишина, 7",
                    Rating = 4.6,
                    Categories = new List<string> { "Японська кухня", "Роли", "Суші", "Обід" },
                    ImageUrl = "/images/restaurants/menyamusashi.jpg",
                    MapImageUrl = "/images/maps/map_menyamusashi.jpg"

                },
                new Restaurant
                {
                    Id = 6,
                    Name = "Пузата Хата",
                    Address = "вул. Політехнічна (Смарт Плаза)",
                    Rating = 4.5,
                    Categories = new List<string> { "Українська кухня", "Обід", "Домашні страви" },
                    ImageUrl = "/images/restaurants/puzata_hata.jpg",
                    MapImageUrl = "/images/maps/map_puzata.jpg"

                },
                new Restaurant
                {
                    Id = 7,
                    Name = "Сушія",
                    Address = "Берестейський просп., 24",
                    Rating = 4.2,
                    Categories = new List<string> { "Японська кухня", "Суші", "Роли", "Обід" },
                    ImageUrl = "/images/restaurants/sushiya.jpg",
                    MapImageUrl = "/images/maps/map_sushiya.jpg"

                },
                new Restaurant
                {
                    Id = 8,
                    Name = "Юджин Бургер",
                    Address = "вул. Довженка, 1",
                    Rating = 4.4,
                    Categories = new List<string> { "Бургери", "Фастфуд", "Швидке харчування", "Перекус" },
                    ImageUrl = "/images/restaurants/yudginburger.jpg",
                    MapImageUrl = "/images/maps/map_yudginburger.jpg"

                },
                new Restaurant
                {
                    Id = 9,
                    Name = "Львівські Круасани",
                    Address = "ст. м. Політехнічний інститут",
                    Rating = 4.8,
                    Categories = new List<string> { "Випічка", "Кава", "Перекус", "Напої" },
                    ImageUrl = "/images/restaurants/lvivcroissants.jpg",
                    MapImageUrl = "/images/maps/map_lvivcroissants.jpg"

                },
                new Restaurant
                {
                    Id = 10,
                    Name = "Hop Hey",
                    Address = "вул. Богдана Гаврилишина, 6",
                    Rating = 4.1,
                    Categories = new List<string> { "Напої", "Закуски", "Перекус" },
                    ImageUrl = "/images/restaurants/hop_hey.jpg",
                    MapImageUrl = "/images/maps/map_hop_hey.jpg"

                },
                new Restaurant
                {
                    Id = 11,
                    Name = "TALK (кав'ярня)",
                    Address = "вул. Богдана Гаврилишина, 6",
                    Rating = 4.3,
                    Categories = new List<string> { "Кава", "Випічка", "Перекус", "Напої" },
                    ImageUrl = "/images/restaurants/talk.jpg",
                    MapImageUrl = "/images/maps/map_talk.jpg"

                },
                new Restaurant
                {
                    Id = 12,
                    Name = "Coffee Gang",
                    Address = "вул. Богдана Гаврилишина, 3",
                    Rating = 4.8,
                    Categories = new List<string> { "Кава", "Випічка", "Напої", "Перекус" },
                    ImageUrl = "/images/restaurants/coffee_gang.jpg",
                    MapImageUrl = "/images/maps/map_coffee_gang.jpg"

                },
                new Restaurant
                {
                    Id = 13,
                    Name = "Doner Маркет",
                    Address = "Берестейський просп., 24",
                    Rating = 3.7,
                    Categories = new List<string> { "Шаурма", "Фастфуд", "Швидке харчування", "Курка" },
                    ImageUrl = "/images/restaurants/doner.png",
                    MapImageUrl = "/images/maps/map_doner.jpg"

                },
                new Restaurant
                {
                    Id = 14,
                    Name = "McDonald's",
                    Address = "Берестейський просп., 32",
                    Rating = 3.9,
                    Categories = new List<string> { "Бургери", "Фастфуд", "Швидке харчування", "Перекус", "Напої" },
                    ImageUrl = "/images/restaurants/mcdonalds.jpg",
                    MapImageUrl = "/images/maps/map_mcdonalds.jpg"

                },
                new Restaurant
                {
                    Id = 15,
                    Name = "Vah Shaurma",
                    Address = "Берестейський просп., 26А",
                    Rating = 4.0,
                    Categories = new List<string> { "Шаурма", "Фастфуд", "Перекус", "Швидке харчування" },
                    ImageUrl = "/images/restaurants/vah_shaurma.jpg",
                    MapImageUrl = "/images/maps/map_vah_shaurma.jpg"

                }

            );
        }
    }
}