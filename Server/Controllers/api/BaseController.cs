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
        public string IMPLICIT_AUTHORISATION_URL;
        public BaseController()
        {
            var host = Startup._hostingEnv.IsDevelopment() ? "http%3A%2F%2Flocalhost%3A5000" : "http%3A%2F%2Faspnetcorespa.azurewebsites.net";
            IMPLICIT_AUTHORISATION_URL = $"~/connect/authorize?client_id=aspnetcorespa&response_type=id_token%20token&redirect_uri={host}&scope=openid%20email%20roles%20profile&nonce=test";
        }
        public IActionResult Render(ExternalLoginStatus status)
        {
            return RedirectToAction("Index", "Home", new { externalLoginStatus = (int)status });
        }
    }


}
