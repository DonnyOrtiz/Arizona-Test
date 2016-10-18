using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Security;

using Arizona.Data.Models;
using Arizona.General;
using Arizona.Library.Api;
using Arizona.Library.Exceptions;
using Arizona.Library.Responses;
using Arizona.Library.Services;
using Helix.Security;

namespace Arizona.WebAPI.Controllers
{
    [Authorize]
    public class AuthController : BaseApiController
    {
        private readonly UserServices _userServices;

        public AuthController() : base()
        {
            _userServices = new UserServices();
        }
        [AllowAnonymous]
        [HttpOptions]
        [HttpGet]
        public HttpResponseMessage Login(string username, string password)
        {
            try
            {
                Token = ApiServices.GetToken();
                var response = _userServices.Login(username, password);
                var nonce = ApiServices.GetNonce();

                var auth = new Auth.AuthTicket
                {
                    Domain = FormsAuthentication.CookieDomain,
                    ExpirationInMinutes = 60,
                    Persistent = true,
                    UserData = $"{response.AuthResult.User?.RolesList}",
                    UserName = username,
                    Version = 1
                };

                var cookie = Auth.GetAuthTicket(auth);

                var data = new List<IDataResult>
                {
                    new AuthDataResponse(response.AuthResult.User)
                    {
                        Message = response.Message,
                        Success = response.Success,
                    }
                };

                ApiServices.AddSession(Token, nonce, ClientRequestData.UserAgent);

                var result = new ApiResult(data, Stopwatch, "auth/login", Token, nonce, cookie);
                return Request.CreateResponse(HttpStatusCode.OK, result, new JsonMediaTypeFormatter());
            }
            catch (InvalidTokenException tx)
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized, new { message = tx.Message }, new JsonMediaTypeFormatter());
            }
            catch (ArizonaAppException appx)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, new { message = appx.Message }, new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ex.Message }, new JsonMediaTypeFormatter());
            }
        }

        [AllowAnonymous]
        [HttpOptions]
        [HttpGet]
        public HttpResponseMessage Passthrough(string uid)
        {
            try
            {
                Token = ApiServices.GetToken();
                var response = _userServices.Passthrough(uid);
                var nonce = ApiServices.GetNonce();
                var auth = new Auth.AuthTicket
                {
                    Domain = FormsAuthentication.CookieDomain,
                    ExpirationInMinutes = 60,
                    Persistent = true,
                    UserData = $"{response.AuthResult.User?.RolesList}",
                    UserName = response.AuthResult.User.u_logon_name,
                    Version = 1
                };

                var cookie = Auth.GetAuthTicket(auth);

                var data = new List<IDataResult>
                {
                    new AuthDataResponse(response.AuthResult.User)
                    {
                        Message = response.Message,
                        Success = response.Success,
                    }
                };

                ApiServices.AddSession(Token, nonce, ClientRequestData.UserAgent);

                var result = new ApiResult(data, Stopwatch, "auth/login", Token, nonce, cookie);
                return Request.CreateResponse(HttpStatusCode.OK, result, new JsonMediaTypeFormatter());
            }
            catch (InvalidTokenException tx)
            {
                return Request.CreateResponse(HttpStatusCode.Unauthorized, new { message = tx.Message }, new JsonMediaTypeFormatter());
            }
            catch (ArizonaAppException appx)
            {
                return Request.CreateResponse(HttpStatusCode.NotAcceptable, new { message = appx.Message }, new JsonMediaTypeFormatter());
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new { message = ex.Message }, new JsonMediaTypeFormatter());
            }
        }
    }
}
