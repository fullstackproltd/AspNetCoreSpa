using AspNetCoreSpa.Application.Common.Models;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Application.Common.Interfaces
{
    public interface IUserManager
    {
        Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

        Task<Result> DeleteUserAsync(string userId);
    }
}
