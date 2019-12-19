// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

using System;
using AspNetCoreSpa.Application.Abstractions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreSpa.Web.Controllers
{
    public class HomeController : ControllerBase
    {
        private readonly IApplicationService _applicationService;

        public HomeController(IApplicationService applicationService)
        {
            _applicationService = applicationService;
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
            var appData = _applicationService.GetApplicationData();

            return Ok(appData);
        }
    }
}
