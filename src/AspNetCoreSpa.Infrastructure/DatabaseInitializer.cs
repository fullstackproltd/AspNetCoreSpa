using AspNet.Security.OpenIdConnect.Primitives;
using AspNetCoreSpa.Core.Entities;
using AspNetCoreSpa.Infrastructure.EFLocalizer.Translation;
using CsvHelper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using OpenIddict.Core;
using OpenIddict.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Infrastructure
{
    public interface IDatabaseInitializer
    {
        Task SeedAsync(IConfiguration configuration);
    }

    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly OpenIddictApplicationManager<OpenIddictApplication> _openIddictApplicationManager;
        private readonly ILogger _logger;
        private readonly IFileProvider _fileProvider;

        public DatabaseInitializer(
            ApplicationDbContext context,
            ILogger<DatabaseInitializer> logger,
            OpenIddictApplicationManager<OpenIddictApplication> openIddictApplicationManager,
            RoleManager<ApplicationRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IFileProvider fileProvider
            )
        {
            _context = context;
            _logger = logger;
            _openIddictApplicationManager = openIddictApplicationManager;
            _roleManager = roleManager;
            _userManager = userManager;
            _fileProvider = fileProvider;
        }

        public async Task SeedAsync(IConfiguration configuration)
        {
            await _context.Database.MigrateAsync().ConfigureAwait(false);

            CreateRoles();
            CreateUsers();
            await AddLocalisedData();
            await AddOpenIdConnectOptions(configuration);
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
                var adminUser = new ApplicationUser { UserName = "admin@admin.com", FirstName = "Admin first", LastName = "Admin last", Email = "admin@admin.com", Mobile = "0123456789", EmailConfirmed = true, CreatedDate = DateTime.Now, IsEnabled = true };
                _userManager.CreateAsync(adminUser, "P@ssw0rd!").Result.ToString();
                _userManager.AddClaimAsync(adminUser, new Claim(OpenIdConnectConstants.Claims.PhoneNumber, adminUser.Mobile.ToString(), ClaimValueTypes.Integer)).Result.ToString();
                _userManager.AddToRoleAsync(_userManager.FindByNameAsync("admin@admin.com").GetAwaiter().GetResult(), "Admin").Result.ToString();

                var normalUser = new ApplicationUser { UserName = "user@user.com", FirstName = "First", LastName = "Last", Email = "user@user.com", Mobile = "0123456789", EmailConfirmed = true, CreatedDate = DateTime.Now, IsEnabled = true };
                _userManager.CreateAsync(normalUser, "P@ssw0rd!").Result.ToString();
                _userManager.AddClaimAsync(adminUser, new Claim(OpenIdConnectConstants.Claims.PhoneNumber, adminUser.Mobile.ToString(), ClaimValueTypes.Integer)).Result.ToString();
                _userManager.AddToRoleAsync(_userManager.FindByNameAsync("user@user.com").GetAwaiter().GetResult(), "User").Result.ToString();
            }
        }
        private IEnumerable<string> GetTranslationByIndex(Translation[] translations, string language)
        {
            switch (language)
            {
                case "en-US": return translations.Select(x => x.English);
                case "fr-FR": return translations.Select(x => x.French);
                case "ru-RU": return translations.Select(x => x.Russian);
                case "be-BY": return translations.Select(x => x.Belarussian);
                case "uk-UA": return translations.Select(x => x.Ukrainian);
                case "kk-KZ": return translations.Select(x => x.Kazakh);
                default: break;
            }

            return new string[0];
        }
        private async Task AddLocalisedData()
        {
            if (_context.Cultures.Any())
                return;

            var languages = new string[] {
                    "en-US",
                    "fr-FR",
                    "ru-RU",
                    "be-BY",
                    "uk-UA",
                    "kk-KZ"
                };

            // It should`ve work something like below
            // var fileInfo = _fileProvider.GetDirectoryContents("/**/Translation/*.csv");
            // (however, wildcards doesn't work fine in .net core 2.1 that`s why I`m using full path)
            // TODO: find better solution
            var fileInfo = _fileProvider
#if DEBUG
                .GetDirectoryContents("bin/Debug/netcoreapp2.1/EFLocalizer/Translation")
#elif RELEASE
                .GetDirectoryContents("bin/Release/netcoreapp2.1/EFLocalizer/Translation")
#endif
                .FirstOrDefault();

            if (fileInfo == null)
                throw new Exception("No csv translation file found");

            var csvTranslations = new CsvReader(File.OpenText(fileInfo.PhysicalPath));
            var translations = csvTranslations.GetRecords<Translation>().ToArray();

            var machineNames = translations.Select(x => x.MachineName).ToArray();
            var cultures = new Culture[languages.Length];

            for (int i = 0; i < cultures.Length; i++)
            {
                var resources = new Resource[machineNames.Length];
                var concreteTranslation = GetTranslationByIndex(translations, languages[i]).ToArray();

                for (int j = 0; j < resources.Length; j++)
                    resources[j] = new Resource
                    {
                        Key = machineNames[j],
                        Value = concreteTranslation[j]
                    };

                cultures[i] = new Culture
                {
                    Name = languages[i],
                    Resources = resources.ToList()
                };
            }

            csvTranslations.Dispose();

            _context.Cultures.AddRange(cultures);
            await _context.SaveChangesAsync();
        }

        private async Task AddOpenIdConnectOptions(IConfiguration configuration)
        {
            if (await _openIddictApplicationManager.FindByClientIdAsync("aspnetcorespa") == null)
            {
                var host = configuration["HostUrl"].ToString();

                var descriptor = new OpenIddictApplicationDescriptor
                {
                    ClientId = "aspnetcorespa",
                    DisplayName = "AspnetCoreSpa",
                    PostLogoutRedirectUris = { new Uri($"{host}signout-oidc") },
                    RedirectUris = { new Uri(host) },
                    Permissions =
                    {
                        OpenIddictConstants.Permissions.Endpoints.Authorization,
                        OpenIddictConstants.Permissions.Endpoints.Token,
                        OpenIddictConstants.Permissions.GrantTypes.Implicit,
                        OpenIddictConstants.Permissions.GrantTypes.Password,
                        OpenIddictConstants.Permissions.GrantTypes.RefreshToken
                    }
                };

                await _openIddictApplicationManager.CreateAsync(descriptor);
            }

        }
    }
}
