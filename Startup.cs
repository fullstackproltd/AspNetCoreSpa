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
using Microsoft.AspNetCore.SpaServices.AngularCli;

namespace AspNetCoreSpa
{
    public class Startup
    {
        // Order or run
        //1) Constructor
        //2) Configure services
        //3) Configure

        public static IHostingEnvironment _hostingEnv;
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

            services.AddCustomHeaders();

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

            services.AddCustomOpenIddict(_hostingEnv);

            services.AddMemoryCache();

            services.RegisterCustomServices();

            services.AddSignalR();

            services.AddCustomLocalization();

            services.AddCustomizedMvc();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            // Node services are to execute any arbitrary nodejs code from .net
            services.AddNodeServices();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "AspNetCoreSpa", Version = "v1" });
            });
        }
        public void Configure(IApplicationBuilder app)
        {
            app.UseCustomisedCsp();

            app.UseCustomisedHeadersMiddleware();

            app.AddCustomLocalization();

            app.AddDevMiddlewares();

            if (_hostingEnv.IsProduction())
            {
                app.UseResponseCompression();
            }

            app.SetupMigrations();

            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseSignalR(routes =>
            {
                routes.MapHub<Chat>("chathub");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                   name: "default",
                   template: "{controller}/{action=Index}/{id?}");

                // http://stackoverflow.com/questions/25982095/using-googleoauth2authenticationoptions-got-a-redirect-uri-mismatch-error
                // routes.MapRoute(name: "signin-google", template: "signin-google", defaults: new { controller = "Account", action = "ExternalLoginCallback" });

                routes.MapRoute(name: "set-language", template: "setlanguage", defaults: new { controller = "Home", action = "SetLanguage" });

                // routes.MapSpaFallbackRoute(name: "spa-fallback", defaults: new { controller = "Home", action = "Index" });
            });

            app.UseSpa(spa =>
                      {
                          spa.Options.SourcePath = "ClientApp";

                          /*
                          // If you want to enable server-side rendering (SSR),
                          // [1] In AspNetCoreSpa.csproj, change the <BuildServerSideRenderer> property
                          //     value to 'true', so that the SSR bundle is built during publish
                          // [2] Uncomment this code block
                          */
                          spa.UseSpaPrerendering(options =>
                         {
                             options.BootModulePath = $"{spa.Options.SourcePath}/dist-server/main.bundle.js";
                             options.BootModuleBuilder = _hostingEnv.IsDevelopment() ? new AngularCliBuilder(npmScript: "build:ssr") : null;
                             options.ExcludeUrls = new[] { "/sockjs-node" };
                         });

                          if (_hostingEnv.IsDevelopment())
                          {
                              //   spa.UseAngularCliServer(npmScript: "start");
                              spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                          }
                      });

        }

    }
}
