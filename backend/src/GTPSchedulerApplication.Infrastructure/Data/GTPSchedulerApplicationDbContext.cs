using Microsoft.EntityFrameworkCore;
using GTPSchedulerApplication.Core.Entities;

namespace GTPSchedulerApplication.Infrastructure.Data
{
    public class GTPSchedulerApplicationDbContext : DbContext
    {
        public GTPSchedulerApplicationDbContext(DbContextOptions<GTPSchedulerApplicationDbContext> options) : base(options) { }

        public DbSet<Tutor> Tutors { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<SchoolClass> SchoolClasses { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<TutorSubject> TutorSubjects { get; set; }
        public DbSet<TutorAvailability> TutorAvailabilities { get; set; }
        public DbSet<Assignment> Assignments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure many-to-many relationship
            modelBuilder.Entity<TutorSubject>()
                .HasKey(ts => new { ts.TutorId, ts.SubjectId });

            // Configure TimeOnly properties (if using .NET 6+)
            modelBuilder.Entity<SchoolClass>()
                .Property(e => e.StartTime)
                .HasConversion<TimeSpan>();

            modelBuilder.Entity<TutorAvailability>()
                .Property(e => e.StartTime)
                .HasConversion<TimeSpan>();

            modelBuilder.Entity<TutorAvailability>()
                .Property(e => e.EndTime)
                .HasConversion<TimeSpan>();

            // Seed data
            modelBuilder.Entity<Subject>().HasData(
                new Subject { Id = 1, Name = "Biology", Code = "BIO" },
                new Subject { Id = 2, Name = "Physics", Code = "PHY" },
                new Subject { Id = 3, Name = "Computer Science", Code = "CS" }
            );
        }
    }
}
