using AspNetCoreSpa.Application.Models;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface IApplicationService
    {
        ApplicationDataViewModel GetApplicationData();
    }
}