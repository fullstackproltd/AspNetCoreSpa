using System;
using System.Security.Claims;
using AspNetCoreSpa.Application.Abstractions;
using Microsoft.AspNetCore.Http;

namespace AspNetCoreSpa.Infrastructure.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            Guid.TryParse(httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier), out var userId);
            UserId = userId;
            IsAuthenticated = UserId != null;
        }

        public Guid UserId { get; }

        public bool IsAuthenticated { get; }
    }

}
