using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace Scenario_13.Models;

public partial class PostgresContext : DbContext
{
    public PostgresContext()
    {
    }

    public PostgresContext(DbContextOptions<PostgresContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Blog> Blogs { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("host=localhost;port=5432;Database=postgres;username=postgres;password=postgres;sslmode=prefer");
        optionsBuilder.UseLazyLoadingProxies(); // Enable lazy loading
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Blog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("blog_pkey");

            entity.ToTable("blog");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.AuthorUserName).HasColumnName("authorUserName");
            entity.Property(e => e.CreationDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("creationDate");
            entity.Property(e => e.Text).HasColumnName("text");
            entity.Property(e => e.Title)
                .HasMaxLength(75)
                .HasColumnName("title");

            entity.HasOne(d => d.Author).WithMany(p => p.Blogs)
                .HasForeignKey(d => d.AuthorUserName)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_blog_user");

            entity.HasMany(b => b.Comments)
                .WithOne(c => c.Blog)
                .HasForeignKey(c => c.BlogId);
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => new { e.BlogId, e.UserName, e.Date }).HasName("comment_pkey");

            entity.ToTable("comment");

            entity.Property(e => e.BlogId).HasColumnName("blogId");
            entity.Property(e => e.Date)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnName("date");
            entity.Property(e => e.UserName).HasColumnName("userName");

            // entity.HasOne(d => d.Blog).WithMany(p => p.Comments)
            //     .HasForeignKey(d => d.BlogId)
            //     .OnDelete(DeleteBehavior.ClientSetNull)
            //     .HasConstraintName("fk_comment_blog");

            // entity.HasOne(d => d.User).WithMany(p => p.Comments)
            //     .HasForeignKey(d => d.UserName)
            //     .OnDelete(DeleteBehavior.ClientSetNull)
            //     .HasConstraintName("fk_comment_user");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserName).HasName("user_pkey");

            entity.ToTable("user");

            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .HasColumnName("userName");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(50)
                .HasColumnName("passwordHash");

            entity.HasMany(b => b.Blogs)
                .WithOne(c => c.Author)
                .HasForeignKey(c => c.AuthorUserName);

            entity.HasMany(b => b.Comments)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserName);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
