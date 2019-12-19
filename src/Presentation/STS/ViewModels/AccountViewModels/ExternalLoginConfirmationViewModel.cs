using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.STS.ViewModels.AccountViewModels
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
