using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using AspNetCoreSpa.Server.Services.Abstract;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AspNetCoreSpa.Server.Services
{
    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link https://go.microsoft.com/fwlink/?LinkID=532713
    public class SmsSender : ISmsSender
    {
        private readonly ILogger _logger;
        private readonly SmsSettings _smsSettings;

        public SmsSender(IOptions<SmsSettings> smsSettings, ILoggerFactory loggerFactory)
        {
            _smsSettings = smsSettings.Value;
            _logger = loggerFactory.CreateLogger<SmsSender>();

        }

        public async Task<bool> SendSmsTwillioAsync(string number, string message)
        {
            try
            {
                // https://www.elanderson.net/2016/03/sms-using-twilio-rest-api-in-asp-net-core/
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                    Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_smsSettings.Sid}:{_smsSettings.Token}")));

                    var content = new FormUrlEncodedContent(new[]
                    {
                        // Either +44ukmobile OR ukmobile (07456432132)
                        new KeyValuePair<string, string>("To",$"{number}"),
                        new KeyValuePair<string, string>("From", _smsSettings.From),
                        new KeyValuePair<string, string>("Body", message)
                    });

                    var response = await client.PostAsync(_smsSettings.RequestUrl, content).ConfigureAwait(false);
                    return response.IsSuccessStatusCode;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Unable to send sms to {0}", number);

                return false;
            }
        }

        public async Task<bool> SendSmsFastSmsAsync(string number, string message)
        {
            try
            {
                var token = Startup.Configuration["SmsSettingsFastSms:Token"];
                var baseUri = Startup.Configuration["SmsSettingsFastSms:BaseUri"];

                using (var client = new HttpClient { BaseAddress = new Uri(baseUri) })
                {
                    var requestUri = $"?DestinationAddress={number}&Body={message}&Token={token}&Action=Send&ShowErrorMessage=1";
                    var response = await client.GetAsync(requestUri).ConfigureAwait(false);

                    return response.IsSuccessStatusCode;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(1, ex, "Unable to send fastsms to {0}", number);
                return false;
            }
        }
    }
}
