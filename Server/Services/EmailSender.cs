using System;
using System.Threading.Tasks;
using AspNetCoreSpa.Server.Repositories.Abstract;
using AspNetCoreSpa.Server.Services.Abstract;

namespace AspNetCoreSpa.Server.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly ILoggingRepository _loggingRepository;

        public EmailSender(ILoggingRepository loggingRepository)
        {
            _loggingRepository = loggingRepository;
        }

        public async Task<bool> SendEmailAsync(MailType type, EmailModel emailModel, string extraData)
        {
            if (string.IsNullOrEmpty(emailModel.To))
            {
                throw new ArgumentException("From address must be provided");
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
            emailModel.HtmlBody = extraData;
            emailModel.TextBody = extraData;
            return await Task.Run(() => true);
            // return await SendEmailAsync(emailModel);
        }

        // private bool SendEmailAsync(EmailModel model)
        // {
        //     try
        //     {
        //         var email = new SendGridMessage
        //         {
        //             From = new MailAddress(model.From),
        //             Subject = model.Subject,
        //             To = new[] { new MailAddress(model.To) },
        //             Html = model.HtmlBody,
        //             Text = model.TextBody
        //         };

        //         // Create a Web transport, using API Key
        //         var transportWeb = new Web(Startup.Configuration["Sendgrid:api_key"]);

        //         // Send the email.
        //         await transportWeb.DeliverAsync(email);
        //         return true;
        //     }
        //     catch (Exception ex)
        //     {
        //         _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
        //         _loggingRepository.Commit();
        //         return false;
        //     }
        // }
    }

}