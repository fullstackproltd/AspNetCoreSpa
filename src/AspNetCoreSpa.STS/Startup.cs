using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using IdentityServer4.Services;
using System.Reflection;
using IdentityServer4;
using System;
using Microsoft.AspNetCore.HttpOverrides;
using System.Security.Cryptography.X509Certificates;
using AspNetCoreSpa.STS.Models;
using AspNetCoreSpa.STS.Resources;
using Microsoft.IdentityModel.Tokens;
using AspNetCoreSpa.STS.Services.Certificate;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using AspNetCoreSpa.STS.Services;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace AspNetCoreSpa.STS
{
    public class Startup
    {
        public static IConfiguration Configuration { get; set; }
        public IWebHostEnvironment Environment { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var x509Certificate2 = GetCertificate(Environment, Configuration);

            services.Configure<StsConfig>(Configuration.GetSection("StsConfig"));
            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));
            services.AddSingleton<LocService>();
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

            services.Configure<IISOptions>(options =>
            {
                options.AutomaticAuthentication = false;
                options.AuthenticationDisplayName = "Windows";
            });

            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            // Add framework services.
            services.AddDbContextPool<ApplicationDbContext>(options =>
            {
                options.UseSqlite(connectionString);
                options.UseSqlite(connectionString, b => b.MigrationsAssembly(migrationsAssembly));
            });

            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", corsBuilder =>
                {
                    corsBuilder.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
                });
            });

            services.AddTransient<ISeedData, SeedData>();
            services.AddTransient<IProfileService, CustomProfileService>();
            services.AddTransient<ApplicationDbContext>();

            services.AddControllersWithViews();
            services.AddRazorPages()
            .AddViewLocalization()
            .AddDataAnnotationsLocalization(options =>
                           {
                               options.DataAnnotationLocalizerProvider = (type, factory) =>
                               {
                                   var assemblyName = new AssemblyName(typeof(SharedResource).GetTypeInfo().Assembly.FullName);
                                   return factory.Create("SharedResource", assemblyName.Name);
                               };
                           });

            services.AddTransient<IProfileService, CustomProfileService>();

            services.AddTransient<IEmailSender, EmailSender>();

            var identityServer = services.AddIdentityServer(options =>
                {
                    options.Events.RaiseErrorEvents = true;
                    options.Events.RaiseInformationEvents = true;
                    options.Events.RaiseFailureEvents = true;
                    options.Events.RaiseSuccessEvents = true;
                })
                .AddSigningCredential(x509Certificate2)
                // this adds the config data from DB (clients, resources, CORS)
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = builder =>
                        builder.UseSqlite(connectionString,
                            sql => sql.MigrationsAssembly(migrationsAssembly));
                })

                // OR In memory config store
                //.AddInMemoryApiResources(Config.GetApiResources())
                //.AddInMemoryClients(Config.GetClients(Configuration["ClientUrls"]))
                //.AddInMemoryIdentityResources(Config.GetIdentityResources())

                // this adds the operational data from DB (codes, tokens, consents)
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = builder =>
                        builder.UseSqlite(connectionString,
                            sql => sql.MigrationsAssembly(migrationsAssembly));

                    // this enables automatic token cleanup. this is optional.
                    options.EnableTokenCleanup = true;
                    // options.TokenCleanupInterval = 15; // interval in seconds. 15 seconds useful for debugging
                })
                .AddAspNetIdentity<ApplicationUser>()
                .AddProfileService<CustomProfileService>();

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
                });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // https://github.com/openiddict/openiddict-core/issues/518
            // And
            // https://github.com/aspnet/Docs/issues/2384#issuecomment-297980490
            var forwarOptions = new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            };
            forwarOptions.KnownNetworks.Clear();
            forwarOptions.KnownProxies.Clear();

            app.UseForwardedHeaders(forwarOptions);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
                app.UseExceptionHandler("/Home/Error");
            }

            var locOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(locOptions.Value);

            app.UseHttpsRedirection();

            // app.UseMiddleware<AdminSafeListMiddleware>(
            //     Configuration["AdminSafeList"]);

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseIdentityServer();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
        }
    
        private static X509Certificate2 GetCertificate(IWebHostEnvironment environment, IConfiguration configuration)
            {
                var useDevCertificate = bool.Parse(configuration["UseDevCertificate"]);

                X509Certificate2 cert = new X509Certificate2(Path.Combine(environment.ContentRootPath, "sts_dev_cert.pfx"), "1234");

                if (environment.IsProduction() && !useDevCertificate)
                {
                    var useLocalCertStore = Convert.ToBoolean(configuration["UseLocalCertStore"]);

                    if (useLocalCertStore)
                    {
                        using (X509Store store = new X509Store(StoreName.My, StoreLocation.LocalMachine))
                        {
                            var certificateThumbprint = configuration["CertificateThumbprint"];

                            store.Open(OpenFlags.ReadOnly);
                            var certs = store.Certificates.Find(X509FindType.FindByThumbprint, certificateThumbprint, false);
                            cert = certs[0];
                            store.Close();
                        }
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
