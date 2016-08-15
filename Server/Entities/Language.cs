using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class Language : IEntityBase
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(7)]
        public string Locale { get; set; }
        public string Description { get; set; }
        public ICollection<ContentText> ContentTexts { get; set; }
    }
}
