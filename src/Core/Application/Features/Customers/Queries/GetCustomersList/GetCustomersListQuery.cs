using MediatR;

namespace AspNetCoreSpa.Application.Features.Customers.Queries.GetCustomersList
{
    public class GetCustomersListQuery : IRequest<CustomersListVm>
    {
    }
}
