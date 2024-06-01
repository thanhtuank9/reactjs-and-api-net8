namespace DotnetApi.Models
{

    public class ProductCreateRequest
    {
        public string ProductName { get; set; }
        public int Quantity { get; set; }
    }

    public class ProductCreateResponse
    {
        public bool Success { get; set; }
        public int ProductId { get; set; }
    }
}
