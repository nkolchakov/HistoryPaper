using AuthAPI.Data;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using AuthAPI.Models;
using AuthAPI.DTO;
using AuthAPI.CustomExceptions;

namespace AuthAPI.Services
{
    public class AuthService : IAuthService
    {
        private const int bytesCount = 16;
        private readonly UserDbContext dbContext;

        public AuthService(UserDbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }
        public byte[] GenerateSalt()
        {
            var salt = RandomNumberGenerator.GetBytes(bytesCount);
            return salt;
        }

        public string HashPassword(string password, byte[] salt)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                        password: password,
                        salt: salt,
                        prf: KeyDerivationPrf.HMACSHA256,
                        iterationCount: 100000,
                        numBytesRequested: 256 / 8));
            return hashed;
        }

        public UserDto? Login(LoginUserDto loginData)
        {
            var user = dbContext.Users.Where(u => u.Username == loginData.Username).FirstOrDefault();
            if (user != null)
            {
                bool passwordMatch = HashPassword(loginData.Password, user.Salt) == user.Password;
                if (passwordMatch)
                {
                    return UserDto.FromModel(user);
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
            var salt = GenerateSalt();

            // hash password + salt
            var hashedPassword = HashPassword(registerUserDto.Password, salt);

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
    }
}
