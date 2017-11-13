using System.Collections.Generic;
using System.Linq;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.ViewModels;
using Microsoft.AspNetCore.Http;

namespace AspNetCoreSpa.Server.Services
{
    public class ContentService : IContentService
    {
        private readonly ApplicationDbContext _context;
        public ContentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Language> GetLanguages()
        {
            return _context.Languages.ToList();
        }
        public Dictionary<string, string> GetContent(string lang)
        {
            var result = (from c in _context.Content
                          join t in _context.ContentText on c.Id equals t.ContentId
                          join l in _context.Languages on t.LanguageId equals l.Id
                          where l.Locale == lang
                          select new ContentVm
                          {
                              Key = c.Key,
                              Value = t.Text
                          }).ToDictionary(x => x.Key, x => x.Value);


            return result;
        }
    }
}