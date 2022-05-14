using AuthAPI.Models;

namespace AuthAPI.DTO
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }

        public static UserDto FromModel(User userModel)
        {
            return new UserDto()
            {
                Id = userModel.Id,
                Name = userModel.Name,
                Username = userModel.Username
            };
        }
    }
}
