using AspNetCoreSpa.Application.Models;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface IClientInfoService
    {
        ClientInfo GetClient();
    }
}
