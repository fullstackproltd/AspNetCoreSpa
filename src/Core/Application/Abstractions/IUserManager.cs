using System.Threading.Tasks;
using AspNetCoreSpa.Application.Common.Models;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface IUserManager
    {
        Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

        Task<Result> DeleteUserAsync(string userId);
    }
}
