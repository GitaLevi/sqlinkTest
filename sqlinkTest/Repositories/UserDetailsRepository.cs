using Microsoft.EntityFrameworkCore;
using sqlinkTest.Data;
using sqlinkTest.Models;
using sqlinkTest.Repositories.Interfaces;

namespace sqlinkTest.Repositories
{
    public class UserDetailsRepository : IUserDetailsRepository
    {
        private readonly ApiContext _context;

        public UserDetailsRepository(ApiContext context)
        {
            _context = context;
        }
        public async Task<List<ProjectModel>> GetProjectsByUserId(int id)
        {
            return await _context.Projects
                              .Where(p => p.UserId == id)
                              .ToListAsync();
        }

        public async Task<PersonalDetailsModel> Login(LoginModel model)
        {
            return await _context.Users.FirstOrDefaultAsync(p => p.Email == model.Email && p.Password == model.Password);
        }
    }
}
