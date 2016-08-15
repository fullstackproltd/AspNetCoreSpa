using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
