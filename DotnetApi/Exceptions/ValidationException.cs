using DotnetApi.Enums;
using Microsoft.AspNetCore.Mvc;

namespace DotnetApi.Exceptions
{
    public class ValidationException : Exception
    {
        public int StatusCode { get; }
        public IDictionary<string, string[]> Errors { get; }

        public ValidationException(int statusCode, IDictionary<string, string[]> errors)
            : base("Validation error occurred.")
        {
            StatusCode = statusCode;
            Errors = errors;
        }
    }

    public class CustomProblemDetails : ProblemDetails
    {
        public string DetailErrorFormat { get; set; } = ErrorFormat.Text.ToString();
    }
}
