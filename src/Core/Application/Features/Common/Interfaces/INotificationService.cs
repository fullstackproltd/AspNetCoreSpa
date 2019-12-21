using AspNetCoreSpa.Application.Notifications.Models;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Application.Common.Interfaces
{
    public interface INotificationService
    {
        Task SendAsync(MessageDto message);
    }
}
