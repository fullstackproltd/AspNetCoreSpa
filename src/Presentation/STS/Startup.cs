using System.Reflection;
using AspNetCoreSpa.Common;
using AspNetCoreSpa.Infrastructure;
using AspNetCoreSpa.STS.Resources;
using AspNetCoreSpa.STS.Seed;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

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
            services.AddTransient<IProfileService, CustomProfileService>();
            services.AddTransient<IIdentitySeedData, IdentitySeedData>();
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
