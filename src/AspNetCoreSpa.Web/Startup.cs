﻿using AspNetCoreSpa.Web.Extensions;
using AspNetCoreSpa.Web.SignalR;
using AspNetCoreSpa.Core.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace AspNetCoreSpa.Web
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
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddPreRenderDebugging(HostingEnvironment);

            services.AddOptions();

            services.AddResponseCompression();

            services.AddCustomDbContext();

            services.AddMemoryCache();

            services.AddHealthChecks();

            services.RegisterCustomServices();

            services.AddSignalR()
                .AddMessagePackProtocol();

            services.AddCustomLocalization(HostingEnvironment);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                            .AddJwtBearer(options =>
                            {
                                // base-address of your identityserver
                                options.Authority = Configuration["StsAuthority"];
                                // name of the API resource
                                options.Audience = "spa-api";
                            });

            services.AddCustomizedMvc();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist/aspnetcorespa";
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "AspNetCoreSpa", Version = "v1" });

                // Swagger 2.+ support
                var security = new Dictionary<string, IEnumerable<string>>
                {
                    {"Bearer", new string[] { }},
                };

                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
                c.AddSecurityRequirement(security);

            });

            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<AutoMapperProfile>();
            });

        }
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseHealthChecks("/health");

            // app.AddCustomSecurityHeaders();

            if (env.IsDevelopment())
            {
                app.AddDevMiddlewares();
            }
            else
            {
                app.UseHsts();
                app.UseResponseCompression();
            }

            app.AddCustomLocalization();

            app.UseHttpsRedirection();

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

            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseCookiePolicy();

            app.UseSignalR(routes =>
            {
                routes.MapHub<Chat>("/chathub");
                routes.MapHub<ShapeHub>("/shapeHub");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                   name: "default",
                   template: "{controller}/{action=Index}/{id?}");

                // http://stackoverflow.com/questions/25982095/using-googleoauth2authenticationoptions-got-a-redirect-uri-mismatch-error
                // routes.MapRoute(name: "signin-google", template: "signin-google", defaults: new { controller = "Account", action = "ExternalLoginCallback" });

                routes.MapRoute(name: "set-language", template: "setlanguage", defaults: new { controller = "Home", action = "SetLanguage" });
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

                          if (env.IsDevelopment())
                          {
                              //   spa.UseAngularCliServer(npmScript: "start");
                              //   OR
                              spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                          }
                      });
        }
    }
}
