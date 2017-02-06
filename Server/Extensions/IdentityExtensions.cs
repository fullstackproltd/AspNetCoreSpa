using System;
using System.Security.Claims;

namespace AspNetCoreSpa.Server.Extensions
{
    public static class IdentityExtensions
    {
        public static int GetUserId(this ClaimsPrincipal principal)
        {
            if (principal == null)
                throw new ArgumentNullException(nameof(principal));

            var id = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return Convert.ToInt32(id);
        }
        public static int GetCompanyId(this ClaimsPrincipal principal)
        {
            var companyId = principal.FindFirst("CompanyId")?.Value;

            return Convert.ToInt32(companyId);
        }
    }
}
