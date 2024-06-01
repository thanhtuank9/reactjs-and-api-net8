using DotnetApi;
using DotnetApi.Entities;
using DotnetApi.Models;
using DotnetApi.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("products")]
public class ProductController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProductController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetProducts([FromQuery] string? keyword, [FromQuery] int? pageSize = 20, [FromQuery] int? pageIndex = 1)
    {
        var query = _context.Products.AsQueryable();

        if (!string.IsNullOrEmpty(keyword))
        {
            query = query.Where(p => p.ProductName.Contains(keyword));
        }

        var total = query.Count();
        var products = query.Skip(pageSize.Value * (pageIndex.Value - 1)).Take(pageSize.Value).ToList();

        return Ok(new
        {
            Total = total,
            Products = products,
            PageSize = pageSize,
            PageIndex = pageIndex
        });
    }

    [HttpPost]
    [Authorize]
    public IActionResult CreateProduct([FromBody] ProductCreateRequest request)
    {
        if (string.IsNullOrEmpty(request.ProductName) || request.Quantity <= 0)
        {
            return BadRequest(new { HttpStatusCode = 400, ErrorMessages = "Bad data" });
        }

        var product = new Product
        {
            ProductName = request.ProductName,
            Quantity = request.Quantity
        };

        _context.Products.Add(product);
        _context.SaveChanges();

        return Ok(new ProductCreateResponse
        {
            Success = true,
            ProductId = product.Id
        });
    }
}