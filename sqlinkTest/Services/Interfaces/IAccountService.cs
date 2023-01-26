using sqlinkTest.Models;

namespace sqlinkTest.Repositories.Interfaces
{
    public interface IAccountService
    {
        Task<UserModel> Login(LoginModel user);
    }
}
