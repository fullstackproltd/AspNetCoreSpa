using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace AspNetCoreSpa.Core
{
    public static class HostingEnvironmentExtensions
    {
        public static string[] GetTranslationFile(this IWebHostEnvironment hostingEnvironment)
        {
            return File.ReadAllLines(Path.Combine(hostingEnvironment.ContentRootPath, "translations.csv"));
        }

    }
}
