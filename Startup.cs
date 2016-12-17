using System;
using System.IO;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using AspNet.Security.OAuth.GitHub;
using AspNet.Security.OAuth.LinkedIn;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server.Kestrel;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using AspNetCoreSpa.Server;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.Filters;
using AspNetCoreSpa.Server.Repositories;
using AspNetCoreSpa.Server.Repositories.Abstract;
using AspNetCoreSpa.Server.Services;
using AspNetCoreSpa.Server.Services.Abstract;
using Serilog;

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
                           .AddEnvironmentVariables();
            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();
            }

            Configuration = builder.Build();
        }

        public static IConfigurationRoot Configuration { get; set; }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            if (_hostingEnv.IsDevelopment())
            {
                var cert = new X509Certificate2(Path.Combine(_hostingEnv.ContentRootPath, "extra", "cert.pfx"), "game123");

                services.Configure<KestrelServerOptions>(options =>
                {
                    options.UseHttps(cert);

                });
            }
            services.AddOptions();
            // To add response caching
            services.AddResponseCompression();

            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                string useSqLite = Configuration["Data:useSqLite"];
                if (useSqLite.ToLower() == "true")
                {
                    options.UseSqlite(Configuration["Data:SqlLiteConnectionString"]);
                }
                else
                {
                    options.UseSqlServer(Configuration["Data:SqlServerConnectionString"]);
                }

            });

            // For api unauthorised calls return 401 with no body
            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.Cookies.ApplicationCookie.LoginPath = "/login";
                options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = ctx =>
                    {
                        if (ctx.Request.Path.StartsWithSegments("/api") &&
                            ctx.Response.StatusCode == (int)HttpStatusCode.OK)
                        {
                            ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        }
                        else
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                        return Task.FromResult(0);
                    }
                };
            })
            .AddEntityFrameworkStores<ApplicationDbContext, int>()
            .AddDefaultTokenProviders();

            // In memory caching
            services.AddMemoryCache();

            // New instance every time, only configuration class needs so its ok
            services.AddTransient<UserResolverService>();
            services.AddScoped<ILoggingRepository, LoggingRepository>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<ISmsSender, SmsSender>();
            services.Configure<SmsSettings>(options => Configuration.GetSection("SmsSettingsTwillio").Bind(options));
            services.AddTransient<SeedDbData>();

            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");

            services.AddScoped<ApiExceptionFilter>();

            services.AddMvc()
            .AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            // Node services are to execute any arbitrary nodejs code from .net
            services.AddNodeServices();

            services.AddSwaggerGen();

        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IAntiforgery antiforgery, SeedDbData seedData)
        {
            if (env.IsDevelopment())
            {
                loggerFactory.AddSerilog();
                loggerFactory.AddConsole(Configuration.GetSection("Logging"));
                loggerFactory.AddDebug();
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
                app.UseResponseCompression();

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

            // // Facebook Auth
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
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });


            await seedData.EnsureSeedDataAsync();
        }
    }
}
