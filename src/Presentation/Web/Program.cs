using System;
using System.Threading;
using System.Threading.Tasks;
using AspNetCoreSpa.Application;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Application.System.Commands.SeedSampleData;
using AspNetCoreSpa.Infrastructure.Localization;
using AspNetCoreSpa.Persistence;
using AspNetCoreSpa.Web.SeedData;
using MediatR;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

[assembly: ApiConventionType(typeof(DefaultApiConventions))]

namespace AspNetCoreSpa.Web
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                try
                {
                    var localizationDbContext = services.GetRequiredService<ILocalizationDbContext>();
                    localizationDbContext.Database.Migrate();

                    var applicationDbContext = services.GetRequiredService<IApplicationDbContext>();
                    applicationDbContext.Database.Migrate();

                    logger.LogInformation("Seeding Web And Localization Databases");

                    var mediator = services.GetRequiredService<IMediator>();
                    await mediator.Send(new SeedSampleDataCommand(), CancellationToken.None);

                    var dbInitialiser = services.GetRequiredService<IWebSeedData>();
                    dbInitialiser.Initialise();
                }
                catch (Exception ex)
                {
                    logger.LogError("Error creating/seeding API database - " + ex);
                }
            }

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
                  WebHost.CreateDefaultBuilder(args)
                        .ConfigureAppConfiguration((host, configuration) => configuration.AddCustomAppSettings(host.HostingEnvironment.ContentRootPath, host.HostingEnvironment.EnvironmentName))
                        .UseStartup<Startup>();
    }
}
