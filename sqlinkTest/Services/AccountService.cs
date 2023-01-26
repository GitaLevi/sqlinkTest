using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using sqlinkTest.Models;
using sqlinkTest.Repositories.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace sqlinkTest.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUserDetailsRepository _userDetailsRepository;
        private readonly IGenrateTokenService _genrateTokenService;

        public AccountService(IUserDetailsRepository userDetailsRepository,

            IGenrateTokenService genrateTokenService)
        {
            _userDetailsRepository = userDetailsRepository;
            _genrateTokenService = genrateTokenService;
        }
        public async Task<UserModel> Login(LoginModel user)
        {
            var userDetails = await _userDetailsRepository.Login(user);
            var token = String.Empty;
            if (userDetails != null)
            {
                token = await _genrateTokenService.GenrateToken(userDetails);
            }

            return new UserModel
            {
                Token = token,
                PersonalDetails = userDetails
            };
        }
    }
}
