using System.Collections.Generic;
using System.IO;
using System.Linq;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Domain.Entities.Localization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreSpa.Web.SeedData
{
    public class WebSeedData : IWebSeedData
    {
        private readonly ILocalizationDbContext _context;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public WebSeedData(ILocalizationDbContext context, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
        }

        public void Initialise()
        {
            _context.Database.Migrate();

            AddLocalisedData();
        }
        private void AddLocalisedData()
        {
            if (!_context.Cultures.Any())
            {
                var translations = File.ReadAllLines(Path.Combine(_hostingEnvironment.ContentRootPath, "translations.csv"));
                ;

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
