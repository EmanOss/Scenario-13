using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Scenario_13.Migrations
{
    /// <inheritdoc />
    public partial class RemovedHash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "passwordHash",
                table: "user",
                newName: "password");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "password",
                table: "user",
                newName: "passwordHash");
        }
    }
}
