using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace AspNetCoreSpa.Application.Extensions
{
    public static class ClaimExtensions
    {
        public static string GetUserId(this ClaimsPrincipal principal)
        {
            var userId = principal.Identity.GetClaim(ClaimTypes.NameIdentifier);

            return userId;
        }
        public static string GetClaim(this IIdentity claimsIdentity, string claimType)
        {
            var claim = ((ClaimsIdentity)claimsIdentity).Claims.FirstOrDefault(x => x.Type == claimType)?.Value;
            return claim;
        }
    }
}
