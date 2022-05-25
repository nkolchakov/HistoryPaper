using AuthAPI.CustomExceptions;
using AuthAPI.DTO;
using AuthAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

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
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginData)
        {
            if (loginData?.Username == null || loginData?.Password == null)
            {
                return BadRequest();
            }
            try
            {
                Token? token = await this.authService.Login(loginData);
                if (token == null)
                {
                    return Unauthorized();
                }
                return Ok(token);
            }
            catch (Exception)
            {
                return BadRequest("something went wrong");
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] Token token)
        {
            if (token == null)
            {
                return BadRequest(nameof(token));
            }

            try
            {
                Token tokenPair = await authService.GetTokenPair(token);
                return Ok(tokenPair);
            }
            catch (SecurityTokenException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return BadRequest("something went wrong");
            }

        }
    }
}
