using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EmployeeDirectory.Api.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using ToDoApp.Models;
using ToDoApp.Service.Contracts;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ToDoApp.Api.Controllers
{
    [ApiController]
    [Route("/api")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        public UserController(IConfiguration config, IUserService userServices)
        {
            _config = config;
            _userService = userServices;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            User? user = await AuthenticateUser(loginDto);
            if (user != null)
            {
                var token = GenerateToken(user);
                return Ok(token);
            }
            return NotFound("User not found");
        }


        [HttpPost("register")]
        public async Task<IActionResult> AddAsync([FromBody] RegisterDto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var users = await _userService.GetAllAsync();
                var existingUser = users.Find(u => u.UserName == user.Username);

                if (existingUser != null)
                {
                    return Conflict("A user with this username already exists.");
                }

                user.Password = HashPassword(user.Password!);
                await _userService.AddAsync(new Models.User {
                    UserName = user.Username!,
                    Password = user.Password
                });

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId!.ToString()!),
            };
            var token = new JwtSecurityToken(
             issuer: _config["Jwt:Issuer"],
             audience: _config["Jwt:Audience"],
             claims: claims,
             expires: DateTime.Now.AddDays(1),
             signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<User?> AuthenticateUser(LoginDto loginDto)
        {
            var hashedPassword = HashPassword(loginDto.Password!);
            var users = await _userService.GetAllAsync();
            var currentUser = users.Find(o => o.UserName.Equals(loginDto.UserName, StringComparison.CurrentCultureIgnoreCase) && o.Password == hashedPassword);
            if (currentUser != null)
            {
                return currentUser;
            }
            return null;
        }

        private static string HashPassword(string password)
        {
            var asBytedArray = Encoding.UTF8.GetBytes(password);
            var hashedPassword = SHA256.HashData(asBytedArray);
            return Convert.ToBase64String(hashedPassword);
        }

    }
}