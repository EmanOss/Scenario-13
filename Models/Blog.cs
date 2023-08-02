using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Scenario_13.Models;

public partial class Blog
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public DateTime CreationDate { get; set; } = DateTime.UtcNow;

    public required string Title { get; set; }

    public required string Text { get; set; }

    public required string AuthorUserName { get; set; }

    public required virtual User Author { get; set; }

    [JsonIgnore]
    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
