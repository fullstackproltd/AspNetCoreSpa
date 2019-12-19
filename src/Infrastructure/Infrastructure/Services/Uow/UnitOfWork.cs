using AspNetCoreSpa.Infrastructure.Repositories;
using AspNetCoreSpa.Infrastructure.Repositories.Interfaces;

namespace AspNetCoreSpa.Infrastructure.Services.Uow
{

    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;

        ICustomerRepository _customers;
        IProductCategoryRepository _productsCategories;
        IProductRepository _products;
        IOrdersRepository _orders;



        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }



        public ICustomerRepository Customers
        {
            get { return _customers ??= new CustomerRepository(_context); }
        }



        public IProductRepository Products
        {
            get { return _products ??= new ProductRepository(_context); }
        }

        public IProductCategoryRepository ProductCategories
        {
            get { return _productsCategories ??= new ProductCategoryRepository(_context); }
        }



        public IOrdersRepository Orders
        {
            get { return _orders ??= new OrdersRepository(_context); }
        }




        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}
