using System.Numerics;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scenario_13.Models;
namespace Scenario_13.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class BlogController : ControllerBase
{
    private readonly PostgresContext _DBContext;

    public BlogController(PostgresContext dBContext)
    {
        _DBContext = dBContext;
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        var blogs = this._DBContext.Blogs.ToList();
        return Ok(blogs);
    }
    [HttpGet("GetById/{id}")]
    public IActionResult GetById(BigInteger id)
    {
        var blog = this._DBContext.Blogs.FirstOrDefault(b => b.Id == id);
        return Ok(blog);
    }
    [HttpDelete("remove/{id}")]
    public IActionResult Remove(BigInteger id)
    {
        var blog = _DBContext.Blogs.FirstOrDefault(b => b.Id == id);
        if (blog != null)
        {
            _DBContext.Remove(blog);
            _DBContext.SaveChanges();
            return Ok(true);
        }
        //todo - 404 not found
        return Ok(false);
    }
    [HttpPost("create")]
    public IActionResult Create([FromBody] BlogDto blogDto)
    {
        //  var currentUser = 


        //make the author be the currently logged in user
        var currentUser = HttpContext.User;

        if (currentUser.Identity.IsAuthenticated)
        {
            // You can access the user's unique identifier, username, or other claims here
            var author = _DBContext.Users.FirstOrDefault(u => u.UserName == currentUser.Identity.Name);
            Console.WriteLine("curr user "+author.UserName);
            var blog = new Blog
            {
                AuthorUserName = blogDto.AuthorUserName,
                Title = blogDto.Title,
                Text = blogDto.Text,
                Author = author
            };
            _DBContext.Blogs.Add(blog);
            _DBContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);

    }
    [HttpPost("update")]
    //TODO - edit to blog Dto
    public IActionResult Update([FromBody] Blog _blog)
    {
        //check if blog exists
        var blog = _DBContext.Blogs.FirstOrDefault(b => b.Id == _blog.Id);
        if (blog != null)
        {
            //user can only edit title or blog text
            blog.Title = _blog.Title;
            blog.Text = _blog.Text;
            return Ok(true);
        }
        else
        {
            //todo - return 404 - not found
            return Ok(false);
        }

    }

}
