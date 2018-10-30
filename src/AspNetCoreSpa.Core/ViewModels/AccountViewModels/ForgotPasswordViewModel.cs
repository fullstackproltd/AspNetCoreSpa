using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Core.ViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
