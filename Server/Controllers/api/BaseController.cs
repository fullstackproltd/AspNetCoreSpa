using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
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
        public IActionResult Render(ExternalLoginStatus status = ExternalLoginStatus.Ok)
        {
            if (status != ExternalLoginStatus.Ok)
            {
                return LocalRedirect("~/");
            }
            return LocalRedirect($"~/?externalLoginStatus={(int)status}");
            // return RedirectToAction("Index", "Home", new { externalLoginStatus = (int)status });
        }
    }


}
