using System.Threading.Tasks;

namespace AspNetCoreSpa.Server.Services.Abstract
{
    public interface IEmailSender
    {
        Task<bool> SendEmailAsync(MailType type, EmailModel emailModel, string extraData);
        bool SendEmail(EmailModel emailModel);
    }
}