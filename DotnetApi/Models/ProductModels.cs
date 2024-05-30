namespace DotnetApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        // other properties
    }

    public class ProductRequest
    {
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        // other properties
    }

    public class ProductResponse
    {
        public bool Success { get; set; }
        public int ProductId { get; set; }
    }
}
