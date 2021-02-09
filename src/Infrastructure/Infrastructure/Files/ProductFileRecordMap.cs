using AspNetCoreSpa.Application.Features.Products.Queries.GetProductsFile;
using CsvHelper.Configuration;

namespace AspNetCoreSpa.Infrastructure.Files
{
    public sealed class ProductFileRecordMap : ClassMap<ProductRecordDto>
    {
        public ProductFileRecordMap()
        {
            Map(m => m.UnitPrice).Name("Unit Price").Convert(c => (c.UnitPrice ?? 0).ToString("C"));
        }
    }
}
