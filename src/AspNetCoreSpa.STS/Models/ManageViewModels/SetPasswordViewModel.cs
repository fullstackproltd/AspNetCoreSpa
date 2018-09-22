using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.STS.Models
{
    public class SetPasswordViewModel
    {
        [Required(ErrorMessage = "PASSWORD_REQUIRED")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "CONFIRM_PASSWORD_NOT_MATCHING")]
        public string ConfirmPassword { get; set; }

        public string StatusMessage { get; set; }
    }
}
