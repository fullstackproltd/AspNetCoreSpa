using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using IdentityServer4;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Interfaces;
using IdentityServer4.EntityFramework.Mappers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AspNetCoreSpa.STS
{
    public interface ISeedData
    {
        void Seed(IServiceProvider serviceProvider);
    }

    public class SeedData : ISeedData
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        public SeedData(RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }
        public void Seed(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetService<PersistedGrantDbContext>().Database.Migrate();

                var configContext = scope.ServiceProvider.GetService<ConfigurationDbContext>();
                configContext.Database.Migrate();
                SeedIdentityServerConfigData(configContext);

                // Seeding Users and roles
                var appContext = scope.ServiceProvider.GetService<ApplicationDbContext>();
                appContext.Database.Migrate();
                CreateRoles();
                CreateUsers(appContext);

            }
        }

        private void SeedIdentityServerConfigData(IConfigurationDbContext context)
        {
            if (!context.Clients.Any())
            {
                var clientUrls = Startup.Configuration["ClientUrls"];

                foreach (var client in Config.GetClients(clientUrls).ToList())
                {
                    context.Clients.Add(client.ToEntity());
                }
                context.SaveChanges();
            }

            if (!context.IdentityResources.Any())
            {
                foreach (var resource in Config.GetIdentityResources().ToList())
                {
                    context.IdentityResources.Add(resource.ToEntity());
                }
                context.SaveChanges();
            }

            if (!context.ApiResources.Any())
            {
                foreach (var resource in Config.GetApiResources().ToList())
                {
                    context.ApiResources.Add(resource.ToEntity());
                }
                context.SaveChanges();
            }
        }

        private void CreateRoles()
        {
            var rolesToAdd = new List<ApplicationRole>(){
                new ApplicationRole { Name = "Admin", Description = "Role with full rights" },
                new ApplicationRole { Name = "User", Description = "Role with limited rights" }
            };
            foreach (var role in rolesToAdd)
            {
                if (!_roleManager.RoleExistsAsync(role.Name).Result)
                {
                    _roleManager.CreateAsync(role).Result.ToString();
                }
            }
        }
        private void CreateUsers(ApplicationDbContext context)
        {
            if (!context.ApplicationUsers.Any())
            {
                var adminUser = new ApplicationUser { UserName = "admin@admin.com", FirstName = "Admin first", LastName = "Admin last", Email = "admin@admin.com", Mobile = "0123456789", EmailConfirmed = true, CreatedDate = DateTime.Now, IsEnabled = true };
                _userManager.CreateAsync(adminUser, "P@ssw0rd!").Result.ToString();
                _userManager.AddClaimAsync(adminUser, new Claim(IdentityServerConstants.StandardScopes.Phone, adminUser.Mobile.ToString(), ClaimValueTypes.Integer)).Result.ToString();
                _userManager.AddToRoleAsync(_userManager.FindByNameAsync("admin@admin.com").GetAwaiter().GetResult(), "Admin").Result.ToString();

                var normalUser = new ApplicationUser { UserName = "user@user.com", FirstName = "First", LastName = "Last", Email = "user@user.com", Mobile = "0123456789", EmailConfirmed = true, CreatedDate = DateTime.Now, IsEnabled = true };
                _userManager.CreateAsync(normalUser, "P@ssw0rd!").Result.ToString();
                _userManager.AddClaimAsync(adminUser, new Claim(IdentityServerConstants.StandardScopes.Phone, adminUser.Mobile.ToString(), ClaimValueTypes.Integer)).Result.ToString();
                _userManager.AddToRoleAsync(_userManager.FindByNameAsync("user@user.com").GetAwaiter().GetResult(), "User").Result.ToString();
            }
        }
    }
}