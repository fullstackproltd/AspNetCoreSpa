using System.Collections.Generic;
using AspNetCoreSpa.Domain.Entities;

namespace AspNetCoreSpa.Infrastructure.Repositories.Interfaces
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        IEnumerable<Customer> GetTopActiveCustomers(int count);
        IEnumerable<Customer> GetAllCustomersData();
    }
}
