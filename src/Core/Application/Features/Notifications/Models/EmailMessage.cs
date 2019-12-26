using System.Collections.Generic;

namespace AspNetCoreSpa.Application.Features.Notifications.Models
{
    public class EmailMessage
    {
        public string From { get; set; }
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public List<EmailAttachement> Attachments { get; set; } = new List<EmailAttachement>();
    }
}