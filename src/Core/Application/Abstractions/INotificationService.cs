using System.Threading.Tasks;
using AspNetCoreSpa.Application.Features.Notifications.Models;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface INotificationService
    {
        Task SendAsync(MessageDto message);
    }
}
