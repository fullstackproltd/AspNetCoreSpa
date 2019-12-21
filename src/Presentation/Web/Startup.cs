using System.Globalization;
using System.IO;
using System.Linq;
using AspNetCoreSpa.Application;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Infrastructure;
using AspNetCoreSpa.Web.Middlewares;
using AspNetCoreSpa.Web.SeedData;
using AspNetCoreSpa.Web.Services;
using AspNetCoreSpa.Web.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using NSwag;
using NSwag.Generation.Processors.Security;

namespace AspNetCoreSpa.Web
{
    public class Startup
    {
        // Order to run
        //1) Constructor
        //2) Configure services
        //3) Configure
        private IWebHostEnvironment HostingEnvironment { get; }
        public static IConfiguration Configuration { get; set; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            HostingEnvironment = env;
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.Unspecified;
            });

            services.AddTransient<IApplicationService, ApplicationService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddTransient<IWebSeedData, WebSeedData>();

            services.AddApplication()
                .AddInfrastructure()
                .AddCustomConfiguration(Configuration)
                .AddPersistence(Configuration)
                .AddDbLocalization(Configuration, HostingEnvironment)
                .AddCustomSignalR();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                            .AddJwtBearer(options =>
                            {
                                // base-address of your identity server
                                options.Authority = Configuration["Auth:Authority"];
                                // name of the API resource
                                options.Audience = Configuration["Auth:Audience"];
                            });

            var translationFile = File.ReadAllLines(Path.Combine(HostingEnvironment.ContentRootPath, "translations.csv"));
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

            services.AddCustomUi(HostingEnvironment);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist/aspnetcorespa";
            });

        }
        public void Configure(IApplicationBuilder app)
        {
            // https://github.com/openiddict/openiddict-core/issues/518
            // And
            // https://github.com/aspnet/Docs/issues/2384#issuecomment-297980490
            var forwardOptions = new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            };
            forwardOptions.KnownNetworks.Clear();
            forwardOptions.KnownProxies.Clear();
            app.UseForwardedHeaders(forwardOptions);

            if (HostingEnvironment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
                app.UseResponseCompression();
            }

            app.UseCustomExceptionHandler();
            //app.AddCustomSecurityHeaders();
            app.UseHealthChecks("/health");
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!HostingEnvironment.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseSwaggerUi3(settings =>
            {
                settings.Path = "/api";
                settings.DocumentPath = "/api/specification.json";
            });

            var options = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(options.Value);

            app.UseCookiePolicy();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                                   name: "default",
                                   pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();

                endpoints.MapHub<Chat>("/chathub");
                endpoints.MapHub<ShapeHub>("/shapeHub");
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
                          //    {
                          //        options.BootModulePath = $"{spa.Options.SourcePath}/dist-server/main.bundle.js";
                          //        options.BootModuleBuilder = env.IsDevelopment() ? new AngularCliBuilder(npmScript: "build:ssr") : null;
                          //        options.ExcludeUrls = new[] { "/sockjs-node" };
                          //        options.SupplyData = (requestContext, obj) =>
                          //        {
                          //          //  var result = appService.GetApplicationData(requestContext).GetAwaiter().GetResult();
                          //          obj.Add("Cookies", requestContext.Request.Cookies);
                          //        };
                          //    });

                          if (HostingEnvironment.IsDevelopment())
                          {
                              //spa.UseAngularCliServer(npmScript: "start");
                              //   OR
                              spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                          }
                      });
        }
    }
}
