using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Domain.Entities.Localization;

namespace AspNetCoreSpa.Application.Features.System.Commands.SeedLocalizationData
{
    public class LocalizationDataSeeder
    {
        private readonly ILocalizationDbContext _context;

        public LocalizationDataSeeder(ILocalizationDbContext context)
        {
            _context = context;
        }
        public async Task SeedAllAsync(string contentRoot, CancellationToken cancellationToken)
        {
            if (!_context.Cultures.Any())
            {
                var translations = File.ReadAllLines(Path.Combine(contentRoot, "translations.csv"));
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
                });

                await _context.SaveChangesAsync(cancellationToken);
            }
        }

    }
}