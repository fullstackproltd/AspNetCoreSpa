using AspNet.Security.OpenIdConnect.Primitives;
using AspNetCoreSpa.Core;
using AspNetCoreSpa.Core.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        void Seed();
    }

    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        private readonly IHostingEnvironment _hostingEnvironment;

        public DatabaseInitializer(
            ApplicationDbContext context,
            ILogger<DatabaseInitializer> logger,
            IHostingEnvironment hostingEnvironment
            )
        {
            _context = context;
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;
        }

        public void Seed()
        {
            _context.Database.Migrate();

            AddLocalisedData();
        }
        private void AddLocalisedData()
        {
            if (!_context.Cultures.Any())
            {
                var translations = _hostingEnvironment.GetTranslationFile();

                var locales = translations.First().Split(",").Skip(1).ToList();

                var currentLocale = 0;

                locales.ForEach(locale =>
                {
                    currentLocale += 1;

                    var culture = new Culture
                    {
                        Name = locale
                    };
                    var resources = new List<Resource>();
                    translations.Skip(1).ToList().ForEach(t =>
                    {
                        var line = t.Split(",");
                        resources.Add(new Resource
                        {
                            Culture = culture,
                            Key = line[0],
                            Value = line[currentLocale]
                        });
                    });

                    culture.Resources = resources;

                    _context.Cultures.Add(culture);

                    _context.SaveChanges();
                });
            }
        }
    }
}
