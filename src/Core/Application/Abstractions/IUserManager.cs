using System;
using System.Threading.Tasks;
using AspNetCoreSpa.Application.Common.Models;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface IUserManager
    {
        Task<(Result Result, Guid UserId)> CreateUserAsync(string userName, string password);

        Task<Result> DeleteUserAsync(Guid userId);
    }
}
