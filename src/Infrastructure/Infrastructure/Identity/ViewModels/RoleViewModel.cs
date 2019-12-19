using System;

namespace AspNetCoreSpa.Infrastructure.Identity.ViewModels
{
    public class RoleViewModel
    {
        public string Url { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}