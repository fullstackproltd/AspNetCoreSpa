namespace AspNetCoreSpa.Application.Settings
{
    public class ReCaptcha
    {
        public string Key { get; set; }
        public string Secret { get; set; }
        public string ApiVerificationUrl { get; set; }
        public string ResponseTokenKey { get; set; }
    }
}
