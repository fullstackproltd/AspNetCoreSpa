using AspNetCoreSpa.Application.Features.Products.Queries.GetProductsFile;
using CsvHelper.Configuration;

namespace AspNetCoreSpa.Infrastructure.Files
{
    public sealed class ProductFileRecordMap : ClassMap<ProductRecordDto>
    {
        public ProductFileRecordMap()
        {
            AutoMap();
            Map(m => m.UnitPrice).Name("Unit Price").ConvertUsing(c => (c.UnitPrice ?? 0).ToString("C"));
        }
    }
}
