using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Application.Models
{
    public class ApplicationDataViewModel
    {
        public Dictionary<string, string> Content { get; set; }
        public object CookieConsent { get; set; }
        public IEnumerable<CulturesDisplayViewModel> Cultures { get; set; }
    }
}
