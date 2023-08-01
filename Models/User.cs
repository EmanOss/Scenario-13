using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scenario_13.Models;

public partial class User
{
    [Key]
    public required string UserName { get; set; }

    public required string PasswordHash { get; set; }

    public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
