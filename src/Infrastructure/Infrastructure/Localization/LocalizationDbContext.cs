using System.Threading;
using System.Threading.Tasks;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Domain.Entities.Localization;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreSpa.Infrastructure.Localization
{
    public class LocalizationDbContext : DbContext, ILocalizationDbContext
    {
        public LocalizationDbContext(DbContextOptions<LocalizationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Culture> Cultures { get; set; }
        public DbSet<Resource> Resources { get; set; }

        public override int SaveChanges()
        {
            return base.SaveChanges();
        }
    }
}
