using System.IO;
using Microsoft.Extensions.Configuration;

namespace AspNetCoreSpa.Application
{
    public static class ServiceCollections
    {
        public static IConfigurationBuilder AddCustomAppSettings(this IConfigurationBuilder configuration, string contentRoot, string environment)
        {
            var sharedFolder = Path.Combine(contentRoot, "..", "..", "Core", "Application");
            return configuration.AddConfiguration(sharedFolder, environment);
        }

        public static IConfigurationBuilder AddConfiguration(this IConfigurationBuilder configuration, string path, string environmentName)
        {
            configuration
                .AddJsonFile(Path.Combine(path, "sharedsettings.json"), optional: true) // When running using dotnet run
                .AddJsonFile("sharedsettings.json", optional: true) // When app is published
                .AddJsonFile(Path.Combine(path, $"sharedsettings.{environmentName}.json"), optional: true)
                .AddJsonFile($"sharedsettings.{environmentName}.json", optional: true)
                .AddJsonFile("appsettings.json", optional: true)
                .AddJsonFile($"appsettings.{environmentName}.json", optional: true);

            configuration.AddEnvironmentVariables();

            return configuration;
        }
    }
}
