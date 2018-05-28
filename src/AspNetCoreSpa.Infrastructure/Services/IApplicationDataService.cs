using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AspNetCoreSpa.Infrastructure.Services
{
    public interface IApplicationDataService
    {
        Task<object> GetApplicationData(HttpContext context);
    }
}