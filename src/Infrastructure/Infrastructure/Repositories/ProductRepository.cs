using AspNetCoreSpa.Domain.Entities;
using AspNetCoreSpa.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreSpa.Infrastructure.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(DbContext context) : base(context)
        { }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
