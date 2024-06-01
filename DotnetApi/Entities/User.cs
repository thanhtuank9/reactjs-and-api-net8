namespace DotnetApi.Entities
{
    public record User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } // In a real app, store hashed passwords only


        public DateTime RefreshTokenExpiryTime { get; set; }
        public string RefreshToken { get; set; }
    }
}
