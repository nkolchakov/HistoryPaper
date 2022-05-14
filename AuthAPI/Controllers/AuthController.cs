using AuthAPI.CustomExceptions;
using AuthAPI.DTO;
using AuthAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;
        public AuthController(IAuthService authService)
        {
            this.authService = authService ?? throw new ArgumentNullException(nameof(authService));
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerData)
        {
            try
            {
                UserDto registeredUser = await this.authService.RegisterUser(registerData);
                return Ok(registeredUser);

            }
            catch (UsernameExistsException ex)
            {
                return Ok(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest("something went wrong");
            }

        }

        [HttpPost("signin")]
        public IActionResult Login([FromBody] LoginUserDto loginData)
        {
            if (loginData?.Username == null || loginData?.Password == null)
            {
                return BadRequest();
            }
            try
            {
                UserDto? loggedInUser = this.authService.Login(loginData);
                if (loggedInUser != null)
                {
                    return Ok(loggedInUser);
                }

                return BadRequest("invalid password or username");
            }
            catch (Exception)
            {
                return BadRequest("something went wrong");
            }
        }
    }
}
