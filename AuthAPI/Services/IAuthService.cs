using AuthAPI.DTO;

namespace AuthAPI.Services
{
    public interface IAuthService
    {
        Task<UserDto> RegisterUser(RegisterUserDto registerData);
        Task<Token?> Login(LoginUserDto loginData);
        Task<Token> GetTokenPair(Token token);
    }
}
