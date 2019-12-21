using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using AspNetCoreSpa.Application.Common.Interfaces;
using AspNetCoreSpa.Common;
using System.Threading;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Application.Products.Queries.GetProductsFile
{
    public class GetProductsFileQueryHandler : IRequestHandler<GetProductsFileQuery, ProductsFileVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICsvFileBuilder _fileBuilder;
        private readonly IMapper _mapper;
        private readonly IDateTime _dateTime;

        public GetProductsFileQueryHandler(IApplicationDbContext context, ICsvFileBuilder fileBuilder, IMapper mapper, IDateTime dateTime)
        {
            _context = context;
            _fileBuilder = fileBuilder;
            _mapper = mapper;
            _dateTime = dateTime;
        }

        public async Task<ProductsFileVm> Handle(GetProductsFileQuery request, CancellationToken cancellationToken)
        {
            var records = await _context.Products
                .ProjectTo<ProductRecordDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var fileContent = _fileBuilder.BuildProductsFile(records);

            var vm = new ProductsFileVm
            {
                Content = fileContent,
                ContentType = "text/csv",
                FileName = $"{_dateTime.Now:yyyy-MM-dd}-Products.csv"
            };

            return vm;
        }
    }
}
