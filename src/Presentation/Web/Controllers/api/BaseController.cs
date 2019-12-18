using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Filters;

namespace Web.Controllers.api
{
    [Authorize]
    [ApiController]
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [Route("api/[controller]")]
    [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
    public class BaseController : ControllerBase
    {
        public BaseController()
        {
        }
    }
}
