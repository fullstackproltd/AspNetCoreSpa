using System.Collections.Generic;

namespace AspNetCoreSpa.Domain.Entities
{
    public class ProductCategory : AuditableEntity
    {
        public ProductCategory()
        {
            Products = new HashSet<Product>();
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
