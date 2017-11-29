using AspNetCoreSpa.Server;
using AspNetCoreSpa.Server.Extensions;
using AspNetCoreSpa.Server.Services;
using AspNetCoreSpa.Server.SignalR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Swashbuckle.AspNetCore.Swagger;

namespace AspNetCoreSpa
{
    public class Startup
    {
        // Order or run
        //1) Constructor
        //2) Configure services
        //3) Configure
        private IHostingEnvironment HostingEnvironment { get; }
        public static IConfiguration Configuration { get; set; }

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            HostingEnvironment = env;
            Configuration = configuration;

            Helpers.SetupSerilog();

        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCustomHeaders();

            services.AddOptions();

            services.AddResponseCompression();

            services.AddCustomDbContext();

            services.AddCustomIdentity();

            services.AddCustomOpenIddict(HostingEnvironment);

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
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApplicationDataService appService)
        {
            // if (env.IsProduction())
            // {
            //     var options = new RewriteOptions().AddRedirectToHttps();
            //     app.UseRewriter(options);
            // }

            app.UseCustomisedCsp();

            app.UseCustomisedHeadersMiddleware();

            app.AddCustomLocalization();

            app.AddDevMiddlewares();

            if (env.IsProduction())
            {
                app.UseResponseCompression();
            }

            app.SetupMigrations();

            // https://github.com/openiddict/openiddict-core/issues/518
            // And
            // https://github.com/aspnet/Docs/issues/2384#issuecomment-297980490
            var options = new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            };
            options.KnownNetworks.Clear();
            options.KnownProxies.Clear();
            app.UseForwardedHeaders(options);

            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

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
                          //   spa.UseSpaPrerendering(options =>
                          //  {
                          //      options.BootModulePath = $"{spa.Options.SourcePath}/dist-server/main.bundle.js";
                          //      options.BootModuleBuilder = env.IsDevelopment() ? new AngularCliBuilder(npmScript: "build:ssr") : null;
                          //      options.ExcludeUrls = new[] { "/sockjs-node" };
                          //      options.SupplyData = (requestContext, obj) =>
                          //      {
                          //          var result = appService.GetApplicationData(requestContext).GetAwaiter().GetResult();
                          //          obj.Add("appData", result);
                          //      };

                          //  });

                          if (env.IsDevelopment())
                          {
                              spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                          }
                      });

        }

    }
}
