
using AspNetCoreSpa.Infrastructure.Repositories.Interfaces;

namespace AspNetCoreSpa.Infrastructure.Services.Uow
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
