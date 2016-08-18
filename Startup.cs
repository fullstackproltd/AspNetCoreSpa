using System;
using AspNet.Security.OAuth.GitHub;
using AspNet.Security.OAuth.LinkedIn;
using AspNetCoreSpa.Server;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.Repositories;
using AspNetCoreSpa.Server.Repositories.Abstract;
using AspNetCoreSpa.Server.Services;
using AspNetCoreSpa.Server.Services.Abstract;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Serilog;
using Serilog.Events;
using Swashbuckle.Swagger.Model;

namespace AspNetCoreSpa
{
    public class Startup
    {
        // Order or run
        //1) Constructor
        //2) Configure services
        //3) Configure

        private IHostingEnvironment _hostingEnv;
        public Startup(IHostingEnvironment env)
        {
            _hostingEnv = env;

            // Configure Serilog
            Log.Logger = new LoggerConfiguration()
            .MinimumLevel
            .Information()
            // .WriteTo.RollingFile("log-{Date}.txt", LogEventLevel.Information) // Uncomment if logging required on text file
            .WriteTo.Seq("http://localhost:5341/")
            .CreateLogger();

            var builder = new ConfigurationBuilder()
                           .SetBasePath(env.ContentRootPath)
                           .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                           .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                           .AddEnvironmentVariables()
                           .AddUserSecrets();
            Configuration = builder.Build();
        }

        public static IConfigurationRoot Configuration { get; set; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // New instance every time, only configuration class needs so its ok
            services.AddScoped<ILoggingRepository, LoggingRepository>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<ISmsSender, SmsSender>();

            services.AddTransient<SeedDbData>();

            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");

            services.AddMvc()
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                });

            services.AddSwaggerGen();

            // Add the detail information for the API.
            services.ConfigureSwaggerGen(options =>
            {
                options.SingleApiVersion(new Info
                {
                    Version = "v1",
                    Title = "AspNetCoreSpa Api",
                    Description = "Here is the api used in this application of different functionality",
                    TermsOfService = "None",
                    Contact = new Contact { Name = "Asad Sahi", Email = "", Url = "http://twitter.com/asadsahi" },
                    License = new License { Name = "Use under MIT", Url = "https://opensource.org/licenses/MIT" }
                });

                // //Determine base path for the application.
                // var basePath = PlatformServices.Default.Application.ApplicationBasePath;

                // //Set the comments path for the swagger json and ui.
                // options.IncludeXmlComments(basePath + "\\TodoApi.xml");
            });
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IAntiforgery antiforgery, SeedDbData seedData)
        {
            if (env.IsDevelopment())
            {
                loggerFactory.AddSerilog();
                // loggerFactory.AddConsole(Configuration.GetSection("Logging"));
                // loggerFactory.AddDebug();
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();

                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ConfigFile = "config/webpack.config.js"
                });

                // NOTE: For SPA swagger needs adding before MVC
                // Enable middleware to serve generated Swagger as a JSON endpoint
                app.UseSwagger();

                // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
                app.UseSwaggerUi();

            }
            else
            {
                // For more details on creating database during deployment see http://go.microsoft.com/fwlink/?LinkID=615859
                try
                {
                    using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
                    {
                        serviceScope.ServiceProvider.GetService<ApplicationDbContext>().Database.Migrate();
                    }
                }
                catch (Exception) { }

            }

            // Configure XSRF middleware, This pattern is for SPA style applications where XSRF token is added on Index page 
            // load and passed back token on every subsequent async request            
            app.Use(async (context, next) =>
            {
                if (string.Equals(context.Request.Path.Value, "/", StringComparison.OrdinalIgnoreCase))
                {
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions() { HttpOnly = false });
                }
                await next.Invoke();
            });

            app.UseStaticFiles();

            app.UseIdentity();

            // Facebook Auth
            // app.UseFacebookAuthentication(new FacebookOptions()
            // {
            //     AppId = Configuration["Authentication:Facebook:AppId"],
            //     AppSecret = Configuration["Authentication:Facebook:AppSecret"]
            // });
            // // Google Auth
            // app.UseGoogleAuthentication(new GoogleOptions()
            // {
            //     ClientId = Configuration["Authentication:Google:ClientId"],
            //     ClientSecret = Configuration["Authentication:Google:ClientSecret"]
            // });
            // // Twitter Auth
            // // https://apps.twitter.com/
            // app.UseTwitterAuthentication(new TwitterOptions()
            // {
            //     ConsumerKey = Configuration["Authentication:Twitter:ConsumerKey"],
            //     ConsumerSecret = Configuration["Authentication:Twitter:ConsumerSecret"]
            // });
            // // Microsoft Auth
            // // https://apps.dev.microsoft.com/?mkt=en-us#/appList
            // app.UseMicrosoftAccountAuthentication(new MicrosoftAccountOptions()
            // {
            //     ClientId = Configuration["Authentication:Microsoft:ClientId"],
            //     ClientSecret = Configuration["Authentication:Microsoft:ClientSecret"]
            // });

            // // Note: Below social providers are supported through this open source library:
            // // https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers

            // // Github Auth
            // // https://github.com/settings/developers
            // app.UseGitHubAuthentication(new GitHubAuthenticationOptions
            // {
            //     ClientId = Configuration["Authentication:Github:ClientId"],
            //     ClientSecret = Configuration["Authentication:Github:ClientSecret"]
            // });

            // app.UseLinkedInAuthentication(new LinkedInAuthenticationOptions
            // {
            //     ClientId = Configuration["Authentication:LinkedIn:ClientId"],
            //     ClientSecret = Configuration["Authentication:LinkedIn:ClientSecret"]
            // });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });


            await seedData.EnsureSeedDataAsync();
        }
    }
}
