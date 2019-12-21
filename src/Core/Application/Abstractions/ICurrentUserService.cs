using System;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface ICurrentUserService
    {
        Guid UserId { get; }

        bool IsAuthenticated { get; }
    }
}
