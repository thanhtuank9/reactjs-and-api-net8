using DotnetApi.Enums;
using DotnetApi.Exceptions;
using Microsoft.AspNetCore.Diagnostics;
using System.Text.Json;
using ValidationException = DotnetApi.Exceptions.ValidationException;

namespace DotnetApi.Middlewares
{
    internal sealed class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            _logger.LogError(exception, "Exception occurred: {Message}", exception.Message);

            var problemDetails = new CustomProblemDetails
            {
                Status = StatusCodes.Status500InternalServerError,
                Detail = exception?.Message ?? "Server error"
            };

            if (exception is HttpStatusException httpStatusException)
            {
                problemDetails.Status = (int)httpStatusException.StatusCode;
                problemDetails.Detail = httpStatusException?.Message ?? problemDetails.Title;
            } 
            if (exception is ApiResponseException apiResponseException)
            {
                problemDetails.Status = (int)apiResponseException.Status;
                problemDetails.Detail = apiResponseException?.Message ?? problemDetails.Title;
            }

            if (exception is ValidationException validationException)
            {
                problemDetails.Status = validationException.StatusCode;
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                problemDetails.DetailErrorFormat = ErrorFormat.Json.ToString();
                problemDetails.Detail = JsonSerializer.Serialize(validationException.Errors, options);
            }

            httpContext.Response.StatusCode = problemDetails.Status.Value;

            await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

            return true;
        }
    }
}
