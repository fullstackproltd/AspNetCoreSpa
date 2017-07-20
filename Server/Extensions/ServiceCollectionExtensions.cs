using System.IO;
using System.Security.Cryptography.X509Certificates;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.Filters;
using AspNetCoreSpa.Server.Services;
using AspNetCoreSpa.Server.Services.Abstract;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using AspNet.Security.OpenIdConnect.Primitives;
using Microsoft.AspNetCore.Identity;
using OpenIddict.Core;
using OpenIddict.Models;

namespace AspNetCoreSpa.Server.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSslCertificate(this IServiceCollection services, IHostingEnvironment hostingEnv)
        {
            var cert = new X509Certificate2(Path.Combine(hostingEnv.ContentRootPath, "extra", "cert.pfx"), "game123");

            //services.Configure<KestrelServerOptions>(options =>
            //{
            //    options.UseHttps(cert);
            //});

            return services;
        }
        public static IServiceCollection AddCustomizedMvc(this IServiceCollection services)
        {
            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(ModelValidationFilter));
            })
            .AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            return services;
        }
        public static IServiceCollection AddCustomIdentity(this IServiceCollection services)
        {
            // For api unauthorised calls return 401 with no body
            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.Password.RequiredLength = 4;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                //options.Cookies.ApplicationCookie.AutomaticChallenge = false;
                //options.Cookies.ApplicationCookie.LoginPath = "/login";
                //options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
                //{
                //    OnRedirectToLogin = ctx =>
                //    {
                //        if (ctx.Request.Path.StartsWithSegments("/api") &&
                //            ctx.Response.StatusCode == (int)HttpStatusCode.OK)
                //        {
                //            ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                //        }
                //        else if (ctx.Response.StatusCode == (int)HttpStatusCode.Forbidden)
                //        {
                //            ctx.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                //        }
                //        else
                //        {
                //            ctx.Response.Redirect(ctx.RedirectUri);
                //        }
                //        return Task.FromResult(0);
                //    }
                //};
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            return services;
        }
        public static IServiceCollection AddCustomOpenIddict(this IServiceCollection services)
        {
            // Configure Identity to use the same JWT claims as OpenIddict instead
            // of the legacy WS-Federation claims it uses by default (ClaimTypes),
            // which saves you from doing the mapping in your authorization controller.
            services.Configure<IdentityOptions>(options =>
            {
                options.ClaimsIdentity.UserNameClaimType = OpenIdConnectConstants.Claims.Name;
                options.ClaimsIdentity.UserIdClaimType = OpenIdConnectConstants.Claims.Subject;
                options.ClaimsIdentity.RoleClaimType = OpenIdConnectConstants.Claims.Role;
            });

            // Register the OpenIddict services.
            services.AddOpenIddict(options =>
            {
                // Register the Entity Framework stores.
                options.AddEntityFrameworkCoreStores<ApplicationDbContext>();

                // Register the ASP.NET Core MVC binder used by OpenIddict.
                // Note: if you don't call this method, you won't be able to
                // bind OpenIdConnectRequest or OpenIdConnectResponse parameters.
                options.AddMvcBinders();

                // Enable the authorization, logout, token and userinfo endpoints.
                options.EnableAuthorizationEndpoint("/connect/authorize")
                       .EnableLogoutEndpoint("/connect/logout")
                       .EnableTokenEndpoint("/connect/token")
                       .EnableUserinfoEndpoint("/api/userinfo");

                // Note: the Mvc.Client sample only uses the code flow and the password flow, but you
                // can enable the other flows if you need to support implicit or client credentials.
                options.AllowAuthorizationCodeFlow()
                       .AllowPasswordFlow()
                       .AllowRefreshTokenFlow();

                // Make the "client_id" parameter mandatory when sending a token request.
                options.RequireClientIdentification();

                // When request caching is enabled, authorization and logout requests
                // are stored in the distributed cache by OpenIddict and the user agent
                // is redirected to the same page with a single parameter (request_id).
                // This allows flowing large OpenID Connect requests even when using
                // an external authentication provider like Google, Facebook or Twitter.
                options.EnableRequestCaching();

                // During development, you can disable the HTTPS requirement.
                options.DisableHttpsRequirement();

                // Note: to use JWT access tokens instead of the default
                // encrypted format, the following lines are required:
                //
                // options.UseJsonWebTokens();
                options.AddEphemeralSigningKey();
            });

            return services;
        }
        public static IServiceCollection AddCustomDbContext(this IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                string useSqLite = Startup.Configuration["Data:useSqLite"];
                if (useSqLite.ToLower() == "true")
                {
                    options.UseSqlite(Startup.Configuration["Data:SqlLiteConnectionString"]);
                }
                else
                {
                    options.UseSqlServer(Startup.Configuration["Data:SqlServerConnectionString"]);
                }
                options.UseOpenIddict();
            });
            return services;
        }
        public static IServiceCollection RegisterCustomServices(this IServiceCollection services)
        {
            // New instance every time, only configuration class needs so its ok
            services.Configure<SmsSettings>(options => Startup.Configuration.GetSection("SmsSettingsTwillio").Bind(options));
            services.AddTransient<UserResolverService>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<ISmsSender, SmsSender>();
            services.AddScoped<ApiExceptionFilter>();
            return services;
        }

        public static IServiceCollection RegisterOAuthProviders(this IServiceCollection services)
        {
            services.AddAuthentication()
                .AddGoogle(options =>
                {
                    options.ClientId = Startup.Configuration["Authentication:Google:ClientId"];
                    options.ClientSecret = Startup.Configuration["Authentication:Google:ClientSecret"];
                })
            .AddFacebook(options =>
            {
                options.AppId = Startup.Configuration["Authentication:Facebook:AppId"];
                options.AppSecret = Startup.Configuration["Authentication:Facebook:AppSecret"];
            })
            //// https://apps.twitter.com/
            .AddTwitter(options =>
            {
                options.ConsumerKey = Startup.Configuration["Authentication:Twitter:ConsumerKey"];
                options.ConsumerSecret = Startup.Configuration["Authentication:Twitter:ConsumerSecret"];
            })
            //// https://apps.dev.microsoft.com/?mkt=en-us#/appList
            .AddMicrosoftAccount(options =>
            {
                options.ClientId = Startup.Configuration["Authentication:Microsoft:ClientId"];
                options.ClientSecret = Startup.Configuration["Authentication:Microsoft:ClientSecret"];
            });

            //// Note: Below social providers are supported through this open source library:
            //// https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers

            //// Github Auth
            //// https://github.com/settings/developers
            //services.UseGitHubAuthentication(new GitHubAuthenticationOptions
            //{
            //    ClientId = Startup.Configuration["Authentication:Github:ClientId"],
            //    ClientSecret = Startup.Configuration["Authentication:Github:ClientSecret"]
            //});

            //services.UseLinkedInAuthentication(new LinkedInAuthenticationOptions
            //{
            //    ClientId = Startup.Configuration["Authentication:LinkedIn:ClientId"],
            //    ClientSecret = Startup.Configuration["Authentication:LinkedIn:ClientSecret"]
            //});

            return services;
        }

    }
}
