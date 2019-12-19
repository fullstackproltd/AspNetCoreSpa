using AspNetCoreSpa.Infrastructure.Identity.ViewModels;

namespace AspNetCoreSpa.Infrastructure.Identity.Services
{
    public interface IClientInfoService
    {
        ClientInfo GetClient();
    }
}
