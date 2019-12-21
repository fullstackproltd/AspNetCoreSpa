using System.Collections.Generic;
using AspNetCoreSpa.Application.Products.Queries.GetProductsFile;

namespace AspNetCoreSpa.Application.Common.Interfaces
{
    public interface ICsvFileBuilder
    {
        byte[] BuildProductsFile(IEnumerable<ProductRecordDto> records);
    }
}
