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
    // private User _currentUser;

    public BlogController(PostgresContext dBContext)
    {
        _DBContext = dBContext;
    }
    private User? GetCurrentUser(){
        var currentUser = HttpContext.User;
        if (currentUser.Identity != null && currentUser.Identity.IsAuthenticated)
        {
            return _DBContext.Users.FirstOrDefault(u => u.UserName == currentUser.Identity.Name); 
        }
        return null;
    }

    [HttpGet("GetAll")]
    public IActionResult GetAll()
    {
        var blogs = _DBContext.Blogs.ToList();
        return Ok(blogs);
    }
    [HttpGet("GetById/{id}")]
    public IActionResult GetById(int id)
    {
        var blog = _DBContext.Blogs.FirstOrDefault(b => b.Id == id);
        return Ok(blog);
    }
    [HttpDelete("remove/{id}")]
    public IActionResult Remove(int id)
    {
        User? currUser = GetCurrentUser();
        if (currUser!=null)
        {
            // var author = _DBContext.Users.FirstOrDefault(u => u.UserName == currentUser.UserName);
            var blog = _DBContext.Blogs.FirstOrDefault(b => b.Id == id);
            if (blog != null && blog.AuthorUserName == currUser.UserName)
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
        User? currUser = GetCurrentUser();
        if (currUser!=null)
        {
            // You can access the user's unique identifier, username, or other claims here
            // var author = _DBContext.Users.FirstOrDefault(u => u.UserName == currUser.UserName);
            // Console.WriteLine("curr user " + author.UserName);
            var blog = new Blog
            {
                AuthorUserName = currUser.UserName,
                Title = blogDto.Title,
                Text = blogDto.Text,
                Author = currUser
            };
            // author?.Blogs.Add(blog); //TODO - do i need this????
            _DBContext.Blogs.Add(blog);
            _DBContext.SaveChanges();
            return Ok(true);
        }
        return Ok(false);

    }
    [HttpPost("update/{id}")]
    public IActionResult Update(int id,[FromBody] BlogDto blogDto)
    {
        User? currUser = GetCurrentUser();
        if (currUser!=null)
        {
            // You can access the user's unique identifier, username, or other claims here
            // var author = _DBContext.Users.FirstOrDefault(u => u.UserName == currUser.UserName);
            var blog = _DBContext.Blogs.FirstOrDefault(b => b.Id == id);
            if (blog != null && blog.AuthorUserName == currUser.UserName)
            {
                //user can only edit title or blog text
                blog.Title = blogDto.Title;
                blog.Text = blogDto.Text;
                _DBContext.SaveChanges();
                return Ok(true);
            }
            return Ok(false);
        }
        return Ok(false);

    }

}
