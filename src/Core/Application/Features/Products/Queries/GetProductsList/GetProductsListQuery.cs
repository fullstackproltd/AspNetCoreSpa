using MediatR;

namespace AspNetCoreSpa.Application.Features.Products.Queries.GetProductsList
{
    public class GetProductsListQuery : IRequest<ProductsListVm>
    {
    }
}
