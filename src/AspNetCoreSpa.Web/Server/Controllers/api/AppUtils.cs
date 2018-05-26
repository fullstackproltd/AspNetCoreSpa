using System.Collections.Generic;
using AspNetCoreSpa.DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreSpa.Web.Server.Controllers.api
{
    public class AppUtils
    {
        internal static IActionResult SignIn(ApplicationUser user, IList<string> roles)
        {
            var userResult = new { User = new { DisplayName = user.UserName, Roles = roles } };
            return new ObjectResult(userResult);
        }

    }
}