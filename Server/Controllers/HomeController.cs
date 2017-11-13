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

namespace AspNetCoreSpa.Server.Controllers
{
    public class HomeController : Controller
    {
        private readonly IContentService _contentService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHostingEnvironment _env;

        public HomeController(
            IContentService contentService,
            UserManager<ApplicationUser> userManager,
             IHostingEnvironment env
             )
        {
            _contentService = contentService;
            _userManager = userManager;
            _env = env;
        }

        public async Task<IActionResult> Index()
        {
            if (ConfirmEmailRequest())
            {
                await ConfirmEmail();
            }

            var requestCulture = HttpContext.Features.Get<IRequestCultureFeature>();
            // Culture contains the information of the requested culture
            var culture = requestCulture.RequestCulture.Culture;
            ViewBag.languages = _contentService.GetLanguages();
            ViewBag.content = _contentService.GetContent(culture.Name);
            return View();
        }

        private bool ConfirmEmailRequest()
        {
            return Request.Query.ContainsKey("emailConfirmCode") && Request.Query.ContainsKey("userId");
        }

        private async Task ConfirmEmail()
        {
            var userId = Request.Query["userId"].ToString();
            var code = Request.Query["emailConfirmCode"].ToString();
            code = code.Replace(" ", "+");

            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && !user.EmailConfirmed)
            {
                var valid = await _userManager.ConfirmEmailAsync(user, code);
                if (valid.Succeeded)
                {
                    ViewBag.emailConfirmed = true;
                }
            }
        }

    }
}
