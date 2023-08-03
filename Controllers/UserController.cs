using System.Numerics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Scenario_13.Models;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

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
    [HttpPost("register")]
    public ActionResult<User> Register(UserDto userDto)
    {
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
        Console.WriteLine("username at auth: "+userDto.UserName);
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
        // var res = ;
        // var response = new TokenResponse() { jwttoken = finaltoken, refreshtoken = await refereshTokenGenerator.GenerateToken(userCred.username) };

        return Ok(new {token = finaltoken});
    }
    // [Authorize]
    // [HttpPost("update/{oldUserName}")]
    // public IActionResult Update(string oldUserName, [FromBody] UserDto userDto)
    // {
    //     var user = _DBContext.Users.FirstOrDefault(item => item.UserName.Equals(oldUserName));
    //     if (user != null)
    //     {
    //         user.UserName = userDto.UserName;
    //         user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
    //         _DBContext.SaveChanges();
    //         return Ok(true);
    //     }
    //     return Ok(false);

    // }
    // [Authorize]
    // [HttpDelete("remove/{userName}")]
    // public IActionResult Remove(string userName)
    // {
    //     var user = _DBContext.Users.FirstOrDefault(item => item.UserName.Equals(userName));
    //     if (user != null)
    //     {
    //         _DBContext.Remove(user);
    //         _DBContext.SaveChanges();
    //         return Ok(true);
    //     }
    //     return Ok(false);
    // }
}