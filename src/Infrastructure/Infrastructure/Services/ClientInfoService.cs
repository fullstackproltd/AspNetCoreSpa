using System;
using System.Linq;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Application.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace AspNetCoreSpa.Infrastructure.Services
{
    public class ClientInfoService : IClientInfoService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IClientRequestParametersProvider _clientRequestParameters;
        public ClientInfoService(IHttpContextAccessor httpContextAccessor, IClientRequestParametersProvider clientRequestParameters)
        {
            _httpContextAccessor = httpContextAccessor;
            _clientRequestParameters = clientRequestParameters;
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
                    var clientParameters = _clientRequestParameters.GetClientParameters(_httpContextAccessor.HttpContext, clientId.Value);
                    clientParameters.TryGetValue("redirect_uri", out var clientRedirectUri);
                    var uri = new Uri(clientRedirectUri);
                    var clientUrl = uri.AbsoluteUri.Substring(0, uri.AbsoluteUri.IndexOf("authentication"));
                    var clientInfo = new ClientInfo { ClientId = clientId.Value, ClientUri = clientUrl };

                    return clientInfo;
                }
            }

            return new ClientInfo();
        }

    }
}
