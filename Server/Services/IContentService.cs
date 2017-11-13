using System.Collections.Generic;
using System.Linq;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.ViewModels;
using Microsoft.AspNetCore.Http;

namespace AspNetCoreSpa.Server.Services
{
    public interface IContentService
    {
        List<Language> GetLanguages();
        Dictionary<string, string> GetContent(string lang);
    }
}