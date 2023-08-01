using System;
using System.Collections.Generic;

namespace Scenario_13.Models;

public partial class Comment
{
    public long Id { get; set; }

    public long BlogId { get; set; }

    public long UserId { get; set; }

    public DateTime Date { get; set; }

    public virtual Blog Blog { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
