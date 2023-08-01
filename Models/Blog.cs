using System;
using System.Collections.Generic;

namespace Scenario_13.Models;

public partial class Blog
{
    public int Id { get; set; }

    public DateTime CreationDate { get; set; }

    public string Text { get; set; } = null!;

    public string Title { get; set; } = null!;

    public int AuthorId { get; set; }

    public virtual User Author { get; set; } = null!;

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
