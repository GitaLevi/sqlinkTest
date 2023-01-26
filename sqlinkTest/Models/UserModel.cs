namespace sqlinkTest.Models
{
    public class UserModel
    {
        public string Token { get; set; }
        public PersonalDetailsModel PersonalDetails { get; set; }

    }

    public class PersonalDetailsModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime JoinedAt { get; set; }
        public string Avatar { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

    }
}
