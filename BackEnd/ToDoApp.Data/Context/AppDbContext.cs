using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DBTask = ToDoApp.Data.Models.Task;
using DBUser = ToDoApp.Data.Models.User;

namespace ToDoApp.Data.Context
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
            
        }

        public DbSet<DBTask> Tasks { get; set; }
        public DbSet<DBUser> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DBTask>()
                .HasOne(t => t.User)
                .WithMany(l => l.Tasks)
                .HasForeignKey(t => t.UserId);
        }
    }
}