using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace STS.Models
{
    public class ApplicationRole : IdentityRole<Guid>
    {
        [StringLength(100)]
        public string Description { get; set; }
    }
}
