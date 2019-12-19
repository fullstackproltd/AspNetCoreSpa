using System;
using System.Collections.Generic;
using System.Text;
using AspNetCoreSpa.Application.Abstractions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AspNetCoreSpa.Persistence
{
    public static class ServiceCollections
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                bool.TryParse(configuration["Data:useSqLite"], out var useSqlite);
                bool.TryParse(configuration["Data:useInMemory"], out var useInMemory);
                var connectionString = configuration["Data:Web"];

                if (useInMemory)
                {
                    options.UseInMemoryDatabase(nameof(AspNetCoreSpa)); // Takes database name
                }
                else if (useSqlite)
                {
                    options.UseSqlite(connectionString, b =>
                    {
                        b.MigrationsAssembly("AspNetCoreSpa.Persistence");
                        //b.UseNetTopologySuite();
                    });
                }
                else
                {
                    options.UseSqlServer(connectionString, b =>
                    {
                        b.MigrationsAssembly("AspNetCoreSpa.Persistence");
                        // Add foolowing package to enable net topology suite for sql server:
                        // <PackageReference Include = "Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite" Version = "2.2.0" />
                        //b.UseNetTopologySuite();
                    });
                }
            });

            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());

            return services;
        }
    }
}
