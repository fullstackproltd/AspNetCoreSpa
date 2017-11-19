using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.ViewModels.ManageViewModels
{
    public class UserInfoViewModel
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Phone]
        [Display(Name = "Phone number")]
        public string PhoneNumber { get; set; }
    }
}
