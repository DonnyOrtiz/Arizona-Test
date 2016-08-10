using System.Diagnostics;
using System.Web;
using System.Web.Http;
using Arizona.Data.Constants;
using Arizona.Data.Extentions;

namespace Arizona.WebAPI.Controllers
{
    public class BaseApiController : ApiController
    {
        public Stopwatch Stopwatch { get; set; }
        public string Token { get; set; }
        public long Nonce { get; set; }
        public string Cookie { get; set; }
        public BaseApiController()
        {
            HttpContext.Current.Response.ContentType = "application/json";

            Token = HttpContext.Current.Request.Headers.Get(ArizonaConstants.TOKEN_NAME);
            Nonce = HttpContext.Current.Request.Headers.Get(ArizonaConstants.NONCE_NAME).ToInt64();
            Cookie = HttpContext.Current.Request.Headers.Get(ArizonaConstants.AUTH_NAME);

            Stopwatch = new Stopwatch();
            Stopwatch.Start();
        }
    }
}
