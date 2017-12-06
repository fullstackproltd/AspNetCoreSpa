using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Authorize]
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public class BaseController : Controller
    {
        public BaseController()
        {

        }

        [HttpPost]
        public IActionResult Render(ExternalLoginStatus status)
        {
            return RedirectToAction("Index", "Home", new { externalLoginStatus = (int)status });
        }
    }
}