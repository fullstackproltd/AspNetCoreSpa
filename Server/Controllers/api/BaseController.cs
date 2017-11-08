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
        private const string host = "http%3A%2F%2Flocalhost%3A5000%2Flogin";
        // private const string host = "http%3A%2F%2Faspnetcorespa.azurewebsite.net%2Flogin";
        public string AUTHORIZE_URL = $"~/connect/authorize?client_id=aspnetcorespa&response_type=id_token%20token&redirect_uri={host}&scope=openid%20email%20roles%20profile&nonce=test";
        public BaseController()
        {
        }
        public IActionResult Render(ExternalLoginStatus status)
        {
            return RedirectToAction("Index", "Home", new { externalLoginStatus = (int)status });
        }
    }


}
