using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreSpa.Server.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AspNetCoreSpa.Server
{
    public class SeedDbData
    {
        readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public SeedDbData(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task EnsureSeedDataAsync()
        {
            await CreateRoles(); // Add roles
            await CreateUsers(); // Add users
            AddLanguagesAndContent();
        }

        private async Task CreateRoles()
        {
            var rolesToAdd = new List<ApplicationRole> {
                new ApplicationRole {Name = "Admin", Description = "This role will have full rights to the website"},
                new ApplicationRole {Name = "User", Description = "This role will have limited rights to the website"}
                };
            foreach (var role in rolesToAdd)
            {
                if (!await _roleManager.RoleExistsAsync(role.Name))
                {
                    await _roleManager.CreateAsync(role);
                }
            }
        }
        private async Task CreateUsers()
        {
            var users = new List<ApplicationUser>()
            {
                new ApplicationUser { UserName = "admin@admin.com",  Email = "admin@admin.com", EmailConfirmed = true, Firstname = "Asad", Lastname = "Sahi"},
                new ApplicationUser { UserName = "user@user.com",  Email = "user@user.com", EmailConfirmed = true, Firstname = "First", Lastname = "Last"},
            };

            if (await _userManager.FindByEmailAsync(users[0].Email) == null)
            {
                await _userManager.CreateAsync(users[0], "P@ssw0rd!");
                var currentUser = await _userManager.FindByEmailAsync(users[0].Email);
                var rolesResult = await _userManager.AddToRoleAsync(currentUser, "Admin");
            }

            if (await _userManager.FindByEmailAsync(users[1].Email) == null)
            {
                await _userManager.CreateAsync(users[1], "P@ssw0rd!");
                var currentUser = await _userManager.FindByEmailAsync(users[1].Email);
                var rolesResult = await _userManager.AddToRoleAsync(currentUser, "User");
            }

        }

        private void AddLanguagesAndContent()
        {
            if (!_context.Languageses.Any())
            {
                _context.Languageses.Add(new Language { Id = 1, Locale = "en", Description = "English" });
                _context.Languageses.Add(new Language { Id = 2, Locale = "fr", Description = "Frensh" });
                _context.SaveChanges();
            }

            if (!_context.Content.Any())
            {
                _context.Content.Add(new Content { Id = 1, Key = "TITLE" });
                _context.SaveChanges();
            }

            if (!_context.ContentText.Any())
            {
                _context.ContentText.Add(new ContentText { Text = "Site title", LanguageId = 1, ContentId = 1 });
                _context.ContentText.Add(new ContentText { Text = "Titre du site", LanguageId = 2, ContentId = 1 });
                _context.SaveChanges();
            }
        }

    }
}
