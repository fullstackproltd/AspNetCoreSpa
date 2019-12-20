using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using AspNetCoreSpa.Application;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Infrastructure;
using AspNetCoreSpa.Infrastructure.Localization.EFLocalizer;
using AspNetCoreSpa.Persistence;
using AspNetCoreSpa.Web.Extensions;
using AspNetCoreSpa.Web.Filters;
using AspNetCoreSpa.Web.SeedData;
using AspNetCoreSpa.Web.Services;
using AspNetCoreSpa.Web.SignalR;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

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
            //services.AddSingleton<IStringLocalizerFactory, EFStringLocalizerFactory>();

            services.AddTransient<IApplicationService, ApplicationService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddTransient<IWebSeedData, WebSeedData>();
            services.AddScoped<ApiExceptionFilter>();

            services.AddInfrastructure()
                .AddApplication()
                .AddCustomConfiguration(Configuration)
                .AddPersistence(Configuration)
                .AddCustomSignalR();

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

            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //                .AddJwtBearer(options =>
            //                {
            //                    // base-address of your identity server
            //                    options.Authority = Configuration["StsAuthority"];
            //                    // name of the API resource
            //                    options.Audience = "spa-api";
            //                });

            // https://stackoverflow.com/a/51241314/1190512
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddControllersWithViews();
            services.AddRazorPages()
                .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
                .AddDataAnnotationsLocalization();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist/aspnetcorespa";
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AspNetCoreSpa", Version = "v1" });

                var security = new Dictionary<string, IEnumerable<string>>
                {
                    {"Bearer", new string[] { }},
                };

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "oauth2" }
                        },
                        new[] { "readAccess", "writeAccess" }
                    }
                });

            });

        }
        public void Configure(IApplicationBuilder app)
        {
            app.UseHealthChecks("/health");

            // app.AddCustomSecurityHeaders();

            if (HostingEnvironment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // Enable middleware to serve generated Swagger as a JSON endpoint
                app.UseSwagger();
                // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "V1 Docs");
                });
            }
            else
            {
                app.UseHsts();
                app.UseResponseCompression();
            }

            var options = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(options.Value);

            app.UseHttpsRedirection();

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
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseCookiePolicy();
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
                              spa.UseAngularCliServer(npmScript: "start");
                              //   OR
                              //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                          }
                      });
        }
    }
}
