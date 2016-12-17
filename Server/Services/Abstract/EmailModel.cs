namespace AspNetCoreSpa.Server.Services.Abstract
{
    public class EmailModel
    {
        public string To { get; set; }
        public string From { get; set; } = Startup.Configuration["Email:From"];
        public string Subject { get; set; } = Startup.Configuration["Email:Subject"];
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