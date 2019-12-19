using System.IO;
using System.Reflection;
using AspNetCoreSpa.Application.Behaviours;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AspNetCoreSpa.Application
{
    public static class ServiceCollections
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestPerformanceBehaviour<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(RequestValidationBehavior<,>));

            return services;
        }

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
