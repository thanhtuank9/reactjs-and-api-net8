using System.Net;

namespace DotnetApi.Exceptions
{
    public class ApiResponseException : Exception
    {
        public HttpStatusCode StatusCode { get; }
        public int Status { get;set; }

        /// <summary>
        /// HttpStatus code default is Ok
        /// </summary>
        /// <param name="message"></param>
        public ApiResponseException(string message, int status = -1) : base(message)
        {
            StatusCode = HttpStatusCode.OK;
            Status = status;
        }

        public ApiResponseException(HttpStatusCode statusCode, string message, int status = -1) : base(message)
        {
            StatusCode = statusCode;
            Status = status;
        }
    }
}
