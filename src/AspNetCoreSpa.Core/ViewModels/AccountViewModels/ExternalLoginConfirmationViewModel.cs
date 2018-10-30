using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Core.ViewModels
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
