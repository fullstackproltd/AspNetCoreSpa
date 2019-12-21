using System.Threading;
using System.Threading.Tasks;
using AspNetCoreSpa.Domain.Entities.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface ILocalizationDbContext
    {
        DbSet<Culture> Cultures { get; set; }
        DbSet<Resource> Resources { get; set; }
        DatabaseFacade Database { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    }
}