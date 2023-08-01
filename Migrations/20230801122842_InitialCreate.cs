using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Scenario_13.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    userName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    passwordHash = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("user_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "blog",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    creationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    text = table.Column<string>(type: "text", nullable: false),
                    title = table.Column<string>(type: "character varying(75)", maxLength: 75, nullable: false),
                    authorId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("blog_pkey", x => x.id);
                    table.ForeignKey(
                        name: "fk_blog_user",
                        column: x => x.authorId,
                        principalTable: "user",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "comment",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    blogId = table.Column<int>(type: "integer", nullable: false),
                    userId = table.Column<int>(type: "integer", nullable: false),
                    date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("comment_pkey", x => x.id);
                    table.ForeignKey(
                        name: "fk_comment_blog",
                        column: x => x.blogId,
                        principalTable: "blog",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_comment_user",
                        column: x => x.userId,
                        principalTable: "user",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_blog_authorId",
                table: "blog",
                column: "authorId");

            migrationBuilder.CreateIndex(
                name: "IX_comment_blogId",
                table: "comment",
                column: "blogId");

            migrationBuilder.CreateIndex(
                name: "IX_comment_userId",
                table: "comment",
                column: "userId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "comment");

            migrationBuilder.DropTable(
                name: "blog");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
