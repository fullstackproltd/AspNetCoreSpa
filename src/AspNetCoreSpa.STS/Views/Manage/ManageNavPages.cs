﻿using System;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace AspNetCoreSpa.STS.Views.Manage
{
    public static class ManageNavPages
    {
        public static string ActivePageKey => "ActivePage";

        public static string Index => "Index";

        public static string ChangePassword => "ChangePassword";

        public static string ExternalLogins => "ExternalLogins";

        public static string TwoFactorAuthentication => "TwoFactorAuthentication";

        public static string PersonalData => "PersonalData";

        public static string DownloadPersonalData => "DownloadPersonalData";

        public static string DeletePersonalData => "DeletePersonalData";

        public static string IndexNavClass(ViewContext viewContext) => PageNavClass(viewContext, Index);

        public static string ChangePasswordNavClass(ViewContext viewContext) => PageNavClass(viewContext, ChangePassword);

        public static string ExternalLoginsNavClass(ViewContext viewContext) => PageNavClass(viewContext, ExternalLogins);

        public static string TwoFactorAuthenticationNavClass(ViewContext viewContext) => PageNavClass(viewContext, TwoFactorAuthentication);

        public static string PersonalDataNavClass(ViewContext viewContext) => PageNavClass(viewContext, PersonalData);

        public static string DownloadPersonalDataNavClass(ViewContext viewContext) => PageNavClass(viewContext, DownloadPersonalData);

        public static string DeletePersonalDataNavClass(ViewContext viewContext) => PageNavClass(viewContext, DeletePersonalData);

        public static string PageNavClass(ViewContext viewContext, string page)
        {
            var activePage = viewContext.ViewData["ActivePage"] as string;
            return string.Equals(activePage, page, StringComparison.OrdinalIgnoreCase) ? "active" : null;
        }

        public static void AddActivePage(this ViewDataDictionary viewData, string activePage) => viewData[ActivePageKey] = activePage;
    }
}
