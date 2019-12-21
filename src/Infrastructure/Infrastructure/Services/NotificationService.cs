using System.Threading.Tasks;
using AspNetCoreSpa.Application.Abstractions;
using AspNetCoreSpa.Application.Features.Notifications.Models;

namespace AspNetCoreSpa.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        public Task SendAsync(MessageDto message)
        {
            return Task.CompletedTask;
        }
    }
}
