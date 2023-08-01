﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Scenario_13.Models;

#nullable disable

namespace Scenario_13.Migrations
{
    [DbContext(typeof(PostgresContext))]
    partial class PostgresContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Scenario_13.Models.Blog", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    b.Property<string>("AuthorUserName")
                        .IsRequired()
                        .HasColumnType("character varying(50)")
                        .HasColumnName("authorUserName");

                    b.Property<DateTime>("CreationDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("creationDate")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("character varying(75)")
                        .HasColumnName("title");

                    b.HasKey("Id")
                        .HasName("blog_pkey");

                    b.HasIndex("AuthorUserName");

                    b.ToTable("blog", (string)null);
                });

            modelBuilder.Entity("Scenario_13.Models.Comment", b =>
                {
                    b.Property<int>("BlogId")
                        .HasColumnType("integer")
                        .HasColumnName("blogId")
                        .HasColumnOrder(1);

                    b.Property<string>("UserName")
                        .HasColumnType("character varying(50)")
                        .HasColumnName("userName")
                        .HasColumnOrder(2);

                    b.Property<DateTime>("Date")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date")
                        .HasColumnOrder(3)
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.HasKey("BlogId", "UserName", "Date")
                        .HasName("comment_pkey");

                    b.HasIndex("UserName");

                    b.ToTable("comment", (string)null);
                });

            modelBuilder.Entity("Scenario_13.Models.User", b =>
                {
                    b.Property<string>("UserName")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("userName");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("passwordHash");

                    b.HasKey("UserName")
                        .HasName("user_pkey");

                    b.ToTable("user", (string)null);
                });

            modelBuilder.Entity("Scenario_13.Models.Blog", b =>
                {
                    b.HasOne("Scenario_13.Models.User", "Author")
                        .WithMany("Blogs")
                        .HasForeignKey("AuthorUserName")
                        .IsRequired()
                        .HasConstraintName("fk_blog_user");

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Scenario_13.Models.Comment", b =>
                {
                    b.HasOne("Scenario_13.Models.Blog", "Blog")
                        .WithMany("Comments")
                        .HasForeignKey("BlogId")
                        .IsRequired()
                        .HasConstraintName("fk_comment_blog");

                    b.HasOne("Scenario_13.Models.User", "User")
                        .WithMany("Comments")
                        .HasForeignKey("UserName")
                        .IsRequired()
                        .HasConstraintName("fk_comment_user");

                    b.Navigation("Blog");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Scenario_13.Models.Blog", b =>
                {
                    b.Navigation("Comments");
                });

            modelBuilder.Entity("Scenario_13.Models.User", b =>
                {
                    b.Navigation("Blogs");

                    b.Navigation("Comments");
                });
#pragma warning restore 612, 618
        }
    }
}
