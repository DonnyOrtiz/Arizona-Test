using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.ModelBinding;

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
            return Request.CreateResponse(HttpStatusCode.OK, new {message = "OK", loveThis = true}, new JsonMediaTypeFormatter());


        }

        [AllowAnonymous]
        [HttpOptions]
        [HttpPost]
        public HttpResponseMessage Login(FormDataCollection f)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new {sessionID = System.Guid.NewGuid().ToString().Substring(0,7), username = f["username"] }, new JsonMediaTypeFormatter());
        }

    }
}
