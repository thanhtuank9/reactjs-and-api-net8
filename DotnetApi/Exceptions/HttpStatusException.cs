using System.Net;

namespace DotnetApi.Exceptions
{
    public class HttpStatusException : Exception
    {
        public HttpStatusCode StatusCode { get; }

        /// <summary>
        /// HttpStatus code default is BadRequest
        /// </summary>
        /// <param name="message"></param>
        public HttpStatusException(string message) : base(message)
        {
            StatusCode = HttpStatusCode.BadRequest;
        }

        public HttpStatusException(HttpStatusCode statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }
    }
}
