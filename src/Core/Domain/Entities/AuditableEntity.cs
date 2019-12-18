using System;

namespace AspNetCoreSpa.Domain.Entities
{
    public class AuditableEntity : IAuditableEntity
    {
        public Guid UserId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
