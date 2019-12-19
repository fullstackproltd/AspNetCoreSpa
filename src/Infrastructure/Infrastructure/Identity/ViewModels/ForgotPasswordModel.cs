using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Infrastructure.Identity.ViewModels
{
    public class ForgottenPasswordModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}