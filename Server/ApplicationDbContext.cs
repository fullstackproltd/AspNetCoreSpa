using AspNetCoreSpa.Server.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreSpa.Server
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<Language> Languageses { get; set; }
        public DbSet<Content> Content { get; set; }
        public DbSet<ContentText> ContentText { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Content
            modelBuilder.Entity<ContentText>()
                .HasOne(p => p.Content)
                .WithMany(b => b.ContentTexts)
                .HasForeignKey(p => p.ContentId)
                .HasConstraintName("ForeignKey_ContentText_Content");

            modelBuilder.Entity<ContentText>()
                .HasOne(p => p.Language)
                .WithMany(b => b.ContentTexts)
                .HasForeignKey(p => p.LanguageId)
                .HasConstraintName("ForeignKey_ContentText_Language");

            base.OnModelCreating(modelBuilder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }
}
