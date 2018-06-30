
using AspNetCoreSpa.Core.Entities;
using AspNetCoreSpa.Infrastructure.Services;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Infrastructure
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        private readonly UserResolverService _userService;

        public string CurrentUserId { get; internal set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationUserPhoto> ApplicationUserPhotos { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<Culture> Cultures { get; set; }
        public DbSet<Resource> Resources { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, UserResolverService userService) : base(options)
        {
            _userService = userService;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes()
            .Where(e => typeof(IAuditable).IsAssignableFrom(e.ClrType)))
            {
                modelBuilder.Entity(entityType.ClrType)
                    .Property<DateTime>("CreatedAt");

                modelBuilder.Entity(entityType.ClrType)
                    .Property<DateTime>("UpdatedAt");

                modelBuilder.Entity(entityType.ClrType)
                    .Property<string>("CreatedBy");

                modelBuilder.Entity(entityType.ClrType)
                    .Property<string>("UpdatedBy");
            }

            base.OnModelCreating(modelBuilder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }

        /// <summary>
        /// Override SaveChanges so we can call the new AuditEntities method.
        /// </summary>
        /// <returns></returns>
        public override int SaveChanges()
        {
            this.AuditEntities();
            return base.SaveChanges();
        }
        /// <summary>
        /// Override SaveChangesAsync so we can call the new AuditEntities method.
        /// </summary>
        /// <returns></returns>
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            this.AuditEntities();

            return await base.SaveChangesAsync(cancellationToken);
        }

        /// <summary>
        /// Method that will set the Audit properties for every added or modified Entity marked with the 
        /// IAuditable interface.
        /// </summary>
        private void AuditEntities()
        {

            DateTime now = DateTime.Now;
            // Get the authenticated user name 
            string userName = _userService.GetUser();

            // For every changed entity marked as IAditable set the values for the audit properties
            foreach (EntityEntry<IAuditable> entry in ChangeTracker.Entries<IAuditable>())
            {
                // If the entity was added.
                if (entry.State == EntityState.Added)
                {
                    entry.Property("CreatedBy").CurrentValue = userName;
                    entry.Property("CreatedAt").CurrentValue = now;
                }
                else if (entry.State == EntityState.Modified) // If the entity was updated
                {
                    entry.Property("UpdatedBy").CurrentValue = userName;
                    entry.Property("UpdatedAt").CurrentValue = now;
                }
            }
        }
    }
}
