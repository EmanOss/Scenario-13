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
    /*Get the currently logged in user*/
    private User? GetCurrentUser()
    {
        var currentUser = HttpContext.User;
        if (currentUser.Identity != null && currentUser.Identity.IsAuthenticated)
        {
            return _DBContext.Users.FirstOrDefault(u => u.UserName == currentUser.Identity.Name);
        }
        return null;
    }

    [HttpGet("GetByBlogId/{blogId}")] /*get comments of a blog by it's ID*/
    public IActionResult GetById(int blogId)
    {
        // var blog = _DBContext.Blogs.Include(b => b.Comments).FirstOrDefault(b => b.Id == blogId);
        var blog = _DBContext.Blogs.FirstOrDefault(b => b.Id == blogId);

        if (blog == null)
            return NotFound();
        List<Comment> comments = (List<Comment>)blog.Comments;
        return Ok(comments);
    }
    [HttpPost("create/{blogId}")] /*add comment to a blog by it's ID*/
    public IActionResult Create(int blogId, [FromBody] CommentDto commentDto)
    {
        User? currUser = GetCurrentUser();
        if (currUser != null)
        {
            var blog = _DBContext.Blogs.FirstOrDefault(b => b.Id == blogId);
            if (blog == null)
                return NotFound(new { message = "blog not found" });
            var comment = new Comment
            {
                BlogId = blogId,
                UserName = currUser.UserName,
                Text = commentDto.Text,
                Blog = blog,
                User = currUser
            };
            blog?.Comments.Add(comment);
            currUser.Comments.Add(comment);
            _DBContext.Comments.Add(comment);
            _DBContext.SaveChanges();
            return Ok(blog?.Comments);
        }
        return Ok(false);

    }
    [HttpPost("update/{id}")]
    public IActionResult Update(int id, [FromBody] CommentDto commentDto)
    {
        User? currUser = GetCurrentUser();
        if (currUser != null)
        {
            var comment = _DBContext.Comments.FirstOrDefault(b => b.Id == id);
            if (comment != null && comment.UserName == currUser.UserName)
            {
                comment.Text = commentDto.Text;
                _DBContext.SaveChanges();
                return Ok(true);
            }
            return Ok(false);
        }
        return Ok(false);

    }
    [HttpDelete("remove/{id}")]
    public IActionResult Remove(int id)
    {
        User? currUser = GetCurrentUser();
        if (currUser != null)
        {
            var comment = _DBContext.Comments.FirstOrDefault(b => b.Id == id);
            if (comment != null)
                if (comment.UserName == currUser.UserName)
                {
                    _DBContext.Remove(comment);
                    _DBContext.SaveChanges();
                    return Ok(true);
                }
                else
                    return Unauthorized(new { message = "Cannot delete another user's comment" });
            else return NotFound(new { message = "Comment not found" });
        }
        return Ok(false);
    }
}
