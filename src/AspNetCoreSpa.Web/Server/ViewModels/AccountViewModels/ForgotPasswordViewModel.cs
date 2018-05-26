using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Web.Server.ViewModels.AccountViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
