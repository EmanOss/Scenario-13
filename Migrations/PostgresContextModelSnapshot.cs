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

                    b.Property<int>("AuthorId")
                        .HasColumnType("integer")
                        .HasColumnName("authorId");

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

                    b.HasIndex("AuthorId");

                    b.ToTable("blog", (string)null);
                });

            modelBuilder.Entity("Scenario_13.Models.Comment", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    b.Property<int>("BlogId")
                        .HasColumnType("integer")
                        .HasColumnName("blogId");

                    b.Property<DateTime>("Date")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("date")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("userId");

                    b.HasKey("Id")
                        .HasName("comment_pkey");

                    b.HasIndex("BlogId");

                    b.HasIndex("UserId");

                    b.ToTable("comment", (string)null);
                });

            modelBuilder.Entity("Scenario_13.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("password");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("userName");

                    b.HasKey("Id")
                        .HasName("user_pkey");

                    b.ToTable("user", (string)null);
                });

            modelBuilder.Entity("Scenario_13.Models.Blog", b =>
                {
                    b.HasOne("Scenario_13.Models.User", "Author")
                        .WithMany("Blogs")
                        .HasForeignKey("AuthorId")
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
                        .HasForeignKey("UserId")
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
