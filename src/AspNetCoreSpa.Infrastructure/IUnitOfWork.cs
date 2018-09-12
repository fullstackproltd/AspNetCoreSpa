
namespace AspNetCoreSpa.Infrastructure
{
    public interface IUnitOfWork
    {
        ICustomerRepository Customers { get; }
        IProductRepository Products { get; }
        IProductCategoryRepository ProductCategories { get; }
        IOrdersRepository Orders { get; }
        int SaveChanges();
    }
}
