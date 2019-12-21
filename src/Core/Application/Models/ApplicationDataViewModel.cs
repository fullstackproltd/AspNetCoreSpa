using System.Collections.Generic;

namespace AspNetCoreSpa.Application.Models
{
    public class ApplicationDataViewModel
    {
        public Dictionary<string, string> Content { get; set; }
        public object CookieConsent { get; set; }
        public IEnumerable<CulturesDisplayViewModel> Cultures { get; set; }
    }
}
