// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

using System;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class HomeController : ControllerBase
    {
        private readonly IApplicationDataService _applicationDataService;

        public HomeController(IApplicationDataService applicationDataService)
        {
            _applicationDataService = applicationDataService;
        }

        [HttpPost("api/setlanguage")]
        public IActionResult SetLanguage(string culture)
        {
            Response.Cookies.Append(CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)), new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
            );

            return LocalRedirect("~/");
        }

        [HttpGet("api/applicationdata")]
        public IActionResult Get()
        {
            var appData = _applicationDataService.GetApplicationData(Request.HttpContext, Startup.Configuration["StsAuthority"]);

            return Ok(appData);
        }
    }
}
