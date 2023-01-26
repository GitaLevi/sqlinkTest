using sqlinkTest.Models;

namespace sqlinkTest.Repositories.Interfaces
{
    public interface IUserDetailsRepository
    {
        Task<PersonalDetailsModel> Login(LoginModel model);
        Task<List<ProjectModel>> GetProjectsByUserId(int id);
    }
}
