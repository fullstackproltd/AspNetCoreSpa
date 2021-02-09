using System.Collections.Generic;
using System.Globalization;
using System.IO;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Application.Features.Products.Queries.GetProductsFile;
using CsvHelper;

namespace AspNetCoreSpa.Infrastructure.Files
{
    public class CsvFileBuilder : ICsvFileBuilder
    {
        public byte[] BuildProductsFile(IEnumerable<ProductRecordDto> records)
        {
            using var memoryStream = new MemoryStream();
            using (var streamWriter = new StreamWriter(memoryStream))
            {
                using var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture);
                csvWriter.Context.RegisterClassMap<ProductFileRecordMap>();
                csvWriter.WriteRecords(records);
            }

            return memoryStream.ToArray();
        }
    }
}
