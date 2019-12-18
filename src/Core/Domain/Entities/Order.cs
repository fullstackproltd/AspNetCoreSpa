using System.Collections.Generic;

namespace AspNetCoreSpa.Domain.Entities
{
    public class Order : AuditableEntity
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }
        public int Id { get; set; }
        public decimal Discount { get; set; }
        public string Comments { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
