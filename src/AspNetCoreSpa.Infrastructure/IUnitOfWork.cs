
namespace AspNetCoreSpa.Infrastructure
{
    public interface IUnitOfWork
    {
        ICustomerRepository Customers { get; }
        IProductRepository Products { get; }
        IOrdersRepository Orders { get; }
        int SaveChanges();
    }
}
