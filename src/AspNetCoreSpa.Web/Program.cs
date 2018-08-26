using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore;
using System;
using AspNetCoreSpa.Infrastructure;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;

namespace AspNetCoreSpa.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();

            Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .MinimumLevel.Override("System", LogEventLevel.Warning)
            .MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
            .Enrich.FromLogContext()
            .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}", theme: AnsiConsoleTheme.Literate)
            .CreateLogger();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                try
                {
                    logger.LogCritical("Seeding API database");
                    var dbInitialiser = services.GetRequiredService<IDatabaseInitializer>();
                    dbInitialiser.Seed();
                }
                catch (Exception ex)
                {
                    logger.LogCritical("Error creating/seeding API database - " + ex);
                }
            }

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
                  WebHost.CreateDefaultBuilder(args)
                        .ConfigureLogging(builder =>
                        {
                            builder.ClearProviders();
                            builder.AddSerilog();
                        })
                      .UseStartup<Startup>();
    }
}
