using System.Threading.Tasks;
using AspNetCoreSpa.Application.Notifications.Models;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface INotificationService
    {
        Task SendAsync(MessageDto message);
    }
}
