using System;
using Microsoft.Extensions.Localization;

namespace AspNetCoreSpa.Infrastructure
{
    public class EFStringLocalizerFactory : IStringLocalizerFactory
    {
        private readonly ApplicationDbContext _context;

        public EFStringLocalizerFactory(ApplicationDbContext context)
        {
            _context = context;
        }

        public IStringLocalizer Create(Type resourceSource)
        {
            return new EFStringLocalizer(_context);
        }

        public IStringLocalizer Create(string baseName, string location)
        {
            return new EFStringLocalizer(_context);
        }
    }
}
