using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Authorize]
    public class BaseController : Controller
    {
        public BaseController()
        {
        }
    }
}
