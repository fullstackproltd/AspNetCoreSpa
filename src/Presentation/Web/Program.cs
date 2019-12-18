using System;
using Infrastructure;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

[assembly: ApiConventionType(typeof(DefaultApiConventions))]

namespace Web
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
                    var dbInitialiser = services.GetRequiredService<ISeedData>();
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
                        .UseStartup<Startup>();
    }
}
