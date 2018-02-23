using System.Collections.Generic;
using System.Linq;
using AspNetCoreSpa.Server.Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace AspNetCoreSpa.Server
{
    public static class Helpers
    {
        public static string JsonSerialize(object obj)
        {
            return JsonConvert.SerializeObject(obj,
                        new JsonSerializerSettings
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                            StringEscapeHandling = StringEscapeHandling.EscapeHtml,
                            ContractResolver = new CamelCasePropertyNamesContractResolver()
                        });
        }

        public static IActionResult Render(this Controller ctrl, ExternalLoginStatus status = ExternalLoginStatus.Ok)
        {
            if (status == ExternalLoginStatus.Ok)
            {
                return ctrl.LocalRedirect("~/");
            }
            return ctrl.LocalRedirect($"~/?externalLoginStatus={(int)status}");
            // return RedirectToAction("Index", "Home", new { externalLoginStatus = (int)status });
        }
    }
}