using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.DependencyInjection;

namespace AspNetCoreSpa.Server.Extensions
{
    public static class DbContextExtensions
    {
        public static void Seed(this ApplicationDbContext context, IWebHost host)
        {
            if (context.AllMigrationsApplied())
            {
                var seed = new SeedDbData(host, context);
            }
        }

        public static bool AllMigrationsApplied(this ApplicationDbContext context)
        {
            var applied = context.GetService<IHistoryRepository>()
                .GetAppliedMigrations()
                .Select(m => m.MigrationId);

            var total = context.GetService<IMigrationsAssembly>()
                .Migrations
                .Select(m => m.Key);

            return !total.Except(applied).Any();
        }
    }
}