using MediatR;

namespace AspNetCoreSpa.Application.Features.Customers.Queries.GetCustomerDetail
{
    public class GetCustomerDetailQuery : IRequest<CustomerDetailVm>
    {
        public string Id { get; set; }
    }
}
