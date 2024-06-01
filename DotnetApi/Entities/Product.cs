namespace DotnetApi.Entities
{
    public record Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }

        public int CreatedUserId { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
    }
}
