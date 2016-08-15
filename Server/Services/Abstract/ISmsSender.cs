using System.Threading.Tasks;

namespace AspNetCoreSpa.Server.Services.Abstract
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
