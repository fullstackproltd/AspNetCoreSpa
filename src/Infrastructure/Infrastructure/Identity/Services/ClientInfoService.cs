using System.Linq;
using AspNetCoreSpa.Infrastructure.Identity.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace AspNetCoreSpa.Infrastructure.Identity.Services
{
    public class ClientInfoService : IClientInfoService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;

        public ClientInfoService(IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
        }
        public ClientInfo GetClient()
        {
            const string ReturnUrl = "returnUrl";
            const string ClientId = "client_id";
            const string CallbackClientId = "/connect/authorize/callback?client_id";

            var query = _httpContextAccessor.HttpContext.Request.Query;

            if (query.ContainsKey(ReturnUrl))
            {
                var returnUrl = query[ReturnUrl];
                var parsedQuery = Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(returnUrl);

                var clientId = parsedQuery.FirstOrDefault(q => q.Key == ClientId || q.Key == CallbackClientId);

                if (!string.IsNullOrEmpty(clientId.Value))
                {
                    var clientInfo = new ClientInfo {ClientId = clientId.Value};

                    _configuration.Bind($"IdentityServer:Clients:{clientId.Value}", clientInfo);

                    return clientInfo;
                }
            }

            return new ClientInfo();
        }

    }
}
