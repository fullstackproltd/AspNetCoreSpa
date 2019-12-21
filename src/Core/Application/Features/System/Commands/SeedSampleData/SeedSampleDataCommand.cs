using MediatR;
using AspNetCoreSpa.Application.Common.Interfaces;
using AspNetCoreSpa.Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Application.System.Commands.SeedSampleData
{
    public class SeedSampleDataCommand : IRequest
    {
    }

    public class SeedSampleDataCommandHandler : IRequestHandler<SeedSampleDataCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly IUserManager _userManager;

        public SeedSampleDataCommandHandler(IApplicationDbContext context, IUserManager userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<Unit> Handle(SeedSampleDataCommand request, CancellationToken cancellationToken)
        {
            var seeder = new SampleDataSeeder(_context, _userManager);

            await seeder.SeedAllAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
