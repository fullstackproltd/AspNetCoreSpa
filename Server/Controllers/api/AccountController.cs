using System.Linq;
using System.Threading.Tasks;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.Extensions;
using AspNetCoreSpa.Server.Services.Abstract;
using AspNetCoreSpa.Server.ViewModels.AccountViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ISmsSender _smsSender;
        private readonly ILogger _logger;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            ISmsSender smsSender,
            ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _smsSender = smsSender;
            _logger = loggerFactory.CreateLogger<AccountController>();
        }


        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, set lockoutOnFailure: true
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                var roles = await _userManager.GetRolesAsync(user);
                _logger.LogInformation(1, "User logged in.");
                return AppUtils.SignIn(user, roles);
            }
            if (result.RequiresTwoFactor)
            {
                return RedirectToAction(nameof(SendCode), new { RememberMe = model.RememberMe });
            }
            if (result.IsLockedOut)
            {
                _logger.LogWarning(2, "User account locked out.");
                return BadRequest("Lockout");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                return BadRequest(ModelState.GetModelErrors());
            }

        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model, string returnUrl = null)
        {
            var currentUser = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.Firstname,
                LastName = model.Lastname
            };
            
            var result = await _userManager.CreateAsync(currentUser, model.Password);
            if (result.Succeeded)
            {
                // Add to roles
                var roleAddResult = await _userManager.AddToRoleAsync(currentUser, "User");
                if (roleAddResult.Succeeded)
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(currentUser);

                    var host = Request.Scheme + "://" + Request.Host;
                    var callbackUrl = host + "?userId=" + currentUser.Id + "&emailConfirmCode=" + code;
                    var confirmationLink = "<a class='btn-primary' href=\"" + callbackUrl + "\">Confirm email address</a>";
                    _logger.LogInformation(3, "User created a new account with password.");
                    //await _emailSender.SendEmailAsync(MailType.Register, new EmailModel { To = model.Email }, confirmationLink);
                    return Json(new { });
                }
            }
            AddErrors(result);
            // If we got this far, something failed, redisplay form
            return BadRequest(ModelState.GetModelErrors());
        }

        [HttpPost("logout")]
        public async Task<IActionResult> LogOff()
        {
            await _signInManager.SignOutAsync();
            _logger.LogInformation(4, "User logged out.");
            return Ok();
        }

        [HttpGet("ExternalLogin")]
        [AllowAnonymous]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            // Request a redirect to the external login provider.
            var redirectUrl = Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl });
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return Challenge(properties, provider);
        }

        [HttpGet("ExternalLoginCallback")]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                return Render(ExternalLoginStatus.Error);
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return Render(ExternalLoginStatus.Invalid);
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
            if (result.Succeeded)
            {
                _logger.LogInformation(5, "User logged in with {Name} provider.", info.LoginProvider);
                return Render(ExternalLoginStatus.Ok); // Everything Ok, login user
            }
            if (result.RequiresTwoFactor)
            {
                return Render(ExternalLoginStatus.TwoFactor);
            }
            if (result.IsLockedOut)
            {
                return Render(ExternalLoginStatus.Lockout);
            }
            else
            {
                // If the user does not have an account, then ask the user to create an account.
                // ViewData["ReturnUrl"] = returnUrl;
                // ViewData["LoginProvider"] = info.LoginProvider;
                // var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                // return RedirectToAction("Index", "Home", new ExternalLoginCreateAccountViewModel { Email = email });
                return Render(ExternalLoginStatus.CreateAccount);
            }
        }

        [HttpPost("ExternalLoginCreateAccount")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ExternalLoginCreateAccount([FromBody]ExternalLoginConfirmationViewModel model, string returnUrl = null)
        {
            // Get the information about the user from the external login provider
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                return BadRequest("External login information cannot be accessed, try again.");
            }
            var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
            var result = await _userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                result = await _userManager.AddLoginAsync(user, info);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    _logger.LogInformation(6, "User created an account using {Name} provider.", info.LoginProvider);
                    return Ok(); // Everything ok
                }
            }
            return BadRequest(new[] { "Email already exists" });
        }
        [HttpGet("ConfirmEmail")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return View("Error");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        [HttpGet("ForgotPassword")]
        [AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost("ForgotPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordViewModel model)
        {
            var currentUser = await _userManager.FindByNameAsync(model.Email);
            if (currentUser == null || !(await _userManager.IsEmailConfirmedAsync(currentUser)))
            {
                // Don't reveal that the user does not exist or is not confirmed
                return View("ForgotPasswordConfirmation");
            }
            // For more information on how to enable account confirmation and password reset please visit https://go.microsoft.com/fwlink/?LinkID=532713
            // Send an email with this link
            var code = await _userManager.GeneratePasswordResetTokenAsync(currentUser);

            var host = Request.Scheme + "://" + Request.Host;
            var callbackUrl = host + "?userId=" + currentUser.Id + "&passwordResetCode=" + code;
            var confirmationLink = "<a class='btn-primary' href=\"" + callbackUrl + "\">Reset your password</a>";
            await _emailSender.SendEmailAsync(MailType.ForgetPassword, new EmailModel { To = model.Email }, confirmationLink);
            return Json(new { });
        }

        [HttpPost("resetpassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);

            if (user == null)
            {
                // Don't reveal that the user does not exist
                return Ok("Reset confirmed");
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return Ok("Reset confirmed"); ;
            }
            AddErrors(result);
            return BadRequest(ModelState.GetModelErrors());
        }

        [HttpGet("SendCode")]
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl = null, bool rememberMe = false)
        {
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                return BadRequest("Error");
            }
            var userFactors = await _userManager.GetValidTwoFactorProvidersAsync(user);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        [HttpPost("SendCode")]
        [AllowAnonymous]
        public async Task<IActionResult> SendCode([FromBody]SendCodeViewModel model)
        {
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                return BadRequest("Error");
            }

            // Generate the token and send it
            var code = await _userManager.GenerateTwoFactorTokenAsync(user, model.SelectedProvider);
            if (string.IsNullOrWhiteSpace(code))
            {
                return BadRequest("Error");
            }

            var message = "Your security code is: " + code;
            if (model.SelectedProvider == "Email")
            {
                await _emailSender.SendEmailAsync(MailType.SecurityCode, new EmailModel { }, null);
                //await _emailSender.SendEmailAsync(Email, await _userManager.GetEmailAsync(user), "Security Code", message);
            }
            else if (model.SelectedProvider == "Phone")
            {
                await _smsSender.SendSmsTwillioAsync(await _userManager.GetPhoneNumberAsync(user), message);
            }

            return RedirectToAction(nameof(VerifyCode), new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }

        [HttpGet("VerifyCode")]
        [AllowAnonymous]
        public async Task<IActionResult> VerifyCode(string provider, bool rememberMe, string returnUrl = null)
        {
            // Require that the user has already logged in via username/password or external login
            var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                return BadRequest("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        [HttpPost("VerifyCode")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            // The following code protects for brute force attacks against the two factor codes.
            // If a user enters incorrect codes for a specified amount of time then the user account
            // will be locked out for a specified amount of time.
            var result = await _signInManager.TwoFactorSignInAsync(model.Provider, model.Code, model.RememberMe, model.RememberBrowser);
            if (result.Succeeded)
            {
                return RedirectToLocal(model.ReturnUrl);
            }
            if (result.IsLockedOut)
            {
                _logger.LogWarning(7, "User account locked out.");
                return View("Lockout");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid code.");
                return View(model);
            }
        }

        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private Task<ApplicationUser> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(HttpContext.User);
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }

        private IActionResult Render(ExternalLoginStatus status)
        {
            return RedirectToAction("Index", "Home", new { externalLoginStatus = (int)status });
        }


        #endregion
    }
}
