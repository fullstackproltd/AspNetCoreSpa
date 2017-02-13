using System;
using System.Net;
using System.Threading.Tasks;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.Extensions;
using AspNetCoreSpa.Server.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Route("api/[controller]")]
    public class ProfileController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger _logger;

        public ProfileController(ILoggerFactory loggerFactory, UserManager<ApplicationUser> userManager)
        {
            _logger = loggerFactory.CreateLogger<ProfileController>();
            _userManager = userManager;
        }

        [HttpGet("username")]
        public async Task<IActionResult> MeGet()
        {
            try
            {

                var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
                if (user != null)
                {
                    return Ok(new { FirstName = user.FirstName, LastName = user.LastName });
                }
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(ModelState.GetModelErrors());
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Unable to get profile of user");
                return BadRequest();
            }

        }

        [HttpPost("username")]
        public async Task<IActionResult> MePost([FromBody]UserNameViewModel model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
                if (user != null)
                {
                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    var result = await _userManager.UpdateAsync(user);
                    if (result == IdentityResult.Success)
                    {
                        return Ok(new { FirstName = model.FirstName, LastName = model.LastName });
                    }
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json("Unable to update user");
                }
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(ModelState.GetModelErrors());
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Unable to save user name");

                return BadRequest();
            }

        }
        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordVm model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(HttpContext.User.Identity.Name);
                if (user != null)
                {
                    var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                    if (result == IdentityResult.Success)
                    {
                        return Ok(new { });
                    }
                }
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new[] { "Unable to change password" });
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Unable to change password");
                return BadRequest();
            }

        }
    }

}
