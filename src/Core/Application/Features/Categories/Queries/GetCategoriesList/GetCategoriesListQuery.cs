using MediatR;

namespace AspNetCoreSpa.Application.Categories.Queries.GetCategoriesList
{
    public class GetCategoriesListQuery : IRequest<CategoriesListVm>
    {
    }
}
