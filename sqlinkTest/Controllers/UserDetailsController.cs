using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using sqlinkTest.Models;
using sqlinkTest.Repositories.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace sqlinkTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailsController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IUserDetailsRepository _userDetailsRepository;

        public UserDetailsController(IAccountService accountService,

            IUserDetailsRepository userDetailsRepository)
        {
            _accountService = accountService;
            _userDetailsRepository = userDetailsRepository;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectsByUserId(int id)
        {
            return Ok(await _userDetailsRepository.GetProjectsByUserId(id));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> LoginUser(LoginModel model)
        {
            return Ok(await _accountService.Login(model));

        }
    }
}
