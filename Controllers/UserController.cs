using System.Numerics;
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

    public UserController(PostgresContext dbContext, IOptions<JwtSettings> options) //todo - try IOptionsSnapshot
    {
        _DBContext = dbContext;
        _jwtSettings = options.Value;
    }
    [HttpPost("register")]
    public ActionResult<User> Register(UserDto request)
    {
        string passwordHash
            = BCrypt.Net.BCrypt.HashPassword(request.Password);

        var user = new User
        {
            UserName = request.UserName,
            PasswordHash = passwordHash
        };
        this._DBContext.Users.Add(user);
        this._DBContext.SaveChanges();
        return Ok(user);
    }

    [HttpPost("Authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] UserDto userDto)
    {
        //todo - change the == condition - check hash against hash - maybe use the extension 
        var user = await _DBContext.Users.FirstOrDefaultAsync(item => item.UserName == userDto.UserName);
        if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
            return Unauthorized();

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

        // var response = new TokenResponse() { jwttoken = finaltoken, refreshtoken = await refereshTokenGenerator.GenerateToken(userCred.username) };

        return Ok(finaltoken);
    }
}