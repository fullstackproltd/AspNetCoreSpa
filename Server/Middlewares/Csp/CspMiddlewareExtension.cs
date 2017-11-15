using System;
using Microsoft.AspNetCore.Builder;

namespace AspNetCoreSpa.Server.Middlewares.Csp
{
    public static class CspMiddlewareExtensions
    {
        public static IApplicationBuilder UseCsp(this IApplicationBuilder app, Action<CspOptionsBuilder> builder)
        {
            var newBuilder = new CspOptionsBuilder();
            builder(newBuilder);

            var options = newBuilder.Build();
            return app.UseMiddleware<CspMiddleware>(options);
        }
    }
}
