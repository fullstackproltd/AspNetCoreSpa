using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AspNetCoreSpa.Server.Services
{
    public interface IApplicationDataService
    {
        Task<object> GetApplicationData(HttpContext context);
    }
}