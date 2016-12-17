using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        [HttpGet("doadminoperation")]
        public IActionResult DoAdminOperation()
        {
            return Ok(new { message = "Some secure data only accessible by admin" });
        }

    }
}
