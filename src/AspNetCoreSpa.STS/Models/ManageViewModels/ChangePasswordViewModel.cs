using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.STS.Models
{
    public class ChangePasswordViewModel
    {
        [Required(ErrorMessage = "CURRENT_PASSWORD_REQUIRED")]
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "NEW_PASSWORD_REQUIRED")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "CONFIRM_PASSWORD_NOT_MATCHING")]
        public string ConfirmPassword { get; set; }

        public string StatusMessage { get; set; }
    }
}
