namespace DotnetApi.Users
{
    public abstract class UserContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        protected UserContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        protected int UserId => int.Parse(_httpContextAccessor.HttpContext?.User?.FindFirst(UserClaim.USER_ID)?.Value);
        protected string UserName => _httpContextAccessor.HttpContext?.User?.FindFirst(UserClaim.USER_ID).Value;
    }
}
