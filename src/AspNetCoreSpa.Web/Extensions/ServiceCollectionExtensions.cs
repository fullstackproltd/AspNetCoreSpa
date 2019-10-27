using AspNetCoreSpa.Web.Filters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Globalization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using AspNetCoreSpa.Infrastructure;
using System.Linq;
using AspNetCoreSpa.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace AspNetCoreSpa.Web.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCustomizedMvc(this IServiceCollection services)
        {
            // https://stackoverflow.com/a/51241314/1190512
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddControllersWithViews(options =>
            {
                options.Filters.Add(typeof(ModelValidationFilter));
            });
            services.AddRazorPages()
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            })
            .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
            .AddDataAnnotationsLocalization();

            return services;
        }
        public static IServiceCollection AddCustomDbContext(this IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContextPool<ApplicationDbContext>(options =>
            {
                string useSqLite = Startup.Configuration["Data:useSqLite"];
                string useInMemory = Startup.Configuration["Data:useInMemory"];
                if (useInMemory.ToLower() == "true")
                {
                    options.UseInMemoryDatabase("AspNetCoreSpa"); // Takes database name
                }
                else if (useSqLite.ToLower() == "true")
                {
                    var connection = Startup.Configuration["Data:SqlLiteConnectionString"];
                    options.UseSqlite(connection, b =>
                    {
                        b.MigrationsAssembly("AspNetCoreSpa.Web");
                        //b.UseNetTopologySuite();
                    });
                }
                else
                {
                    var connection = Startup.Configuration["Data:SqlServerConnectionString"];
                    options.UseSqlServer(connection, b =>
                    {
                        b.MigrationsAssembly("AspNetCoreSpa.Web");
                        // Add foolowing package to enable net topology suite for sql server:
                        // <PackageReference Include = "Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite" Version = "2.2.0" />
                        //b.UseNetTopologySuite();
                    });
                }
            });
            return services;
        }

        public static IServiceCollection AddCustomLocalization(this IServiceCollection services, IWebHostEnvironment hostingEnvironment)
        {
            var translationFile = File.ReadAllLines(Path.Combine(hostingEnvironment.ContentRootPath, "translations.csv"));

            var cultures = translationFile.First().Split(",").Skip(1);

            services.Configure<RequestLocalizationOptions>(opts =>
            {
                var supportedCultures = cultures.Select(c => new CultureInfo(c)).ToList();

                opts.DefaultRequestCulture = new RequestCulture(cultures.First());
                // Formatting numbers, dates, etc.
                opts.SupportedCultures = supportedCultures;
                // UI strings that we have localized.
                opts.SupportedUICultures = supportedCultures;
            });

            services.AddLocalization(options => options.ResourcesPath = "Resources");

            return services;
        }
        public static IServiceCollection RegisterCustomServices(this IServiceCollection services)
        {
            // New instance every time, only configuration class needs so its ok
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<ApiExceptionFilter>();
            services.AddInfrastructurServices();
            return services;
        }

    }
}
