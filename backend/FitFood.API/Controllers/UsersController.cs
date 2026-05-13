using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitFood.API.Data;
using FitFood.API.Models;
using BCrypt.Net;

namespace FitFood.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // РЕЄСТРАЦІЯ
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            // Перевіряємо, чи немає вже користувача з такою поштою
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == user.Email);

            if (existingUser != null)
            {
                return BadRequest("Користувач з таким email вже існує");
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        // Логін
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginDto.Email && u.Password == loginDto.Password);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                return Unauthorized("Невірний email або пароль");
            }

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User updatedUser)
        {
            if (id != updatedUser.Id) return BadRequest();

            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            // Оновлюємо тільки ті поля, які прийшли
            if (!string.IsNullOrEmpty(updatedUser.Name))
                user.Name = updatedUser.Name;

            if (!string.IsNullOrEmpty(updatedUser.Email))
                user.Email = updatedUser.Email;

            if (!string.IsNullOrEmpty(updatedUser.Password))
                user.Password = updatedUser.Password;

            if (updatedUser.AvatarUrl != null)
                user.AvatarUrl = updatedUser.AvatarUrl;

            await _context.SaveChangesAsync();
            return Ok(user); // повертаємо оновленого юзера замість NoContent
        }
    }
}
