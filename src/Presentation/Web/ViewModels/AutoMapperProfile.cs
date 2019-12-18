using AspNetCoreSpa.Domain.Entities;
using AutoMapper;

namespace Web.ViewModels
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Customer, CustomerViewModel>()
                .ReverseMap();

            CreateMap<Product, ProductViewModel>()
                .ReverseMap();

            CreateMap<ProductCategory, ProductCategoryViewModel>()
                .ReverseMap();

            CreateMap<Order, OrderViewModel>()
                .ReverseMap();
        }
    }
}
