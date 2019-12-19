using System.Threading.Tasks;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Application.Settings;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace AspNetCoreSpa.Infrastructure.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly IOptions<EmailSettings> _optionsEmailSettings;

        public EmailService(IOptions<EmailSettings> optionsEmailSettings)
        {
            _optionsEmailSettings = optionsEmailSettings;
        }

        public async Task SendEmail(string email, string subject, string message, string toUsername)
        {
            // TODO
            var client = new SendGridClient(_optionsEmailSettings.Value.SmtpHost);
            var msg = new SendGridMessage();
            msg.SetFrom(new EmailAddress(_optionsEmailSettings.Value.SmtpSenderAddress, "damienbod"));
            msg.AddTo(new EmailAddress(email, toUsername));
            msg.SetSubject(subject);
            msg.AddContent(MimeType.Text, message);
            //msg.AddContent(MimeType.Html, message);

            msg.SetReplyTo(new EmailAddress(_optionsEmailSettings.Value.SmtpSenderAddress, "damienbod"));
            
            var response = await client.SendEmailAsync(msg);
        }
    }
}
