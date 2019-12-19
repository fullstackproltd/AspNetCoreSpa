using System.Collections.Generic;
using System.Linq;
using IdentityServer4;
using IdentityServer4.Models;

namespace AspNetCoreSpa.STS.Models
{
    public class ConsentViewModel : ConsentInputModel
    {
        public ConsentViewModel(ConsentInputModel model, string returnUrl, AuthorizationRequest request, Client client, IdentityServer4.Models.Resources resources)
        {
            RememberConsent = model?.RememberConsent ?? true;
            ScopesConsented = model?.ScopesConsented ?? Enumerable.Empty<string>();

            ReturnUrl = returnUrl;

            ClientName = client.ClientName;
            ClientUrl = client.ClientUri;
            ClientLogoUrl = client.LogoUri;
            AllowRememberConsent = client.AllowRememberConsent;

            IdentityScopes = resources.IdentityResources.Select(x => new ScopeViewModel(x, ScopesConsented.Contains(x.Name) || model == null)).ToArray();
            ResourceScopes = resources.ApiResources.SelectMany(x=>x.Scopes).Select(x => new ScopeViewModel(x, ScopesConsented.Contains(x.Name) || model == null)).ToArray();
            if (resources.OfflineAccess)
            {
                ResourceScopes = ResourceScopes.Union(new ScopeViewModel[] {
                    ScopeViewModel.GetOfflineAccess(ScopesConsented.Contains(IdentityServerConstants.StandardScopes.OfflineAccess) || model == null)
                });
            }
        }

        public string ClientName { get; set; }
        public string ClientUrl { get; set; }
        public string ClientLogoUrl { get; set; }
        public bool AllowRememberConsent { get; set; }

        public IEnumerable<ScopeViewModel> IdentityScopes { get; set; }
        public IEnumerable<ScopeViewModel> ResourceScopes { get; set; }
    }

    public class ScopeViewModel
    {
        public static ScopeViewModel GetOfflineAccess(bool check)
        {
            return new ScopeViewModel
            {
                Name = IdentityServerConstants.StandardScopes.OfflineAccess,
                DisplayName = "Offline Access",
                Description = "Access to your applications and resources, even when you are offline",
                Emphasize = true,
                Checked = check
            };
        }

        private ScopeViewModel()
        {
        }

        public ScopeViewModel(IdentityResource identity, bool check)
        {
            Name = identity.Name;
            DisplayName = identity.DisplayName;
            Description = identity.Description;
            Emphasize = identity.Emphasize;
            Required = identity.Required;
            Checked = check || identity.Required;
        }

        public ScopeViewModel(Scope scope, bool check)
        {
            Name = scope.Name;
            DisplayName = scope.DisplayName;
            Description = scope.Description;
            Emphasize = scope.Emphasize;
            Required = scope.Required;
            Checked = check || scope.Required;
        }

        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public bool Emphasize { get; set; }
        public bool Required { get; set; }
        public bool Checked { get; set; }
    }
}
