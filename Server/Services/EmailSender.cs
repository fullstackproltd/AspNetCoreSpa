using System;
using System.Threading.Tasks;
using AspNetCoreSpa.Server.Services.Abstract;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using MimeKit;

namespace AspNetCoreSpa.Server.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly ILogger _logger;

        public EmailSender(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<EmailSender>();
        }

        public async Task<bool> SendEmailAsync(MailType type, EmailModel emailModel, string extraData)
        {
            if (string.IsNullOrEmpty(emailModel.To))
            {
                throw new ArgumentException("To address must be provided");
            }
            switch (type)
            {
                case MailType.Register:
                    return await SendRegisterEmailAsync(new EmailModel { To = emailModel.To }, extraData);
                default:
                    throw new ArgumentOutOfRangeException(nameof(type), type, null);
            }
        }

        private async Task<bool> SendRegisterEmailAsync(EmailModel emailModel, string extraData)
        {
            emailModel.Subject = "Registration confirmation";
            emailModel.From = "admin@admin.com";
            emailModel.HtmlBody = extraData;
            emailModel.TextBody = extraData;

            SendEmailAsync(emailModel).Wait();

            return await Task.Run(() => true);
        }

        public Task SendEmailAsync(EmailModel model)
        {
            // Plug in your email service here to send an email.
            var myMessage = new SendGrid.SendGridMessage();
            myMessage.AddTo(model.To);
            myMessage.From = new System.Net.Mail.MailAddress(model.From, model.Subject);
            myMessage.Subject = model.Subject;
            myMessage.Text = model.TextBody;
            myMessage.Html = model.HtmlBody;

            var credentials = new System.Net.NetworkCredential(Startup.Configuration["Email:SendGrid:Username"], Startup.Configuration["Email:SendGrid:Password"]);
            // Create a Web transport for sending email.
            var transportWeb = new SendGrid.Web(credentials);
            // Send the email.
            if (transportWeb != null)
            {
                return transportWeb.DeliverAsync(myMessage);
            }
            else
            {
                return Task.FromResult(0);
            }
        }

        // Using https://github.com/jstedfast/MailKit
        public bool SendEmail(EmailModel model)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(model.Subject, model.From));
                message.To.Add(new MailboxAddress("", model.To));
                message.Subject = model.Subject;

                message.Body = new TextPart("plain")
                {

                    Text = model.HtmlBody
                };

                using (var client = new SmtpClient())
                {
                    // For demo-purposes, accept all SSL certificates (in case the server supports STARTTLS)
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                    client.Connect("smtp.gmail.com", 465, true);

                    // Note: since we don't have an OAuth2 token, disable
                    // the XOAUTH2 authentication mechanism.
                    client.AuthenticationMechanisms.Remove("XOAUTH2");

                    // Note: only needed if the SMTP server requires authentication
                    var user = Startup.Configuration["Email:SmtpLogin:Username"];
                    var pass = Startup.Configuration["Email:SmtpLogin:Password"];
                    client.Authenticate(user, pass);

                    client.Send(message);
                    client.Disconnect(true);
                    return true;
                }
            }
            catch (Exception ex)
            {
                // if AuthenticationMechanismTooWeak: 5.7.14 , solution is to allow less secure apps
                // https://support.google.com/accounts/answer/6010255
                _logger.LogError(1, ex, "Unable to send email to {0}", model.To);
                return false;
            }

        }

    }

}