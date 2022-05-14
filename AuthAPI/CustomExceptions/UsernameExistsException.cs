namespace AuthAPI.CustomExceptions
{
    public class UsernameExistsException : Exception
    {
        const string template = "username: {0} already exists !";

        public UsernameExistsException(string username)
            : base(string.Format(template, username))
        {

        }
    }
}
