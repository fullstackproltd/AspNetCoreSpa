using System;
using System.Collections.Generic;
using System.Linq;
using IdentityServer4;
using IdentityServer4.Models;

namespace AspNetCoreSpa.STS
{
    public class Config
    {
        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("spa-api", "SPA API")
            };
        }

        public static IEnumerable<Client> GetClients(string clientAddresses)
        {
            var origins = clientAddresses.Split(',', StringSplitOptions.RemoveEmptyEntries);
            var allowedRedirectUrls = new List<string>();

            origins.ToList().ForEach(address =>
            {
                allowedRedirectUrls.Add($"{address}/login-redirect.html");
                allowedRedirectUrls.Add($"{address}/assets/login-redirect.html");
                allowedRedirectUrls.Add($"{address}/silent-renew.html");
                allowedRedirectUrls.Add($"{address}/assets/silent-renew.html");
                allowedRedirectUrls.Add($"{address}"); // Logout redirect uri
            });

            return new List<Client>
            {
                new Client
                {
                    ClientId = "spa-client",
                    ClientName = "SPA-App",
                    AllowedGrantTypes = new [] { GrantType.Implicit, GrantType.ResourceOwnerPassword },
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,
                    RedirectUris =           allowedRedirectUrls,
                    PostLogoutRedirectUris = origins.Select(o => $"{o}?postLogout=true").ToList(),
                    AllowedCorsOrigins =     origins,
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        "spa-api"
                    },
                    AllowOfflineAccess = true,
                    
                    // For testing purpose you can reduce the token lifetime to see silent renew happening
                    // IdentityTokenLifetime=120,
                    // AccessTokenLifetime=120

                },
                new Client
                {
                    ClientId = "mvc",
                    ClientName = "MVC Client",
                    AllowedGrantTypes = GrantTypes.HybridAndClientCredentials,

                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    RedirectUris           = allowedRedirectUrls,
                    PostLogoutRedirectUris = origins.Select(o => $"{o}?postLogout=true").ToList(),

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.OfflineAccess
                    },
                    AllowOfflineAccess = true

                }
            };
        }

        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }
    }
}