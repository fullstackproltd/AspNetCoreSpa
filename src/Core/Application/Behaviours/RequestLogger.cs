using System.Threading;
using System.Threading.Tasks;
using AspNetCoreSpa.Application.Abstractions;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;

namespace AspNetCoreSpa.Application.Behaviours
{
    public class RequestLogger<TRequest> : IRequestPreProcessor<TRequest>
    {
        private readonly ILogger _logger;
        private readonly ICurrentUserService _currentUserService;

        public RequestLogger(ILogger<TRequest> logger, ICurrentUserService currentUserService)
        {
            _logger = logger;
            _currentUserService = currentUserService;
        }

        public Task Process(TRequest request, CancellationToken cancellationToken)
        {
            var name = typeof(TRequest).Name;

            _logger.LogInformation("Northwind Request: {Name} {@UserId} {@Request}", 
                name, _currentUserService.UserId, request);

            return Task.CompletedTask;
        }
    }
}
