using System;
using AspNetCoreSpa.Application;
using AspNetCoreSpa.STS.Seed;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace AspNetCoreSpa.STS
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
                    logger.LogInformation("Seeding STS database");
                    var seedData = services.GetRequiredService<IIdentitySeedData>();
                    seedData.Seed(services);
                }
                catch (Exception ex)
                {
                    logger.LogCritical("Error creating/seeding STS database - " + ex);
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
