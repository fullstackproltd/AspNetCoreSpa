using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Server
{
    public static class HttpRequestExtensions
    {
        public static async Task<RenderToStringResult> BuildPrerender(this HttpRequest Request)
        {
            var nodeServices = Request.HttpContext.RequestServices.GetRequiredService<INodeServices>();
            var hostEnv = Request.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>();

            var applicationBasePath = hostEnv.ContentRootPath;
            var requestFeature = Request.HttpContext.Features.Get<IHttpRequestFeature>();
            var unencodedPathAndQuery = requestFeature.RawTarget;
            var unencodedAbsoluteUrl = $"{Request.Scheme}://{Request.Host}{unencodedPathAndQuery}";

            // Custom data

            //Prerender now needs CancellationToken
            System.Threading.CancellationTokenSource cancelSource = new System.Threading.CancellationTokenSource();
            System.Threading.CancellationToken cancelToken = cancelSource.Token;

            // Prerender / Serialize application (with Universal)
            return await Prerenderer.RenderToString(
                      "/",
                      nodeServices,
                      cancelToken,
                      new JavaScriptModuleExport(applicationBasePath + "/ClientApp/dist-server/main.bundle"),
                      unencodedAbsoluteUrl,
                      unencodedPathAndQuery,
                      new
                      {
                          AppData = $"This is server side data {DateTime.Now.ToString()}"
                      }, // Our simplified Request object & any other CustommData you want to send!
                      30000,
                      Request.PathBase.ToString()
                  );
        }
    }
}
