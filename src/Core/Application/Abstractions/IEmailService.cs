using System.Threading.Tasks;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface IEmailService
    {
        Task SendEmail(string email, string subject, string message, string toUsername);
    }
}
