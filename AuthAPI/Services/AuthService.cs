using AuthAPI.Data;
using AuthAPI.Models;
using AuthAPI.DTO;
using AuthAPI.CustomExceptions;
using Microsoft.IdentityModel.Tokens;

namespace AuthAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserDbContext dbContext;
        private readonly IUtilsAuth authUtils;
        private readonly IConfiguration configuration;

        public AuthService(UserDbContext dbContext, IUtilsAuth authUtils, IConfiguration configuration)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.authUtils = authUtils ?? throw new ArgumentNullException(nameof(authUtils));
            this.configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }


        public async Task<Token?> Login(LoginUserDto loginData)
        {
            var user = dbContext.Users.Where(u => u.Username == loginData.Username).FirstOrDefault();
            if (user != null)
            {
                bool passwordMatch = this.authUtils.HashPassword(loginData.Password, user.Salt) == user.Password;
                if (passwordMatch)
                {
                    var userDto = UserDto.FromModel(user);
                    string token = this.authUtils.GenerateToken(userDto);

                    string refreshToken = this.authUtils.GenerateRefreshToken();
                    _ = int.TryParse(this.configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

                    user.RefreshToken = refreshToken;
                    user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenValidityInDays);

                    dbContext.Users.Update(user);
                    await dbContext.SaveChangesAsync();

                    return new Token()
                    {
                        AccessToken = token,
                        RefreshToken = refreshToken
                    };
                }
            }
            return null;
        }

        public async Task<UserDto> RegisterUser(RegisterUserDto registerUserDto)
        {
            // check if email exists
            var usernameExists = dbContext.Users
                .FirstOrDefault(u => u.Username == registerUserDto.Username) != null;
            if (usernameExists)
            {
                // user exists
                throw new UsernameExistsException(registerUserDto.Username);
            }

            // create salt
            var salt = this.authUtils.GenerateSalt();

            // hash password + salt
            var hashedPassword = this.authUtils.HashPassword(registerUserDto.Password, salt);

            var user = new User()
            {
                Name = registerUserDto.Name,
                Username = registerUserDto.Username,
                Password = hashedPassword,
                Salt = salt
            };

            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username
            };
        }

        public async Task<Token> GetTokenPair(Token token)
        {
            if (token == null)
            {
                // throw invalid token
            }
            // get the user from the access token
            var principal = this.authUtils.GetPrincipal(token.AccessToken);

            var user = dbContext.Users.FirstOrDefault(u => u.Username == principal.Identity.Name);

            // validate if the users refresh token is valid
            if (user == null ||
                (user.RefreshToken != token.RefreshToken) ||
                (user.RefreshTokenExpiryTime <= DateTime.Now))
            {
                // invalid token error
                throw new SecurityTokenException("invalid token");
            }


            string newAccessToken = authUtils.GenerateToken(UserDto.FromModel(user));
            string newRefresh = authUtils.GenerateRefreshToken();

            user.RefreshToken = newRefresh;
            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();

            // generate new pair and return it
            return new Token() { AccessToken = newAccessToken, RefreshToken = newRefresh };
        }
    }
}
