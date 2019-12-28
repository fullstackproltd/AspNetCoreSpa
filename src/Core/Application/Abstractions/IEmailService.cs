using System.Threading.Tasks;
using AspNetCoreSpa.Application.Features.Notifications.Models;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface IEmailService
    {
        Task RegistrationConfirmationEmail(string to, string link);
        Task ForgottentPasswordEmail(string to, string link);
        Task SendCustomerCreatedEmail(EmailMessage emailMessage);
    }
}
