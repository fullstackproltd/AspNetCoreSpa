using System;
using System.Collections.Generic;
using AspNetCoreSpa.Application.Enums;

namespace AspNetCoreSpa.Domain.Entities
{
    public class Customer : AuditableEntity
    {
        public Customer()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public Gender Gender { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
