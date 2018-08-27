using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace AspNetCoreSpa.STS
{
    public class ApplicationRole : IdentityRole<Guid>
    {
        [StringLength(100)]
        public string Description { get; set; }
    }
}
