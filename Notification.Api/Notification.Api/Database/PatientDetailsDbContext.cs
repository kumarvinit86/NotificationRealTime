using Microsoft.EntityFrameworkCore;
using Notification.Api.Model;
using System;

namespace Notification.Api.Database;

public class PatientDetailsDbContext : DbContext
{
    public PatientDetailsDbContext(DbContextOptions<PatientDetailsDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Add your model configuration here
        modelBuilder.Entity<Patient>()
            .HasMany(p => p.PatientDocuments)
            .WithOne(pd => pd.Patient)
            .HasForeignKey(pd => pd.PatientId);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Patient> Patients { get; set; }
    public DbSet<PatientDocument> PatientDocuments { get; set; }
    public DbSet<UserSubscription> UserSubscriptions { get; set; }
}
