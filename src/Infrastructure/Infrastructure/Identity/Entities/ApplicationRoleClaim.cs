using System;
using Microsoft.AspNetCore.Identity;

namespace AspNetCoreSpa.Infrastructure.Identity.Entities
{
    public class ApplicationRoleClaim : IdentityRoleClaim<Guid>
    {
        public virtual ApplicationRole Role { get; set; }
    }
}