using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services
{
    public interface IApplicationDataService
    {
        object GetApplicationData(HttpContext context, string stsAuthority);
    }
}