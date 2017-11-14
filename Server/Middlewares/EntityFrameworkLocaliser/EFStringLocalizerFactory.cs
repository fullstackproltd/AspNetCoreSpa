using System;
using System.Collections.Generic;
using AspNetCoreSpa.Server.Entities;
using Microsoft.Extensions.Localization;

namespace AspNetCoreSpa.Server.Middlewares.EntityFrameworkLocalizer
{
    public class EFStringLocalizerFactory : IStringLocalizerFactory
    {
        private readonly ApplicationDbContext db;

        public EFStringLocalizerFactory(ApplicationDbContext _db)
        {
            db = _db;
        }

        public IStringLocalizer Create(Type resourceSource)
        {
            return new EFStringLocalizer(db);
        }

        public IStringLocalizer Create(string baseName, string location)
        {
            return new EFStringLocalizer(db);
        }
    }
}
