using System.Threading;
using System.Threading.Tasks;
using AspNetCoreSpa.Application.Abstractions;
using MediatR;

namespace AspNetCoreSpa.Application.Features.System.Commands.SeedWebData
{
    public class WebDataSeederCommand : IRequest
    {
    }

    public class SeedSampleDataCommandHandler : IRequestHandler<WebDataSeederCommand>
    {
        private readonly IApplicationDbContext _context;
        //private readonly IUserManager _userManager;

        public SeedSampleDataCommandHandler(IApplicationDbContext context)
        {
            _context = context;
            //_userManager = userManager;
        }

        public async Task<Unit> Handle(WebDataSeederCommand request, CancellationToken cancellationToken)
        {
            var seeder = new WebDataSeeder(_context);

            await seeder.SeedAllAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
