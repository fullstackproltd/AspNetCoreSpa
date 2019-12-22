using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Application.Extensions;
using AspNetCoreSpa.Application.Settings;
using AspNetCoreSpa.Common;
using AspNetCoreSpa.Infrastructure.Files;
using AspNetCoreSpa.Infrastructure.Identity;
using AspNetCoreSpa.Infrastructure.Identity.Entities;
using AspNetCoreSpa.Infrastructure.Localization;
using AspNetCoreSpa.Infrastructure.Localization.EFLocalizer;
using AspNetCoreSpa.Infrastructure.Persistence;
using AspNetCoreSpa.Infrastructure.Services;
using AspNetCoreSpa.Infrastructure.Services.Certificate;
using IdentityServer4;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Localization;
using Microsoft.IdentityModel.Tokens;
using NSwag;
using NSwag.Generation.Processors.Security;

namespace AspNetCoreSpa.Infrastructure
{
    public static class ServicesExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
            });

            services.AddScoped<IUserManager, UserManagerService>();
            services.AddTransient<INotificationService, NotificationService>();
            services.AddTransient<IDateTime, MachineDateTime>();
            services.AddTransient<ICsvFileBuilder, CsvFileBuilder>();

            services.AddHttpContextAccessor()
                .AddResponseCompression()
                .AddMemoryCache()
                .AddHealthChecks();

            // Shared configuration across apps
            services.AddCustomConfiguration(configuration)
                .AddCustomSignalR()
                .AddCustomCors(configuration)
                .AddCustomLocalization()
                .AddCustomUi(environment);

            return services;
        }

        public static IIdentityServerBuilder AddStsServer(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.AddTransient<IClientInfoService, ClientInfoService>();

            services.AddDbContext<IdentityServerDbContext>(options =>
            {
                options.UseSqlite(configuration.GetConnectionString("Identity"),
                    b => b.MigrationsAssembly(typeof(IdentityServerDbContext).Assembly.FullName));

                if (environment.IsDevelopment())
                {
                    options.EnableSensitiveDataLogging();
                }
            });

            services.AddDefaultIdentity<ApplicationUser>()
            .AddRoles<ApplicationRole>()
            .AddEntityFrameworkStores<IdentityServerDbContext>();

            var x509Certificate2 = GetCertificate(environment, configuration);

            var identityBuilder = services.AddIdentityServer()
                .AddSigningCredential(x509Certificate2)
                .AddApiAuthorization<ApplicationUser, IdentityServerDbContext>();

            // TODO: config
            services.AddAuthentication()
                .AddGoogle(options =>
                {
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                    options.ClientId = configuration["IdentityServer:ExternalAuth:Google:ClientId"];
                    options.ClientSecret = configuration["IdentityServer:ExternalAuth:Google:ClientSecret"];
                })
                .AddOpenIdConnect("aad", "Login with Azure AD", options =>
                {
                    options.Authority = configuration["IdentityServer:ExternalAuth:AzureAd:Authority"];
                    options.TokenValidationParameters = new TokenValidationParameters { ValidateIssuer = false };
                    options.ClientId = configuration["IdentityServer:ExternalAuth:AzureAd:ClientId"];
                    options.CallbackPath = configuration["IdentityServer:ExternalAuth:AzureAd:CallbackPath"];
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                })
                .AddIdentityServerJwt();

            return identityBuilder;
        }
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
                        b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName);
                        //b.UseNetTopologySuite();
                    });
                }
                else
                {
                    options.UseSqlServer(connectionString, b =>
                    {
                        b.MigrationsAssembly("AspNetCoreSpa.Infrastructure");
                        // Add foolowing package to enable net topology suite for sql server:
                        // <PackageReference Include = "Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite" Version = "2.2.0" />
                        //b.UseNetTopologySuite();
                    });
                }
            });

            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());

            return services;
        }

        public static IServiceCollection AddDbLocalization(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.AddDbContext<LocalizationDbContext>(options =>
                {
                    options.UseSqlite(configuration["DatA:Localization"],
                        b => b.MigrationsAssembly(typeof(LocalizationDbContext).Assembly.FullName));

                    if (environment.IsDevelopment())
                    {
                        options.EnableSensitiveDataLogging();
                    }
                },
            ServiceLifetime.Singleton,
            ServiceLifetime.Singleton);

            services.AddSingleton<IStringLocalizerFactory, EFStringLocalizerFactory>();
            services.AddSingleton<ILocalizationDbContext>(provider => provider.GetService<LocalizationDbContext>());

            return services;
        }
        private static IServiceCollection AddCustomLocalization(this IServiceCollection services)
        {
            services.AddLocalization(options => options.ResourcesPath = "Resources");
            services.Configure<RequestLocalizationOptions>(
                options =>
                {
                    var supportedCultures = new List<CultureInfo>
                    {
                        new CultureInfo("en-GB"),
                        new CultureInfo("en-US"),
                        new CultureInfo("de-DE"),
                        new CultureInfo("de-CH"),
                        new CultureInfo("it-IT"),
                        new CultureInfo("gsw-CH"),
                        new CultureInfo("fr-FR")
                    };

                    options.DefaultRequestCulture = new RequestCulture(culture: "en-GB", uiCulture: "en-GB");
                    options.SupportedCultures = supportedCultures;
                    options.SupportedUICultures = supportedCultures;
                });

            return services;
        }

        private static IServiceCollection AddCustomUi(this IServiceCollection services, IWebHostEnvironment environment)
        {
            services.AddOpenApiDocument(configure =>
            {
                configure.Title = "AspNetCoreSpa API";
                configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
                {
                    Type = OpenApiSecuritySchemeType.ApiKey,
                    Name = "Authorization",
                    In = OpenApiSecurityApiKeyLocation.Header,
                    Description = "Type into the textbox: Bearer {your JWT token}."
                });

                configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
            });

            // Customise default API behaviour
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            var controllerWithViews = services.AddControllersWithViews();
            var razorPages = services.AddRazorPages()
            .AddViewLocalization()
            .AddDataAnnotationsLocalization();

            if (environment.IsDevelopment())
            {
                controllerWithViews.AddRazorRuntimeCompilation();
                razorPages.AddRazorRuntimeCompilation();
            }

            return services;
        }

        private static IServiceCollection AddCustomConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            // Custom configuration
            services.ConfigurePoco<EmailSettings>(configuration.GetSection(nameof(EmailSettings)));

            return services;
        }
        private static IServiceCollection AddCustomCors(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(Constants.DefaultCorsPolicy,
                    builder =>
                    {
                        builder.WithOrigins(configuration["CorsOrigins"].Split(","))
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });

            return services;
        }

        private static IServiceCollection AddCustomSignalR(this IServiceCollection services)
        {
            services.AddSignalR()
                .AddMessagePackProtocol();

            return services;
        }

        private static X509Certificate2 GetCertificate(IWebHostEnvironment environment, IConfiguration configuration)
        {
            var useDevCertificate = bool.Parse(configuration["UseDevCertificate"]);

            var cert = new X509Certificate2(Path.Combine(environment.ContentRootPath, "sts_dev_cert.pfx"), "1234");

            if (environment.IsProduction() && !useDevCertificate)
            {
                var useLocalCertStore = Convert.ToBoolean(configuration["UseLocalCertStore"]);

                if (useLocalCertStore)
                {
                    using var store = new X509Store(StoreName.My, StoreLocation.LocalMachine);
                    var certificateThumbprint = configuration["CertificateThumbprint"];

                    store.Open(OpenFlags.ReadOnly);
                    var certs = store.Certificates.Find(X509FindType.FindByThumbprint, certificateThumbprint, false);
                    cert = certs[0];
                    store.Close();
                }
                else
                {
                    // Azure deployment, will be used if deployed to Azure
                    var vaultConfigSection = configuration.GetSection("Vault");
                    var keyVaultService = new KeyVaultCertificateService(vaultConfigSection["Url"], vaultConfigSection["ClientId"], vaultConfigSection["ClientSecret"]);
                    cert = keyVaultService.GetCertificateFromKeyVault(vaultConfigSection["CertificateName"]);
                }
            }
            return cert;
        }

    }
}
