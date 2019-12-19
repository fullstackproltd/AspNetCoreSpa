using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using AspNetCoreSpa.Application.Extensions;
using AspNetCoreSpa.Application.Settings;
using AspNetCoreSpa.Common;
using AspNetCoreSpa.Infrastructure.Identity;
using AspNetCoreSpa.Infrastructure.Identity.Entities;
using AspNetCoreSpa.Infrastructure.Identity.Services;
using AspNetCoreSpa.Infrastructure.Localization;
using AspNetCoreSpa.Infrastructure.Localization.EFLocalizer;
using AspNetCoreSpa.Infrastructure.Repositories;
using AspNetCoreSpa.Infrastructure.Repositories.Interfaces;
using AspNetCoreSpa.Infrastructure.Services;
using AspNetCoreSpa.Infrastructure.Services.Application;
using AspNetCoreSpa.Infrastructure.Services.Certificate;
using AspNetCoreSpa.Infrastructure.Services.Email;
using AspNetCoreSpa.Infrastructure.Services.SeedData;
using AspNetCoreSpa.Infrastructure.Services.Uow;
using IdentityServer4;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Localization;
using Microsoft.IdentityModel.Tokens;

namespace AspNetCoreSpa.Infrastructure
{
    public static class ServiceCollections
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            // TODO 
            //services.AddSingleton<IStringLocalizerFactory, EFStringLocalizerFactory>();
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<IApplicationService, ApplicationService>();
            services.AddScoped<IUnitOfWork, HttpUnitOfWork>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IOrdersRepository, OrdersRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IProductCategoryRepository, ProductCategoryRepository>();
            return services;
        }

        public static IServiceCollection AddCustomCors(this IServiceCollection services, IConfiguration configuration)
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

        public static IServiceCollection AddCustomLocalization(this IServiceCollection services)
        {
            services.AddLocalization(options => options.ResourcesPath = "Resources");
            services.Configure<RequestLocalizationOptions>(
                options =>
                {
                    var supportedCultures = new List<CultureInfo>
                    {
                        new CultureInfo("en-US"),
                        new CultureInfo("de-DE"),
                        new CultureInfo("de-CH"),
                        new CultureInfo("it-IT"),
                        new CultureInfo("gsw-CH"),
                        new CultureInfo("fr-FR")
                    };

                    options.DefaultRequestCulture = new RequestCulture(culture: "de-DE", uiCulture: "de-DE");
                    options.SupportedCultures = supportedCultures;
                    options.SupportedUICultures = supportedCultures;

                    var providerQuery = new LocalizationQueryProvider
                    {
                        QureyParamterName = "ui_locales"
                    };

                    options.RequestCultureProviders.Insert(0, providerQuery);
                });

            return services;
        }
        public static IIdentityServerBuilder AddCustomIdentity(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.AddTransient<IClientInfoService, ClientInfoService>();

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

                    options.ClientId = "476611152863-ltgqfk9jhq1vsenin5039n58ogkraltb.apps.googleusercontent.com";
                    options.ClientSecret = "rSHvhgdOQUB4KMc5JS1alzhg";
                })
                .AddOpenIdConnect("aad", "Login with Azure AD", options =>
                {
                    options.Authority = $"https://login.microsoftonline.com/common";
                    options.TokenValidationParameters = new TokenValidationParameters { ValidateIssuer = false };
                    options.ClientId = "99eb0b9d-ca40-476e-b5ac-6f4c32bfb530";
                    options.CallbackPath = "/signin-oidc";
                    options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;
                })
                .AddIdentityServerJwt();

            return identityBuilder;
        }

        public static IServiceCollection AddIdentityDb(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
        {
            services.AddDbContext<IdentityServerDbContext>(options =>
            {
                options.UseSqlite(configuration.GetConnectionString("Identity"),
                    b => b.MigrationsAssembly("AspNetCoreSpa.Infrastructure"));

                if (environment.IsDevelopment())
                {
                    options.EnableSensitiveDataLogging();
                }
            });

            return services;
        }

        public static IServiceCollection AddCustomConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            // Custom configuration
            services.ConfigurePoco<EmailSettings>(configuration.GetSection(nameof(EmailSettings)));

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
