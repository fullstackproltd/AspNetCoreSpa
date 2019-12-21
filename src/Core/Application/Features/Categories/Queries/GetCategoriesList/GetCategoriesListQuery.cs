using MediatR;

namespace AspNetCoreSpa.Application.Features.Categories.Queries.GetCategoriesList
{
    public class GetCategoriesListQuery : IRequest<CategoriesListVm>
    {
    }
}
