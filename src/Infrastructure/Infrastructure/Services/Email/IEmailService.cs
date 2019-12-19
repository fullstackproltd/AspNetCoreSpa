using System.Threading.Tasks;

namespace AspNetCoreSpa.Infrastructure.Services.Email
{
    public interface IEmailService
    {
        Task SendEmail(string email, string subject, string message, string toUsername);
    }
}
