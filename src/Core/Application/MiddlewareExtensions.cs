using System.IO;
using Microsoft.Extensions.Configuration;

namespace AspNetCoreSpa.Application
{
    public static class MiddlewareExtensions
    {
        public static IConfigurationBuilder AddCustomAppSettings(this IConfigurationBuilder configuration, string contentRoot, string environment)
        {
            var sharedFolder = Path.Combine(contentRoot, "..", "..", "Core", "Application");
            configuration
                .AddJsonFile(Path.Combine(sharedFolder, "sharedsettings.json"), optional: true) // When running using dotnet run
                .AddJsonFile("sharedsettings.json", optional: true) // When app is published
                .AddJsonFile(Path.Combine(sharedFolder, $"sharedsettings.{environment}.json"), optional: true)
                .AddJsonFile($"sharedsettings.{environment}.json", optional: true)
                .AddJsonFile("appsettings.json", optional: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true);

            configuration.AddEnvironmentVariables();

            return configuration;
        }
    }
}
