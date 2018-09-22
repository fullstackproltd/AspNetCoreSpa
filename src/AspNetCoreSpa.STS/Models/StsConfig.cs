using System;

namespace AspNetCoreSpa.STS.Models
{
    public class StsConfig
    {
        public bool AllowLocalLogin { get; set; }
        public bool AllowRememberLogin { get; set; }
        public bool ShowLogoutPrompt { get; set; }
        public bool AutomaticRedirectAfterSignOut { get; set; }
        public bool EnableAccountLockout { get; set; }

        // if user uses windows auth, should we load the groups from windows
        public bool IncludeWindowsGroups { get; set; }
        public string ClientUrl { get; set; }
        // specify the Windows authentication scheme being used
        public readonly string WindowsAuthenticationSchemeName = Microsoft.AspNetCore.Server.IISIntegration.IISDefaults.AuthenticationScheme;
        public TimeSpan RememberMeLoginDuration = TimeSpan.FromDays(30);
    }
}
