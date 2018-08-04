﻿using AspNet.Security.OpenIdConnect.Primitives;
using AspNetCoreSpa.Web.Filters;
using AspNetCoreSpa.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Globalization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using AspNetCoreSpa.Core.Entities;
using AspNetCoreSpa.Infrastructure;
using Microsoft.Extensions.FileProviders;

namespace AspNetCoreSpa.Web.Extensions
{
    public static class ServiceCollectionExtensions
    {
        // https://github.com/aspnet/JavaScriptServices/tree/dev/src/Microsoft.AspNetCore.SpaServices#debugging-your-javascripttypescript-code-when-it-runs-on-the-server
        // Url to visit:
        // chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        public static IServiceCollection AddPreRenderDebugging(this IServiceCollection services, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                services.AddNodeServices(options =>
                {
                    options.LaunchWithDebugging = true;
                    options.DebuggingPort = 9229;
                });
            }

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
            })
            .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
            .AddDataAnnotationsLocalization()
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            return services;
        }
        public static IServiceCollection AddCustomIdentity(this IServiceCollection services)
        {
            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                // options for user and password can be set here
                // options.Password.RequiredLength = 4;
                // options.Password.RequireNonAlphanumeric = false;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            return services;
        }
        public static IServiceCollection AddCustomOpenIddict(this IServiceCollection services, IHostingEnvironment env)
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

                // Enable the token endpoint.
                // Form password flow (used in username/password login requests)
                options.EnableTokenEndpoint("/connect/token");

                // Enable the authorization endpoint.
                // Form implicit flow (used in social login redirects)
                options.EnableAuthorizationEndpoint("/connect/authorize");

                // Enable the password and the refresh token flows.
                options.AllowPasswordFlow()
                       .AllowRefreshTokenFlow()
                       .AllowImplicitFlow(); // To enable external logins to authenticate

                options.SetAccessTokenLifetime(TimeSpan.FromMinutes(30));
                options.SetIdentityTokenLifetime(TimeSpan.FromMinutes(30));
                options.SetRefreshTokenLifetime(TimeSpan.FromMinutes(60));
                // During development, you can disable the HTTPS requirement.
                if (env.IsDevelopment())
                {
                    options.DisableHttpsRequirement();
                }

                // Note: to use JWT access tokens instead of the default
                // encrypted format, the following lines are required:
                //
                // options.UseJsonWebTokens();
                options.AddEphemeralSigningKey();
            });

            // If you prefer using JWT, don't forget to disable the automatic
            // JWT -> WS-Federation claims mapping used by the JWT middleware:
            //
            // JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            // JwtSecurityTokenHandler.DefaultOutboundClaimTypeMap.Clear();
            //
            // services.AddAuthentication()
            //     .AddJwtBearer(options =>
            //     {
            //         options.Authority = "http://localhost:54895/";
            //         options.Audience = "resource_server";
            //         options.RequireHttpsMetadata = false;
            //         options.TokenValidationParameters = new TokenValidationParameters
            //         {
            //             NameClaimType = OpenIdConnectConstants.Claims.Subject,
            //             RoleClaimType = OpenIdConnectConstants.Claims.Role
            //         };
            //     });

            // Alternatively, you can also use the introspection middleware.
            // Using it is recommended if your resource server is in a
            // different application/separated from the authorization server.
            //
            // services.AddAuthentication()
            //     .AddOAuthIntrospection(options =>
            //     {
            //         options.Authority = new Uri("http://localhost:54895/");
            //         options.Audiences.Add("resource_server");
            //         options.ClientId = "resource_server";
            //         options.ClientSecret = "875sqd4s5d748z78z7ds1ff8zz8814ff88ed8ea4z4zzd";
            //         options.RequireHttpsMetadata = false;
            //     });

            services.AddAuthentication(options =>
            {
                // This will override default cookies authentication scheme
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
               .AddOAuthValidation()
               // https://console.developers.google.com/projectselector/apis/library?pli=1
               .AddGoogle(options =>
               {
                   options.ClientId = Startup.Configuration["Authentication:Google:ClientId"];
                   options.ClientSecret = Startup.Configuration["Authentication:Google:ClientSecret"];
               })
               // https://developers.facebook.com/apps
               .AddFacebook(options =>
               {
                   options.AppId = Startup.Configuration["Authentication:Facebook:AppId"];
                   options.AppSecret = Startup.Configuration["Authentication:Facebook:AppSecret"];
               })
               // https://apps.twitter.com/
               .AddTwitter(options =>
               {
                   options.ConsumerKey = Startup.Configuration["Authentication:Twitter:ConsumerKey"];
                   options.ConsumerSecret = Startup.Configuration["Authentication:Twitter:ConsumerSecret"];
               })
               // https://apps.dev.microsoft.com/?mkt=en-us#/appList
               .AddMicrosoftAccount(options =>
               {
                   options.ClientId = Startup.Configuration["Authentication:Microsoft:ClientId"];
                   options.ClientSecret = Startup.Configuration["Authentication:Microsoft:ClientSecret"];
               });

            return services;
        }
        public static IServiceCollection AddCustomDbContext(this IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContextPool<ApplicationDbContext>(options =>
            {
                string useSqLite = Startup.Configuration["Data:useSqLite"];
                string useInMemory = Startup.Configuration["Data:useInMemory"];
                if (useInMemory.ToLower() == "true")
                {
                    options.UseInMemoryDatabase("AspNetCoreSpa"); // Takes database name
                }
                else if (useSqLite.ToLower() == "true")
                {
                    var connection = Startup.Configuration["Data:SqlLiteConnectionString"];
                    options.UseSqlite(connection);
                    options.UseSqlite(connection, b => b.MigrationsAssembly("AspNetCoreSpa.Web"));

                }
                else
                {
                    var connection = Startup.Configuration["Data:SqlServerConnectionString"];
                    options.UseSqlServer(connection);
                    options.UseSqlServer(connection, b => b.MigrationsAssembly("AspNetCoreSpa.Web"));
                }
                options.UseOpenIddict();
            });
            return services;
        }

        public static IServiceCollection AddCustomLocalization(this IServiceCollection services, IFileProvider fileProvider)
        {
            services.AddSingleton(fileProvider);
            services.Configure<RequestLocalizationOptions>(opts =>
            {
                var supportedCultures = new List<CultureInfo>
                    {
                        new CultureInfo("en-US"),
                        new CultureInfo("fr-FR"),
                        new CultureInfo("ru-RU"),
                        new CultureInfo("be-BY"),
                        new CultureInfo("uk-UA"),
                        new CultureInfo("kk-KZ"),
                    };

                opts.DefaultRequestCulture = new RequestCulture("en-US");
                // Formatting numbers, dates, etc.
                opts.SupportedCultures = supportedCultures;
                // UI strings that we have localized.
                opts.SupportedUICultures = supportedCultures;
            });

            services.AddLocalization(options => options.ResourcesPath = "Resources");

            return services;
        }
        public static IServiceCollection RegisterCustomServices(this IServiceCollection services)
        {
            // New instance every time, only configuration class needs so its ok
            services.AddSingleton<IStringLocalizerFactory, EFStringLocalizerFactory>();
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<IApplicationDataService, ApplicationDataService>();
            services.AddScoped<IUnitOfWork, HttpUnitOfWork>();
            services.AddTransient<IDatabaseInitializer, DatabaseInitializer>();
            services.AddTransient<ApplicationDbContext>();
            services.AddTransient<UserResolverService>();
            services.AddScoped<ApiExceptionFilter>();
            return services;
        }

    }
}
