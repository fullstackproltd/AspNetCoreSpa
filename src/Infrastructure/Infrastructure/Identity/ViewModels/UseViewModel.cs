using System;
using System.Collections.Generic;

namespace AspNetCoreSpa.Infrastructure.Identity.ViewModels
{
    public class UseViewModel
    {
        public string Url { get; set; }
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public int AgencyNumber { get; set; }
        public DateTime RegistrationDate { get; set; }
        public IList<string> Roles { get; set; }
        public IList<System.Security.Claims.Claim> Claims { get; set; }

    }
}