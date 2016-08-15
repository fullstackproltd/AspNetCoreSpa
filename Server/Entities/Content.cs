using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class Content : IEntityBase
    {
        public int Id { get; set; }
        [Required]
        public string Key { get; set; }

        public ICollection<ContentText> ContentTexts { get; set; }
    }

    public class ContentText
    {
        public int Id { get; set; }
        [Required]
        public string Text { get; set; }
        public virtual Content Content { get; set; }
        public virtual Language Language { get; set; }
        public int ContentId { get; set; }
        public int LanguageId { get; set; }

    }

}

