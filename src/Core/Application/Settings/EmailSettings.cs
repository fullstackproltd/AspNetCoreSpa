namespace AspNetCoreSpa.Application.Settings
{
    public class EmailSettings
    {
        public int SmtpPort { get; set; }
        public string SmtpHost { get; set; }
        public string SmtpUsername { get; set; }
        public string SmtpPassword { get; set; }
        public string SmtpSenderName { get; set; }
        public string SmtpSenderAddress { get; set; }
    }
}
