using System.Numerics;
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
        var blog = this._DBContext.Blogs.FirstOrDefault(b=>b.Id == id);
        return Ok(blog);
    }
    [HttpDelete("remove/{id}")]
    public IActionResult Remove(BigInteger id)
    {
        var blog = this._DBContext.Blogs.FirstOrDefault(b=>b.Id == id);
        if(blog!=null){
            this._DBContext.Remove(blog);
            this._DBContext.SaveChanges();
            return Ok(true);
        }
        //todo - 404 not found
        return Ok(false);
    }
    [HttpPost("create")]
    public IActionResult Create([FromBody] Blog _blog)
    {
        //todo - auto inc ID - check if user exists - link user to blog - 
        this._DBContext.Blogs.Add(_blog);
        this._DBContext.SaveChanges();
        return Ok(true);
    }
    [HttpPost("update")]
    public IActionResult Update([FromBody] Blog _blog)
    {
        //check if blog exists
        var blog = this._DBContext.Blogs.FirstOrDefault(b=>b.Id == _blog.Id);
        if(blog!=null){
            //user can only edit title or blog text
            blog.Title = _blog.Title;
            blog.Text = _blog.Text;
            return Ok(true);
        }
        else{
            //todo - return 404 - not found
            return Ok(false);
        }
        
    }

}
