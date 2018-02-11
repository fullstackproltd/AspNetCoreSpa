// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AspNetCoreSpa.Server.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using AspNetCoreSpa.Server.Services;
using Microsoft.AspNetCore.Localization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using System;
using Microsoft.Extensions.Localization;
using AspNetCoreSpa.Server.ViewModels;
using System.Globalization;
using Microsoft.Extensions.Caching.Memory;
using System.Threading;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Builder;

namespace AspNetCoreSpa.Server.Controllers
{
    public class HomeController : Controller
    {
        private readonly IApplicationDataService _applicationDataService;
        private readonly UserManager<ApplicationUser> _userManager;

        public HomeController(UserManager<ApplicationUser> userManager, IApplicationDataService applicationDataService)
        {
            _userManager = userManager;
            _applicationDataService = applicationDataService;
        }

        [HttpPost]
        public IActionResult SetLanguage(string culture)
        {
            Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)), new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
            );

            return LocalRedirect("~/");
        }

        [HttpGet("api/applicationdata")]
        public async Task<IActionResult> Get()
        {
            var appData = await _applicationDataService.GetApplicationData(Request.HttpContext);

            return Ok(appData);
        }
    }
}
