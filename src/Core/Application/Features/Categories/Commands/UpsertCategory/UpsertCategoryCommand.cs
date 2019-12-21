using System.Threading;
using System.Threading.Tasks;
using AspNetCoreSpa.Application.Abstractions;
using MediatR;
using AspNetCoreSpa.Domain.Entities;

namespace AspNetCoreSpa.Application.Categories.Commands.UpsertCategory
{
    public class UpsertCategoryCommand : IRequest<int>
    {
        public int? Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public byte[] Picture { get; set; }

        public class UpsertCategoryCommandHandler : IRequestHandler<UpsertCategoryCommand, int>
        {
            private readonly IApplicationDbContext _context;

            public UpsertCategoryCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(UpsertCategoryCommand request, CancellationToken cancellationToken)
            {
                Category entity;

                if (request.Id.HasValue)
                {
                    entity = await _context.Categories.FindAsync(request.Id.Value);
                }
                else
                {
                    entity = new Category();

                    _context.Categories.Add(entity);
                }

                entity.CategoryName = request.Name;
                entity.Description = request.Description;
                entity.Picture = request.Picture;

                await _context.SaveChangesAsync(cancellationToken);

                return entity.CategoryId;
            }
        }
    }
}
