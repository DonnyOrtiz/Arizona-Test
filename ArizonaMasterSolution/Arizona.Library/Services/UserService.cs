using System;
using System.Linq;
using Arizona.Data.Constants;
using Arizona.Data.Controllers;
using Arizona.Data.Models;
using Arizona.General;
using Arizona.Library.Responses;

namespace Arizona.Library.Services
{
    public sealed class UserServices
    {
        private readonly ControllerContainer.UserObjectController _userController;
        private readonly ControllerContainer.UserRolesController _userRolesController;
        private readonly ControllerContainer.RolesController _roleController;

        public UserServices()
        {
            _userController = new ControllerContainer.UserObjectController();
            _userRolesController = new ControllerContainer.UserRolesController();
            _roleController = new ControllerContainer.RolesController();
        }

        public AuthDataResponse Login(string username, string pwd)
        {
            var user = _userController.Select("where u_logon_name=@0 and u_user_security_password = @1", username, pwd)?.FirstOrDefault();

            if (user == null)
            {
                return new AuthDataResponse
                {
                    Success = false,
                    Message = "Invalid username or password.",
                };
            }

            var roles = _userRolesController.Select("where UserID=@0", user.g_user_id).ToList();

            if (!roles.Any())
            {
                user.Roles = new Role[1];
                user.Roles[0] = new Role { RoleID = 1, RoleName = "Users" };
            }
            else
                user.Roles = _roleController.Select($"where RoleID in ({string.Join(",", roles.Select(r => r.RoleId).ToArray())})").ToArray();

            var result = new AuthDataResponse(user)
            {
                Success = true
            };

            result.Message = result.AuthResult.User.PwdExpired ? "Your password has expired." : ArizonaConstants.SUCCESS;

            return result;
        }
        public AuthDataResponse Passthrough(string g_user_id)
        {
            var user = _userController.Select("where g_user_id='@0' or u_logon_name ='@0'", g_user_id)?.FirstOrDefault();

            if (user == null)
            {
                return new AuthDataResponse
                {
                    Success = false,
                    Message = "Invalid user identifier.",
                };
            }

            var roles = _userRolesController.Select("where UserID=@0", user.g_user_id).ToList();

            if (!roles.Any())
            {
                user.Roles = new Role[1];
                user.Roles[0] = new Role { RoleID = 1, RoleName = "Users" };
            }
            else
                user.Roles = _roleController.Select($"where RoleID in ({string.Join(",", roles.Select(r => r.RoleId).ToArray())})").ToArray();

            var result = new AuthDataResponse(user)
            {
                Success = true
            };

            result.Message = result.AuthResult.User.PwdExpired ? "Your password has expired." : ArizonaConstants.SUCCESS;

            return result;
        }
    }
}
