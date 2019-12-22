using System.Collections.Generic;
using System.Threading.Tasks;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Application.Features.Notifications.Models;
using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace AspNetCoreSpa.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IConfiguration _configuration;

        public NotificationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendAsync(MessageDto message)
        {
            var apiKey = _configuration["EmailSettings:ApiKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("test1@example.com", "Example User 1");
            List<EmailAddress> tos = new List<EmailAddress>
          {
              new EmailAddress("test2@example.com", "Example User 2"),
              new EmailAddress("test3@example.com", "Example User 3"),
              new EmailAddress("test4@example.com","Example User 4")
          };

            var subject = "Hello world email from Sendgrid ";
            var htmlContent = "<strong>Hello world with HTML content</strong>";
            // var displayRecipients = false; // set this to true if you want recipients to see each others mail id 
            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, tos, subject, "", htmlContent, false);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
