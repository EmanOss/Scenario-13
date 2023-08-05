using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Scenario_13.Models;
using System.Text;
using System.Security.Claims;

namespace Scenario_13.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly PostgresContext _DBContext;
    private readonly JwtSettings _jwtSettings;

    public UserController(PostgresContext dbContext, IOptions<JwtSettings> options)
    {
        _DBContext = dbContext;
        _jwtSettings = options.Value;
    }
    /*gets the currently logged in user*/
    private User? GetCurrentUser()
    {
        var currentUser = HttpContext.User;
        if (currentUser.Identity != null && currentUser.Identity.IsAuthenticated)
        {
            return _DBContext.Users.FirstOrDefault(u => u.UserName == currentUser.Identity.Name);
        }
        return null;
    }
    [HttpGet("currUser")]
    public IActionResult Getser()
    {
        var user = GetCurrentUser();
        if (user != null)
        {
            return Ok(new {userName = user.UserName});
            
        }
        return Ok(false);
    }


    [HttpPost("register")]
    public async Task<ActionResult<User>> RegisterAsync(UserDto userDto)
    {
        //check if user already registered
        var userOld = await _DBContext.Users.FirstOrDefaultAsync(item => item.UserName == userDto.UserName);
        if (userOld != null)
        {
            return Conflict(new { message = "Username already exists" });
        }
        //create new user
        string passwordHash
            = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
        var user = new User
        {
            UserName = userDto.UserName,
            PasswordHash = passwordHash
        };
        _DBContext.Users.Add(user);
        _DBContext.SaveChanges();
        return Ok(user);
    }

    [HttpPost("Authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] UserDto userDto)
    {
        Console.WriteLine("username at auth: " + userDto.UserName);
        var user = await _DBContext.Users.FirstOrDefaultAsync(item => item.UserName == userDto.UserName);
        if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid Username or Password" });

        //generate token
        var tokenhandler = new JwtSecurityTokenHandler();
        var tokenkey = Encoding.UTF8.GetBytes(_jwtSettings.Securitykey);
        var tokendesc = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.UserName)
            }),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenkey), SecurityAlgorithms.HmacSha256)
        };
        var token = tokenhandler.CreateToken(tokendesc);
        string finaltoken = tokenhandler.WriteToken(token);
        return Ok(new { token = finaltoken });
    }
}