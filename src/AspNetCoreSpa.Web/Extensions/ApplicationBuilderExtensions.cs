using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NetEscapades.AspNetCore.SecurityHeaders;
using NetEscapades.AspNetCore.SecurityHeaders.Infrastructure;
using System;

namespace AspNetCoreSpa.Web.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        // https://github.com/andrewlock/NetEscapades.AspNetCore.SecurityHeaders
        public static IApplicationBuilder AddCustomSecurityHeaders(this IApplicationBuilder app)
        {
            var env = app.ApplicationServices.GetRequiredService<IWebHostEnvironment>();

            var policyCollection = new HeaderPolicyCollection()
                   .AddFrameOptionsDeny()
                   .AddXssProtectionBlock()
                   .AddContentTypeOptionsNoSniff()
                   .AddStrictTransportSecurityMaxAge(maxAgeInSeconds: 60 * 60 * 24 * 365) // maxage = one year in seconds
                   .AddReferrerPolicyOriginWhenCrossOrigin()
                   .RemoveServerHeader()
                   .AddContentSecurityPolicy(builder =>
                    {
                        if (env.IsProduction())
                        {
                            builder.AddUpgradeInsecureRequests(); // upgrade-insecure-requests
                        }

                        // builder.AddReportUri() // report-uri: https://report-uri.com
                        //     .To("https://report-uri.com");

                        builder.AddDefaultSrc()
                            .Self();

                        // Allow AJAX, WebSocket and EventSource connections to:
                        var socketUrl = Startup.Configuration["HostUrl"].ToString().Replace("http://", "ws://", StringComparison.OrdinalIgnoreCase).Replace("https://", "wss://", StringComparison.OrdinalIgnoreCase);
                        var stsUrl = Startup.Configuration["StsAuthority"];


                        builder.AddConnectSrc()
                            .Self()
                            .From(stsUrl)
                            .From(socketUrl);

                        builder.AddFontSrc() // font-src 'self'
                            .Self()
                            .Data();

                        builder.AddObjectSrc() // object-src 'none'
                            .None();

                        builder.AddFormAction() // form-action 'self'
                            .Self();

                        builder.AddImgSrc() // img-src https:
                            .Self()
                            .Data();

                        // builder.AddScriptSrc() // script-src 'self'
                        //     .Self();

                        // builder.AddStyleSrc() // style-src 'self'
                        //     .Self();

                        builder.AddUpgradeInsecureRequests(); // upgrade-insecure-requests
                        builder.AddCustomDirective("script-src", "'self' 'unsafe-inline' 'unsafe-eval'");
                        builder.AddCustomDirective("style-src", "'self' 'unsafe-inline' 'unsafe-eval'");

                        builder.AddMediaSrc()
                            .Self();

                        // frame-ancestors 'none'
                        builder.AddFrameAncestors()
                            .None();

                        builder.AddFrameSource()
                            .From(stsUrl);

                        // You can also add arbitrary extra directives: plugin-types application/x-shockwave-flash"
                        // builder.AddCustomDirective("plugin-types", "application/x-shockwave-flash");

                    });

            app.UseSecurityHeaders(policyCollection);
            return app;
        }
        public static IApplicationBuilder UseCustomSwaggerApi(this IApplicationBuilder app)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint
            app.UseSwagger();
            // Enable middleware to serve swagger-ui assets (HTML, JS, CSS etc.)
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "V1 Docs");
            });

            return app;
        }
        public static IApplicationBuilder AddDevMiddlewares(this IApplicationBuilder app)
        {
            app.UseDeveloperExceptionPage();
            // NOTE: For SPA swagger needs adding before MVC
            app.UseCustomSwaggerApi();

            return app;
        }

        public static IApplicationBuilder AddCustomLocalization(this IApplicationBuilder app)
        {
            var options = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(options.Value);

            return app;
        }
    }
}
