using System;
using AspNet.Security.OAuth.GitHub;
using AspNet.Security.OAuth.LinkedIn;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;

namespace AspNetCoreSpa.Server.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseCustomWebpackDevMiddleware(this IApplicationBuilder app)
        {
            app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
            {
                HotModuleReplacement = true,
                ConfigFile = "config/webpack.dev.js"
            });
            return app;
        }
        public static IApplicationBuilder UseCustomSwaggerApi(this IApplicationBuilder app)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();
            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "V1 Docs");
            });

            return app;
        }
        // Configure XSRF middleware, This pattern is for SPA style applications where XSRF token is added on Index page 
        // load and passed back token on every subsequent async request            
        public static IApplicationBuilder UseXsrf(this IApplicationBuilder app)
        {
            var antiforgery = app.ApplicationServices.GetRequiredService<IAntiforgery>();

            app.Use(async (context, next) =>
            {
                if (string.Equals(context.Request.Path.Value, "/", StringComparison.OrdinalIgnoreCase))
                {
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions() { HttpOnly = false });
                }
                await next.Invoke();
            });

            return app;
        }
        public static IApplicationBuilder AddDevMiddlewares(this IApplicationBuilder app)
        {
            var env = app.ApplicationServices.GetRequiredService<IHostingEnvironment>();
            var loggerFactory = app.ApplicationServices.GetRequiredService<ILoggerFactory>();

            if (env.IsDevelopment())
            {
                loggerFactory.AddConsole(Startup.Configuration.GetSection("Logging"));
                loggerFactory.AddDebug();
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseCustomWebpackDevMiddleware();
                // NOTE: For SPA swagger needs adding before MVC
                app.UseCustomSwaggerApi();
            }

            loggerFactory.AddSerilog();

            return app;
        }

        public static IApplicationBuilder SetupMigrations(this IApplicationBuilder app)
        {
            // For more details on creating database during deployment see http://go.microsoft.com/fwlink/?LinkID=615859
            try
            {
                var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
                serviceScope.ServiceProvider.GetService<ApplicationDbContext>().Database.Migrate();
            }
            catch (Exception) { }
            return app;
        }

        public static IApplicationBuilder UseOAuthProviders(this IApplicationBuilder app)
        {
            // Facebook Auth
            app.UseFacebookAuthentication(new FacebookOptions()
            {
                AppId = Startup.Configuration["Authentication:Facebook:AppId"],
                AppSecret = Startup.Configuration["Authentication:Facebook:AppSecret"]
            });
            // Google Auth
            app.UseGoogleAuthentication(new GoogleOptions()
            {
                ClientId = Startup.Configuration["Authentication:Google:ClientId"],
                ClientSecret = Startup.Configuration["Authentication:Google:ClientSecret"]
            });
            // Twitter Auth
            // https://apps.twitter.com/
            app.UseTwitterAuthentication(new TwitterOptions()
            {
                ConsumerKey = Startup.Configuration["Authentication:Twitter:ConsumerKey"],
                ConsumerSecret = Startup.Configuration["Authentication:Twitter:ConsumerSecret"]
            });
            // Microsoft Auth
            // https://apps.dev.microsoft.com/?mkt=en-us#/appList
            app.UseMicrosoftAccountAuthentication(new MicrosoftAccountOptions()
            {
                ClientId = Startup.Configuration["Authentication:Microsoft:ClientId"],
                ClientSecret = Startup.Configuration["Authentication:Microsoft:ClientSecret"]
            });

            // Note: Below social providers are supported through this open source library:
            // https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers

            // Github Auth
            // https://github.com/settings/developers
            app.UseGitHubAuthentication(new GitHubAuthenticationOptions
            {
                ClientId = Startup.Configuration["Authentication:Github:ClientId"],
                ClientSecret = Startup.Configuration["Authentication:Github:ClientSecret"]
            });

            app.UseLinkedInAuthentication(new LinkedInAuthenticationOptions
            {
                ClientId = Startup.Configuration["Authentication:LinkedIn:ClientId"],
                ClientSecret = Startup.Configuration["Authentication:LinkedIn:ClientSecret"]
            });

            return app;
        }
    }
}
