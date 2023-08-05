namespace Scenario_13.Models;

public partial class BlogStatisticsDto
{
    public DateTime CreationDate { get; set; }

    public required string AuthorUserName { get; set; }
    
    public required List<Comment> Comments { get; set; }
}
