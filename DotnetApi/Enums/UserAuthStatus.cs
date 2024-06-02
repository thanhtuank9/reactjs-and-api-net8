namespace DotnetApi.Enums
{
    public enum UserAuthStatus
    {
        LoggedInSuccess = 0,
        RefreshTokenSuccess = 1,
        WrongUserNamePassword = -1,
        InvalidToken = -2
    }
}
