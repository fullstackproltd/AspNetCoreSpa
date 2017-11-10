using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AspNetCoreSpa.Server.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using OpenIddict.Core;
using OpenIddict.Models;

namespace AspNetCoreSpa.Server
{
    public class SeedDbData
    {
        readonly ApplicationDbContext _context;
        private readonly IHostingEnvironment _hostingEnv;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public SeedDbData(IWebHost host, ApplicationDbContext context)
        {
            var services = (IServiceScopeFactory)host.Services.GetService(typeof(IServiceScopeFactory));
            var serviceScope = services.CreateScope();
            _hostingEnv = serviceScope.ServiceProvider.GetService<IHostingEnvironment>();
            _roleManager = serviceScope.ServiceProvider.GetService<RoleManager<ApplicationRole>>();
            _userManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
            _context = context;
            CreateRoles(); // Add roles
            CreateUsers(); // Add users
            AddLanguagesAndContent();
            AddOpenIdConnectOptions(serviceScope, CancellationToken.None).GetAwaiter().GetResult();
        }

        private void CreateRoles()
        {
            var rolesToAdd = new List<ApplicationRole>(){
                new ApplicationRole { Name= "Admin", Description = "Full rights role"},
                new ApplicationRole { Name= "User", Description = "Limited rights role"}
            };
            foreach (var role in rolesToAdd)
            {
                if (!_roleManager.RoleExistsAsync(role.Name).Result)
                {
                    _roleManager.CreateAsync(role).Result.ToString();
                }
            }
        }
        private void CreateUsers()
        {
            if (!_context.ApplicationUsers.Any())
            {

                _userManager.CreateAsync(new ApplicationUser { UserName = "admin@admin.com", FirstName = "Admin first", LastName = "Admin last", Email = "admin@admin.com", EmailConfirmed = true, CreatedDate = DateTime.Now, IsEnabled = true }, "P@ssw0rd!").Result.ToString();
                _userManager.AddToRoleAsync(_userManager.FindByNameAsync("admin@admin.com").GetAwaiter().GetResult(), "Admin").Result.ToString();

                _userManager.CreateAsync(new ApplicationUser { UserName = "user@user.com", FirstName = "First", LastName = "Last", Email = "user@user.com", EmailConfirmed = true, CreatedDate = DateTime.Now, IsEnabled = true }, "P@ssw0rd!").Result.ToString();
                _userManager.AddToRoleAsync(_userManager.FindByNameAsync("user@user.com").GetAwaiter().GetResult(), "User").Result.ToString();
            }
        }
        private void AddLanguagesAndContent()
        {
            if (!_context.Languages.Any())
            {
                _context.Languages.Add(new Language { Locale = "en", Description = "English" });
                _context.SaveChanges();
                _context.Languages.Add(new Language { Locale = "fr", Description = "Frensh" });
                _context.SaveChanges();
            }

            if (!_context.Content.Any())
            {
                _context.Content.Add(new Content { Key = "TITLE" });
                _context.SaveChanges();
                _context.Content.Add(new Content { Key = "APP_NAV_HOME" });
                _context.SaveChanges();
                _context.Content.Add(new Content { Key = "APP_NAV_EXAMPLES" });
                _context.SaveChanges();
                _context.Content.Add(new Content { Key = "APP_NAV_LOGIN" });
                _context.SaveChanges();
                _context.Content.Add(new Content { Key = "APP_NAV_LOGOUT" });
                _context.SaveChanges();
                _context.Content.Add(new Content { Key = "APP_NAV_REGISTER" });
                _context.SaveChanges();
            }

            if (!_context.ContentText.Any())
            {
                _context.ContentText.Add(new ContentText { Text = "Site title", LanguageId = 1, ContentId = 1 });
                _context.ContentText.Add(new ContentText { Text = "Titre du site", LanguageId = 2, ContentId = 1 });

                _context.ContentText.Add(new ContentText { Text = "Home", LanguageId = 1, ContentId = 2 });
                _context.ContentText.Add(new ContentText { Text = "Accueil", LanguageId = 2, ContentId = 2 });

                _context.ContentText.Add(new ContentText { Text = "Examples", LanguageId = 1, ContentId = 3 });
                _context.ContentText.Add(new ContentText { Text = "Exemples", LanguageId = 2, ContentId = 3 });

                _context.ContentText.Add(new ContentText { Text = "Login", LanguageId = 1, ContentId = 4 });
                _context.ContentText.Add(new ContentText { Text = "S'identifier", LanguageId = 2, ContentId = 4 });

                _context.ContentText.Add(new ContentText { Text = "Logout", LanguageId = 1, ContentId = 5 });
                _context.ContentText.Add(new ContentText { Text = "Connectez - Out", LanguageId = 2, ContentId = 5 });

                _context.ContentText.Add(new ContentText { Text = "Register", LanguageId = 1, ContentId = 6 });
                _context.ContentText.Add(new ContentText { Text = "registre", LanguageId = 2, ContentId = 6 });

                _context.SaveChanges();
            }
        }

        private async Task AddOpenIdConnectOptions(IServiceScope services, CancellationToken cancellationToken)
        {
            var manager = services.ServiceProvider.GetService<OpenIddictApplicationManager<OpenIddictApplication>>();
            
            if (await manager.FindByClientIdAsync("aspnetcorespa", cancellationToken) == null)
            {
                var descriptor = new OpenIddictApplicationDescriptor
                {
                    ClientId = "aspnetcorespa",
                    DisplayName = "AspnetCoreSpa",
                    PostLogoutRedirectUris = { new Uri("http://localhost:5000/signout-oidc") },
                    RedirectUris = { new Uri("http://localhost:5000") }
                    // RedirectUris = { new Uri("http://localhost:5000/signin-oidc") }
                };

                await manager.CreateAsync(descriptor, cancellationToken);
            }

            // if (await manager.FindByClientIdAsync("resource-server-1", cancellationToken) == null)
            // {
            //     var descriptor = new OpenIddictApplicationDescriptor
            //     {
            //         ClientId = "resource-server-1",
            //         ClientSecret = "846B62D0-DEF9-4215-A99D-86E6B8DAB342"
            //     };

            //     await manager.CreateAsync(descriptor, cancellationToken);
            // }

            // if (await manager.FindByClientIdAsync("resource-server-2", cancellationToken) == null)
            // {
            //     var descriptor = new OpenIddictApplicationDescriptor
            //     {
            //         ClientId = "resource-server-2",
            //         ClientSecret = "C744604A-CD05-4092-9CF8-ECB7DC3499A2"
            //     };

            //     await manager.CreateAsync(descriptor, cancellationToken);
            // }

        }

    }
}
