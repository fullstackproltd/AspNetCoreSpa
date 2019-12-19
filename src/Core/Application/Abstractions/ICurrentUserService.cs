using System;
using System.Collections.Generic;
using System.Text;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface ICurrentUserService
    {
        string UserId { get; }

        bool IsAuthenticated { get; }
    }
}
