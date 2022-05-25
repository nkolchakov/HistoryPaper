using AuthAPI.DTO;
using System.Security.Claims;

namespace AuthAPI.Services
{
    public interface IUtilsAuth
    {
        byte[] GenerateSalt();
        string GenerateToken(UserDto user);
        string HashPassword(string password, byte[] salt);
        string GenerateRefreshToken();

        ClaimsPrincipal GetPrincipal(string token);
    }
}
