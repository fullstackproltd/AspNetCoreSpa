using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Infrastructure.Identity.ViewModels
{
    public class CreateUserModel : BaseUserModel
    {

        [Required]
        [Display(Name = "Agency Number (please use your L & G agency number)")]
        public int AgencyNumber { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}