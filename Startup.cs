using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AspNetCoreSpa.Server;
using AspNetCoreSpa.Server.Extensions;
using Swashbuckle.AspNetCore.Swagger;
using System.Threading.Tasks;
using System.Net;
using AspNetCoreSpa.Server.SignalR;
using OpenIddict.Core;
using System;
using System.Threading;
using OpenIddict.Models;

namespace AspNetCoreSpa
{
    public class Startup
    {
        // Order or run
        //1) Constructor
        //2) Configure services
        //3) Configure

        private IHostingEnvironment _hostingEnv;
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            _hostingEnv = env;

            Helpers.SetupSerilog();

            // var builder = new ConfigurationBuilder()
            //                .SetBasePath(env.ContentRootPath)
            //                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            //                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
            //                .AddEnvironmentVariables();
            // if (env.IsDevelopment())
            // {
            //     // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
            //     builder.AddUserSecrets<Startup>();
            // }

            // Configuration = builder.Build();
        }

        public static IConfiguration Configuration { get; set; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            if (_hostingEnv.IsDevelopment())
            {
                services.AddSslCertificate(_hostingEnv);
            }
            services.AddOptions();

            services.AddResponseCompression(options =>
            {
                options.MimeTypes = Helpers.DefaultMimeTypes;
            });

            services.AddCustomDbContext();

            services.AddCustomIdentity();

            services.AddCustomOpenIddict();

            services.AddMemoryCache();

            services.RegisterCustomServices();

            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");

            services.AddSignalR();

            services.AddCustomizedMvc();

            // Node services are to execute any arbitrary nodejs code from .net
            services.AddNodeServices();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "AspNetCoreSpa", Version = "v1" });
            });
        }
        public void Configure(IApplicationBuilder app)
        {
            app.AddDevMiddlewares();

            if (_hostingEnv.IsProduction())
            {
                app.UseResponseCompression();
            }

            app.SetupMigrations();

            app.UseXsrf();

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseSignalR(routes =>
            {
                routes.MapHub<Chat>("chathub");
            });

            app.UseMvc(routes =>
            {
                // http://stackoverflow.com/questions/25982095/using-googleoauth2authenticationoptions-got-a-redirect-uri-mismatch-error
                routes.MapRoute(name: "signin-google", template: "signin-google", defaults: new { controller = "Account", action = "ExternalLoginCallback" });

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });


            // Seed the database with the sample applications.
            // Note: in a real world application, this step should be part of a setup script.
            InitializeAsync(app.ApplicationServices, CancellationToken.None).GetAwaiter().GetResult();

        }

        private async Task InitializeAsync(IServiceProvider services, CancellationToken cancellationToken)
        {
            // Create a new service scope to ensure the database context is correctly disposed when this methods returns.
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                await context.Database.EnsureCreatedAsync();

                var manager = scope.ServiceProvider.GetRequiredService<OpenIddictApplicationManager<OpenIddictApplication>>();

                if (await manager.FindByClientIdAsync("aspnetcorespa", cancellationToken) == null)
                {
                    var descriptor = new OpenIddictApplicationDescriptor
                    {
                        ClientId = "aspnetcorespa",
                        DisplayName = "AspnetCoreSpa",
                        PostLogoutRedirectUris = { new Uri("http://localhost:5000/signout-oidc") },
                        RedirectUris = { new Uri("http://localhost:5000/login") }
                        // RedirectUris = { new Uri("http://localhost:5000/signin-oidc") }
                    };

                    await manager.CreateAsync(descriptor, cancellationToken);
                }

                // if (await manager.FindByClientIdAsync("resource-server-1", cancellationToken) == null)
                // {
                //     var descriptor = new OpenIddictApplicationDescriptor
                //     {
                //         ClientId = "resource-server-1",
                //         ClientSecret = "846B62D0-DEF9-4215-A99D-86E6B8DAB342"
                //     };

                //     await manager.CreateAsync(descriptor, cancellationToken);
                // }

                // if (await manager.FindByClientIdAsync("resource-server-2", cancellationToken) == null)
                // {
                //     var descriptor = new OpenIddictApplicationDescriptor
                //     {
                //         ClientId = "resource-server-2",
                //         ClientSecret = "C744604A-CD05-4092-9CF8-ECB7DC3499A2"
                //     };

                //     await manager.CreateAsync(descriptor, cancellationToken);
                // }
            }

        }

    }
}
