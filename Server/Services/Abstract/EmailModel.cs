namespace AspNetCoreSpa.Server.Services.Abstract
{
    public class EmailModel
    {
        public string To { get; set; }
        public string From { get; set; } = Startup.Configuration["Sendgrid:emailconfig:from"];
        public string Subject { get; set; } = Startup.Configuration["Sendgrid:emailconfig:subject"];
        public string HtmlBody { get; set; }
        public string TextBody { get; set; }
    }

    public enum MailType
    {
        None,
        Register,
        SecurityCode,
        ForgetPassword
    }
}