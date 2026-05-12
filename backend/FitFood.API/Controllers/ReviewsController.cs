using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitFood.API.Data;
using FitFood.API.Models; 

namespace FitFood.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReviewsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("restaurant/{restaurantId}")]
        public async Task<IActionResult> GetReviews(int restaurantId)
        {
            var reviews = await _context.Reviews
                .Include(r => r.User)
                .Where(r => r.RestaurantId == restaurantId)
                .ToListAsync();
            return Ok(reviews);
        }

        
        [HttpPost]
        public async Task<IActionResult> PostReview(Review review)
        {
        
            review.CreatedAt = DateTime.UtcNow;

            review.User = null;
            review.Restaurant = null;

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            await UpdateRestaurantRating(review.RestaurantId);

            return Ok(review);
        }
        private async Task UpdateRestaurantRating(int restaurantId)
        {
            var restaurant = await _context.Restaurants
                .Include(r => r.Reviews)
                .FirstOrDefaultAsync(r => r.Id == restaurantId);

            if (restaurant != null && restaurant.Reviews.Any())
            {
                restaurant.Rating = Math.Round(restaurant.Reviews.Average(r => r.Rating), 1);
                await _context.SaveChangesAsync();
            }
        }
    }
}