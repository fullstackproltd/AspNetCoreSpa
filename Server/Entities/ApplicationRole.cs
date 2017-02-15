using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AspNetCoreSpa.Server.Entities
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationRole : IdentityRole<int>
    {
        [StringLength(250)]
        public string Description { get; set; }
        
    }
}
