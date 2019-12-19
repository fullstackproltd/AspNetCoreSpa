using Microsoft.AspNetCore.Http;

namespace AspNetCoreSpa.Infrastructure.Services.Application
{
    public interface IApplicationService
    {
        object GetApplicationData(HttpContext context, string stsAuthority);
    }
}