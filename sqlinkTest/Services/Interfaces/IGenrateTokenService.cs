using sqlinkTest.Models;

namespace sqlinkTest.Repositories.Interfaces
{
    public interface IGenrateTokenService
    {
        Task<string> GenrateToken(PersonalDetailsModel user);
    }
}
