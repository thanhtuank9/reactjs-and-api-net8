using DotnetApi;
using DotnetApi.Entities;

public class AdminUserCreationService : IHostedService
{
    private readonly IServiceProvider _serviceProvider;

    public AdminUserCreationService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var _applicationDbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();


            var user = new User
            {
                Id = 1,
                Username = "admin",
                Password = "admin",
                RefreshToken = string.Empty,
                RefreshTokenExpiryTime = DateTime.MinValue
            };

            _applicationDbContext.Users.Add(user);
            await _applicationDbContext.SaveChangesAsync();
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
