using System.Collections.Generic;
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
                new ApiResource("aspnetcorespa-api", "AspNetCoreSpa API")
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "spa-client",
                    ClientName = "AspNetCoreSpa",
                    AllowedGrantTypes = new [] { GrantType.Implicit, GrantType.ResourceOwnerPassword },
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,

                    RedirectUris =           { "https://localhost:5001/oidc-login-redirect.html","https://localhost:5001/silent-redirect.html" },
                    PostLogoutRedirectUris = { "https://localhost:5001/?postLogout=true" },
                    AllowedCorsOrigins =     { "https://localhost:5001/" },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        "aspnetcorespa-api"
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

                    RedirectUris           = { "https://localhost:4201/signin-oidc" },
                    PostLogoutRedirectUris = { "https://localhost:4201/signout-callback-oidc" },

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