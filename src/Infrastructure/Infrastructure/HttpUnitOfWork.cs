using AspNet.Security.OpenIdConnect.Primitives;
using AspNetCoreSpa.Infrastructure.Services.Uow;
using Microsoft.AspNetCore.Http;

namespace AspNetCoreSpa.Infrastructure
{
    public class HttpUnitOfWork : UnitOfWork
    {
        public HttpUnitOfWork(ApplicationDbContext context, IHttpContextAccessor httpAccessor) : base(context)
        {
            context.CurrentUserId = httpAccessor.HttpContext.User.FindFirst(OpenIdConnectConstants.Claims.Subject)?.Value?.Trim();
        }
    }
}
