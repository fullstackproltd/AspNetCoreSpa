using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Infrastructure.Identity.ViewModels
{
    public class ConfirmEmailModel
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public string Token { get; set; }
    }
}