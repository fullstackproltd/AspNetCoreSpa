using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Application.Features.Notifications.Models;
using AspNetCoreSpa.Application.Settings;
using Microsoft.AspNetCore.Routing.Template;
using Microsoft.Extensions.Logging;

namespace AspNetCoreSpa.Infrastructure.Email
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;
        private readonly ILogger<EmailService> _logger;

        public EmailService(EmailSettings emailSettings, ILogger<EmailService> logger)
        {
            _emailSettings = emailSettings;
            _logger = logger;
        }

        public Task RegistrationEmail(string to, string link)
        {
            var registrationTemplate = GetBaseTemplate("RegistrationTemplate");
            
            registrationTemplate = registrationTemplate.Replace("@user@", to)
                .Replace("@link@", link);
            var emailMessage = new EmailMessage
            {
                To = to,
                Body = registrationTemplate,
                Subject = "Confirm your registration",
                From = _emailSettings.SmtpSenderAddress
            };
            SendAsync(emailMessage);
            return Task.CompletedTask;
        }

        public Task SendCustomerCreatedEmail(EmailMessage emailMessage)
        {
            return Task.CompletedTask;
        }

        private string GetBaseTemplate(string bodyTemplateName)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var baseTemplateStream = assembly.GetManifestResourceStream("AspNetCoreSpa.Infrastructure.Email.Templates.BaseTemplate.html");
            using var baseReader = new StreamReader(baseTemplateStream, Encoding.UTF8);
            var baseTemplate = baseReader.ReadToEnd();

            var bodyTemplateStream = assembly.GetManifestResourceStream($"AspNetCoreSpa.Infrastructure.Email.Templates.{bodyTemplateName}.html");
            using var bodyReader = new StreamReader(bodyTemplateStream, Encoding.UTF8);
            var bodyTemplate = bodyReader.ReadToEnd();

            var template = baseTemplate.Replace("@content@", bodyTemplate);

            return template;
        }

        private Task SendAsync(EmailMessage emailMessage)
        {
            try
            {
                var mailMessage = new MailMessage(_emailSettings.SmtpSenderAddress, emailMessage.To, emailMessage.Subject, emailMessage.Body)
                {
                    From = new MailAddress(_emailSettings.SmtpSenderAddress, _emailSettings.SmtpSenderName),
                    IsBodyHtml = true
                };

                foreach (var attachment in emailMessage.Attachments)
                {
                    mailMessage.Attachments.Add(
                        new Attachment(
                            new MemoryStream(attachment.Content),
                            attachment.Name,
                            attachment.ContentType
                        )
                    );
                }

                using var client = new SmtpClient(_emailSettings.SmtpHost, _emailSettings.SmtpPort)
                {
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(_emailSettings.SmtpUsername, _emailSettings.SmtpPassword)
                };

                client.Send(mailMessage);
                
                _logger.LogInformation($"Email sent successfully to: {emailMessage.To}. Subject: {emailMessage.Subject}");

                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Email failed to send to {emailMessage.To}", ex);
                throw;
            }
        }
    }
}
