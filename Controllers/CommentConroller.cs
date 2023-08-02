using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scenario_13.Models;
namespace Scenario_13.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class CommentController : ControllerBase
{
    private readonly PostgresContext _DBContext;

    public CommentController(PostgresContext dBContext)
    {
        _DBContext = dBContext;
    }

    [HttpGet("GetByBlogId/{blogId}")]
    public IActionResult GetById(int blogId)
    {
        var blog = _DBContext.Blogs.FirstOrDefault(b => b.Id == blogId);
        
        return Ok(blog);
    }
    [HttpDelete("remove/{id}")]
    public IActionResult Remove(int id)
    {
        var currentUser = HttpContext.User;
        if (currentUser.Identity != null && currentUser.Identity.IsAuthenticated)
        {
            var author = _DBContext.Users.FirstOrDefault(u => u.UserName == currentUser.Identity.Name);
            var blog = _DBContext.Blogs.FirstOrDefault(b => b.Id == id);
            if (blog != null && blog.AuthorUserName == author.UserName)
            {
                _DBContext.Remove(blog);
                _DBContext.SaveChanges();
                return Ok(true);
            }
        }
        //todo - 404 not found
        return Ok(false);
    }
    [HttpPost("create")]
    public IActionResult Create([FromBody] BlogDto blogDto)
    {
        //make the author be the currently logged in user
        var currentUser = HttpContext.User;
        if (currentUser.Identity != null && currentUser.Identity.IsAuthenticated)
        {
            // You can access the user's unique identifier, username, or other claims here
            var author = _DBContext.Users.FirstOrDefault(u => u.UserName == currentUser.Identity.Name);
            // Console.WriteLine("curr user " + author.UserName);
            var blog = new Blog
            {
                AuthorUserName = author.UserName,
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
    [HttpPost("update/{id}")]
    public IActionResult Update(int id,[FromBody] BlogDto blogDto)
    {
        var currentUser = HttpContext.User;
        if (currentUser.Identity != null && currentUser.Identity.IsAuthenticated)
        {
            // You can access the user's unique identifier, username, or other claims here
            var author = _DBContext.Users.FirstOrDefault(u => u.UserName == currentUser.Identity.Name);
            var blog = _DBContext.Blogs.FirstOrDefault(b => b.Id == id);
            if (blog != null && blog.AuthorUserName == author.UserName)
            {
                //user can only edit title or blog text
                blog.Title = blogDto.Title;
                blog.Text = blogDto.Text;
                _DBContext.SaveChanges();
                return Ok(blog);
            }
            return Ok(false);
        }
        return Ok(false);

    }

}
