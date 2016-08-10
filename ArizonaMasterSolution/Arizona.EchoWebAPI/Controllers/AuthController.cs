using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Arizona.EchoWebAPI.Controllers
{
    [CrossSiteScripting]
    public sealed class AuthController : BaseApiController
    {
        [AllowAnonymous]
        [HttpOptions]
        [HttpGet]
        public HttpResponseMessage Login(string username, string pwd)
        {
            return new HttpResponseMessage() { StatusCode = HttpStatusCode.Accepted };
        }

        [AllowAnonymous]
        [HttpOptions]
        [HttpPost]
        public HttpResponseMessage Login(FormDataCollection f)
        {
            return new HttpResponseMessage() { StatusCode = HttpStatusCode.Accepted  };
        }

    }
}
