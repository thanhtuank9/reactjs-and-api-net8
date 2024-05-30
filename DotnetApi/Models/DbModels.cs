namespace DotnetApi.Models
{
    // Models/User.cs
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; } // In a real app, store hashed passwords only


        public DateTime RefreshTokenExpiryTime { get; set; }
        public string RefreshToken { get; set; }
    }

    // Models/Product.cs
    //public class Product
    //{
    //    public int Id { get; set; }
    //    public string ProductName { get; set; }
    //    public int Quantity { get; set; }
    //}

}
