using System;
using AspNetCoreSpa.Application;
using AspNetCoreSpa.Web.SeedData;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

[assembly: ApiConventionType(typeof(DefaultApiConventions))]

namespace AspNetCoreSpa.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                try
                {
                    logger.LogInformation("Seeding API database");
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
