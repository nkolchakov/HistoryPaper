using AuthAPI.DTO;

namespace AuthAPI.Services
{
    public interface IAuthService
    {
        byte[] GenerateSalt();
        Task<UserDto> RegisterUser(RegisterUserDto registerData);
        UserDto? Login(LoginUserDto loginData);
    }
}
