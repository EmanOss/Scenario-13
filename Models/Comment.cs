using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Scenario_13.Models;

public partial class Comment
{
    [Key]
    [Column(Order = 1)]
    public required int BlogId { get; set; }
    [Key]
    [Column(Order = 2)]
    public required string UserName { get; set; }
    [Key]
    [Column(Order = 3)]
    public required DateTime Date { get; set; } = DateTime.UtcNow;

    public required virtual Blog Blog { get; set; }

    public required virtual User User { get; set; }
}
