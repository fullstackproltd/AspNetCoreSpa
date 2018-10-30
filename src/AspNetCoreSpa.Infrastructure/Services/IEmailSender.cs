using System.Threading.Tasks;

namespace AspNetCoreSpa.Infrastructure.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
