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
            if (username.ToLower() == "test")
            {
                return Request.CreateResponse(HttpStatusCode.OK, new { g_session_id = System.Guid.NewGuid().ToString().Substring(0, 7), g_user_id = "3642046A-E4DC-49C5-A3AE-22FD53403C98", u_logon_name = "test.user01", u_first_name = "Test", u_last_name = "User (001)", i_account_Status = true }, new JsonMediaTypeFormatter());
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "The username or password you supplied is not correct" }, new JsonMediaTypeFormatter());
            }
        }

        [AllowAnonymous]
        [HttpOptions]
        [HttpGet]
        public HttpResponseMessage Passthrough(string uid)
        {
            if (uid == "3642046A-E4DC-49C5-A3AE-22FD53403C98" || uid == "test.user01")
            {
                return Request.CreateResponse(HttpStatusCode.OK, new { g_session_id = System.Guid.NewGuid().ToString().Substring(0, 7), g_user_id = "3642046A-E4DC-49C5-A3AE-22FD53403C98", u_logon_name = "test.user01", u_first_name = "Test", u_last_name = "User (001)", i_account_Status = true }, new JsonMediaTypeFormatter());
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "The username or password you supplied is not correct" }, new JsonMediaTypeFormatter());
            }
        }
    }
}
