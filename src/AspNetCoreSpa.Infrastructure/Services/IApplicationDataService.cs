using Microsoft.AspNetCore.Http;

namespace AspNetCoreSpa.Infrastructure.Services
{
    public interface IApplicationDataService
    {
        object GetApplicationData(HttpContext context, string stsAuthority);
    }
}