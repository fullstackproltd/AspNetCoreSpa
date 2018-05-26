using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.DAL.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUserPhoto : IEntityBase
    {

        [Key]
        public int Id { get; set; }
        public string ContentType { get; set; }
        public byte[] Content { get; set; }
        public int ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
