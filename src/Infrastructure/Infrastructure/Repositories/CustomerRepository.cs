using System;
using System.Collections.Generic;
using System.Linq;
using AspNetCoreSpa.Domain.Entities;
using AspNetCoreSpa.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreSpa.Infrastructure.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Customer> GetTopActiveCustomers(int count)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetAllCustomersData()
        {
            return _appContext.Customers
                .Include(c => c.Orders)
                    .ThenInclude(o => o.OrderDetails)
                    .ThenInclude(d => d.Product)
                .Include(c => c.Orders)
                .OrderBy(c => c.Name)
                .ToList();
        }



        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
