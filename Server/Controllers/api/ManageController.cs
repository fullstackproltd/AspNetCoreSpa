using System.Linq;
using System.Threading.Tasks;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.ViewModels.ManageViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AspNetCoreSpa.Server.Services;
using AspNetCoreSpa.Server.Filters;
using Microsoft.AspNetCore.Http;
using System.IO;
using System;
using AspNetCoreSpa.Server.Extensions;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Route("api/[controller]")]
    public class ManageController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;

        public ManageController(
        ApplicationDbContext context,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IEmailSender emailSender,
        ISmsSender smsSender,
        ILoggerFactory loggerFactory)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _logger = loggerFactory.CreateLogger<ManageController>();
        }

        [HttpGet("")]
        public async Task<IActionResult> Index(ManageMessageId? message = null)
        {
            ViewData["StatusMessage"] =
                message == ManageMessageId.ChangePasswordSuccess ? "Your password has been changed."
                : message == ManageMessageId.SetPasswordSuccess ? "Your password has been set."
                : message == ManageMessageId.SetTwoFactorSuccess ? "Your two-factor authentication provider has been set."
                : message == ManageMessageId.Error ? "An error has occurred."
                // : message == ManageMessageId.AddPhoneSuccess ? "Your phone number was added."
                // : message == ManageMessageId.RemovePhoneSuccess ? "Your phone number was removed."
                : "";

            var user = await GetCurrentUserAsync();
            var model = new IndexViewModel
            {
                HasPassword = await _userManager.HasPasswordAsync(user),
                // PhoneNumber = await _userManager.GetPhoneNumberAsync(user),
                TwoFactor = await _userManager.GetTwoFactorEnabledAsync(user),
                BrowserRemembered = await _signInManager.IsTwoFactorClientRememberedAsync(user)
            };
            return Ok(model);
        }

        [HttpGet("getlogins")]
        public async Task<IActionResult> GetLogins()
        {
            var user = await GetCurrentUserAsync();
            return Ok(await _userManager.GetLoginsAsync(user));
        }

        [HttpPost("removelogin")]
        public async Task<IActionResult> RemoveLogin([FromBody]RemoveLoginViewModel account)
        {
            var user = await GetCurrentUserAsync();
            var result = await _userManager.RemoveLoginAsync(user, account.LoginProvider, account.ProviderKey);
            if (result.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(new ApiError("Login cannot be removed"));
        }

        // [HttpPost("addphonenumber")]
        // public async Task<IActionResult> AddPhoneNumber(AddPhoneNumberViewModel model)
        // {
        //     // Generate the token and send it
        //     var user = await GetCurrentUserAsync();
        //     var code = await _userManager.GenerateChangePhoneNumberTokenAsync(user, model.PhoneNumber);
        //     await _smsSender.SendSmsAsync(model.PhoneNumber, "Your security code is: " + code);
        //     return NoContent();
        // }

        [HttpPost("enabletwofactorauthentication")]
        public async Task<IActionResult> EnableTwoFactorAuthentication()
        {
            var user = await GetCurrentUserAsync();
            if (user != null)
            {
                await _userManager.SetTwoFactorEnabledAsync(user, true);
                _logger.LogInformation(1, "User enabled two-factor authentication.");
            }
            return NoContent();
        }

        [HttpPost("disabletwofactorauthentication")]
        public async Task<IActionResult> DisableTwoFactorAuthentication()
        {
            var user = await GetCurrentUserAsync();
            await _userManager.SetTwoFactorEnabledAsync(user, false);
            _logger.LogInformation(2, "User disabled two-factor authentication.");
            return NoContent();
        }

        // [HttpGet("verifyphonenumber")]
        // public async Task<IActionResult> VerifyPhoneNumber(string phoneNumber)
        // {
        //     var code = await _userManager.GenerateChangePhoneNumberTokenAsync(await GetCurrentUserAsync(), phoneNumber);
        //     // Send an SMS to verify the phone number
        //     if (string.IsNullOrEmpty(phoneNumber))
        //     {
        //         return BadRequest(new ApiError("Unable to verify phone number"));
        //     }
        //     return NoContent();
        // }

        // [HttpPost("verifyphonenumber")]
        // public async Task<IActionResult> VerifyPhoneNumber(VerifyPhoneNumberViewModel model)
        // {
        //     var user = await GetCurrentUserAsync();
        //     var result = await _userManager.ChangePhoneNumberAsync(user, model.PhoneNumber, model.Code);
        //     if (result.Succeeded)
        //     {
        //         return NoContent();
        //     }
        //     // If we got this far, something failed, redisplay the form
        //     return BadRequest(new ApiError("Failed to verify phone number"));
        // }

        // [HttpPost("removephonenumber")]
        // public async Task<IActionResult> RemovePhoneNumber()
        // {
        //     var user = await GetCurrentUserAsync();
        //     var result = await _userManager.SetPhoneNumberAsync(user, null);
        //     if (result.Succeeded)
        //     {
        //         return NoContent();
        //     }
        //     return BadRequest(new ApiError("Failed to remove phone number"));
        // }

        [HttpGet("managelogins")]
        public async Task<IActionResult> ManageLogins(ManageMessageId? message = null)
        {
            ViewData["StatusMessage"] =
                message == ManageMessageId.RemoveLoginSuccess ? "The external login was removed."
                : message == ManageMessageId.AddLoginSuccess ? "The external login was added."
                : message == ManageMessageId.Error ? "An error has occurred."
                : "";
            var user = await GetCurrentUserAsync();
            if (user == null)
            {
                return View("Error");
            }
            var userLogins = await _userManager.GetLoginsAsync(user);
            var schemes = await _signInManager.GetExternalAuthenticationSchemesAsync();
            var otherLogins = schemes.Where(auth => userLogins.All(ul => auth.Name != ul.LoginProvider)).ToList();
            ViewData["ShowRemoveButton"] = user.PasswordHash != null || userLogins.Count > 1;
            return View(new ManageLoginsViewModel
            {
                CurrentLogins = userLogins,
                OtherLogins = otherLogins
            });
        }

        [HttpPost("linklogin")]
        public IActionResult LinkLogin(string provider)
        {
            // Request a redirect to the external login provider to link a login for the current user
            var redirectUrl = Url.Action("LinkLoginCallback", "Manage");
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl, _userManager.GetUserId(User));
            return Challenge(properties, provider);
        }

        [HttpGet("linklogincallback")]
        public async Task<ActionResult> LinkLoginCallback()
        {
            var user = await GetCurrentUserAsync();
            var info = await _signInManager.GetExternalLoginInfoAsync(await _userManager.GetUserIdAsync(user));
            if (info == null)
            {
                return BadRequest(new ApiError("Unable to find linked login info"));
            }
            var result = await _userManager.AddLoginAsync(user, info);
            if (result.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(new ApiError("Unable to link login"));

        }

        [HttpGet("userinfo")]
        public async Task<IActionResult> UserInfo()
        {
            var user = await GetCurrentUserAsync();

            return Ok(new { FirstName = user.FirstName, LastName = user.LastName, PhoneNumber = user.PhoneNumber });
        }

        [HttpPost("userinfo")]
        public async Task<IActionResult> UserInfo([FromBody]UserInfoViewModel model)
        {

            var user = await GetCurrentUserAsync();

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.PhoneNumber = model.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);
            if (result == IdentityResult.Success)
            {
                return Ok(new { FirstName = model.FirstName, LastName = model.LastName, PhoneNumber = model.PhoneNumber });
            }

            return BadRequest(new ApiError("Unable to update user info"));
        }
        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordViewModel model)
        {
            var user = await GetCurrentUserAsync();
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (result.Succeeded)
            {
                _logger.LogInformation(3, "User changed their password successfully.");
                return NoContent();
            }
            return BadRequest(new ApiError("Unable to change password"));
        }

        [HttpPost("setpassword")]
        public async Task<IActionResult> SetPassword([FromBody]SetPasswordViewModel model)
        {

            var user = await GetCurrentUserAsync();
            var result = await _userManager.AddPasswordAsync(user, model.NewPassword);
            if (result.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(new ApiError("Unable to set password"));
        }

        [HttpGet("photo")]
        public IActionResult UserPhoto()
        {

            var profileImage = _context.ApplicationUserPhotos.Include(i => i.ApplicationUser).FirstOrDefault(i => i.ApplicationUser.Id == User.GetUserId());

            if (profileImage == null)
            {
                return NotFound();
            }

            return Ok(Convert.ToBase64String(profileImage.Content));
        }

        [HttpPost("photo")]
        public async Task<IActionResult> UserPhoto(IFormFile file)
        {
            {
                if (string.IsNullOrEmpty(file?.ContentType) || (file.Length == 0)) return BadRequest(new ApiError("Image provided is invalid"));

                var size = file.Length;

                if (size > Convert.ToInt64(Startup.Configuration["MaxImageUploadSize"])) return BadRequest(new ApiError("Image size greater than allowed size"));

                using (var memoryStream = new MemoryStream())
                {
                    var existingImage = _context.ApplicationUserPhotos.FirstOrDefault(i => i.ApplicationUserId == User.GetUserId());

                    await file.CopyToAsync(memoryStream);

                    if (existingImage == null)
                    {
                        var userImage = new ApplicationUserPhoto
                        {
                            ContentType = file.ContentType,
                            Content = memoryStream.ToArray(),
                            ApplicationUserId = User.GetUserId()
                        };
                        _context.ApplicationUserPhotos.Add(userImage);
                    }
                    else
                    {
                        existingImage.ContentType = file.ContentType;
                        existingImage.Content = memoryStream.ToArray();
                        _context.ApplicationUserPhotos.Update(existingImage);
                    }
                    await _context.SaveChangesAsync();
                }

                return NoContent();
            }
        }

        #region Helpers

        public enum ManageMessageId
        {
            // AddPhoneSuccess,
            AddLoginSuccess,
            ChangePasswordSuccess,
            SetTwoFactorSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
            // RemovePhoneSuccess,
            Error
        }

        private Task<ApplicationUser> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(HttpContext.User);
        }

        #endregion
    }
}
