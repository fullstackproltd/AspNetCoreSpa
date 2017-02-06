using System;
using System.Linq;
using AspNetCoreSpa.Server.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AspNetCoreSpa.Server
{
    public class ProcessDbCommands
    {
        public static void Process(string[] args, IWebHost host)
        {
            var services = (IServiceScopeFactory)host.Services.GetService(typeof(IServiceScopeFactory));
            var seedService = (SeedDbData)host.Services.GetService(typeof(SeedDbData));

            using (var scope = services.CreateScope())
            {
                if (args.Contains("dropdb"))
                {
                    Console.WriteLine("Dropping database");
                    var db = GetApplicationDbContext(scope);
                    db.Database.EnsureDeleted();
                    db.Database.EnsureCreated();
                }
                if (args.Contains("migratedb"))
                {
                    Console.WriteLine("Migrating database");
                    var db = GetApplicationDbContext(scope);
                    db.Database.Migrate();
                }
                if (args.Contains("seeddb"))
                {
                    Console.WriteLine("Seeding database");
                    var db = GetApplicationDbContext(scope);
                    db.Seed(host);
                }
            }
        }

        private static ApplicationDbContext GetApplicationDbContext(IServiceScope services)
        {
            var db = services.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            return db;
        }
    }
}