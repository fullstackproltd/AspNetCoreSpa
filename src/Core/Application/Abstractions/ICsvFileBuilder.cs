using System.Collections.Generic;
using AspNetCoreSpa.Application.Features.Products.Queries.GetProductsFile;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface ICsvFileBuilder
    {
        byte[] BuildProductsFile(IEnumerable<ProductRecordDto> records);
    }
}
