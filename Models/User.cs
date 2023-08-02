using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Scenario_13.Models;

public partial class User
{
    [Key]
    public required string UserName { get; set; }

    public required string PasswordHash { get; set; }

    [JsonIgnore]
    public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();
    [JsonIgnore]
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
