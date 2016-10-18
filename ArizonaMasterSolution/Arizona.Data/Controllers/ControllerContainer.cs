using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Arizona.Data.Models;
using Arizona.Data.Repository;

namespace Arizona.Data.Controllers
{
    public sealed class ControllerContainer
    {
        public sealed partial class UserObjectController : GenericControllerBase<UserObject>, IController<UserObject>
        {
            public UserObjectController()
                : base(new RepositoryContainer.UserObjectRepository(), "UserObject")
            {
            }
        }

        public sealed partial class RolesController : GenericControllerBase<Role>, IController<Role>
        {
            public RolesController()
                : base(new RepositoryContainer.RolesRepository(), "Roles")
            {
            }
        }

        public sealed partial class UserRolesController : GenericControllerBase<UserRoles>, IController<UserRoles>
        {
            public UserRolesController()
                : base(new RepositoryContainer.UserRolesRepository(), "UserRoles")
            {
            }
        }

        public sealed partial class SessionController : GenericControllerBase<Session>, IController<Session>
        {
            public SessionController()
                : base(new RepositoryContainer.SessionRepository(), "Sessions")
            {
            }
        }

        public sealed partial class AuditController : GenericControllerBase<Audit>, IController<Audit>
        {
            public AuditController()
                : base(new RepositoryContainer.AuditRepository(), "Audit")
            {
            }
        }

        public sealed partial class LockController : GenericControllerBase<Lock>, IController<Lock>
        {
            public LockController()
                : base(new RepositoryContainer.LockRepository(), "Locks")
            {
            }
        }
    }
}
