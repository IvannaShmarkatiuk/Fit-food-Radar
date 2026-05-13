using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitFood.API.Data;
using FitFood.API.Models;

namespace FitFood.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FavoritesController(AppDbContext context)
        {
            _context = context;
        }

       
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetFavorites(int userId)
        {
            var favorites = await _context.Favorites
                .Where(f => f.UserId == userId)
                .Include(f => f.Restaurant) // Підтягуємо дані про сам ресторан (назву, фото)
                .Select(f => f.Restaurant)  // Повертаємо саме список ресторанів
                .ToListAsync();

            return Ok(favorites);
        }

        [HttpPost]
        public async Task<IActionResult> AddToFavorite(Favorite favorite)
        {
    

            var exists = await _context.Favorites
                .AnyAsync(f => f.UserId == favorite.UserId && f.RestaurantId == favorite.RestaurantId);

            if (exists) return BadRequest("Вже у списку обраного.");

            _context.Favorites.Add(favorite);
            await _context.SaveChangesAsync();

            return Ok("Додано в обране!");
        }

        [HttpDelete("{userId}/{restaurantId}")]
        public async Task<IActionResult> RemoveFromFavorite(int userId, int restaurantId)
        {
            var favorite = await _context.Favorites
                .FirstOrDefaultAsync(f => f.UserId == userId && f.RestaurantId == restaurantId);

            if (favorite == null) return NotFound("Запис не знайдено.");

            _context.Favorites.Remove(favorite);
            await _context.SaveChangesAsync();

            return Ok("Видалено з обраного.");
        }
    }
}