using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.ViewModels.AccountViewModels
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
