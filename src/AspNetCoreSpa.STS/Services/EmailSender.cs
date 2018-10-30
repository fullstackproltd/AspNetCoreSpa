using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using AspNetCoreSpa.STS.Models;
using System.Threading.Tasks;

namespace AspNetCoreSpa.STS.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IOptions<EmailSettings> _optionsEmailSettings;

        public EmailSender(IOptions<EmailSettings> optionsEmailSettings)
        {
            _optionsEmailSettings = optionsEmailSettings;
        }

        public async Task SendEmail(string email, string subject, string message, string toUsername)
        {
            var client = new SendGridClient(_optionsEmailSettings.Value.SendGridApiKey);
            var msg = new SendGridMessage();
            msg.SetFrom(new EmailAddress(_optionsEmailSettings.Value.SenderEmailAddress, "damienbod"));
            msg.AddTo(new EmailAddress(email, toUsername));
            msg.SetSubject(subject);
            msg.AddContent(MimeType.Text, message);
            //msg.AddContent(MimeType.Html, message);

            msg.SetReplyTo(new EmailAddress(_optionsEmailSettings.Value.SenderEmailAddress, "damienbod"));
            
            var response = await client.SendEmailAsync(msg);
        }
    }
}
