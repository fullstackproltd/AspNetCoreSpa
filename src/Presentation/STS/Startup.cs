using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using AspNetCoreSpa.Application.Settings;
using AspNetCoreSpa.Common;
using AspNetCoreSpa.Infrastructure;
using AspNetCoreSpa.Infrastructure.Services;
using AspNetCoreSpa.Infrastructure.Services.Email;
using IdentityServer4;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using STS.Models;
using STS.Resources;

namespace STS
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
            services.AddTransient<IProfileService, CustomProfileService>();
            services.AddTransient<ISeedData, SeedData>();
            services.AddSingleton<LocService>();

            services.AddInfrastructure()
                .AddCustomLocalization()
                .AddCustomCors(Configuration)
                .AddCustomConfiguration(Configuration)
                .AddIdentityDb(Configuration, Environment)
                .AddCustomIdentity(Configuration, Environment);

        
            
            var controllerWithViews = services.AddControllersWithViews();
            var razorPages = services.AddRazorPages()
            .AddViewLocalization()
            .AddDataAnnotationsLocalization(options =>
                           {
                               options.DataAnnotationLocalizerProvider = (type, factory) =>
                               {
                                   var assemblyName = new AssemblyName(typeof(SharedResource).GetTypeInfo().Assembly.FullName);
                                   return factory.Create("SharedResource", assemblyName.Name);
                               };
                           });

            if (Environment.IsDevelopment())
            {
                controllerWithViews.AddRazorRuntimeCompilation();
                razorPages.AddRazorRuntimeCompilation();
            }
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
            app.UseCors(Constants.DefaultCorsPolicy);
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
    }
}
