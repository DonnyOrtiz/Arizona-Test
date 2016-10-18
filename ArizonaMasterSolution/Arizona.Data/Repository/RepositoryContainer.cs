
using Arizona.Data.Infra;
using Helix.Infra.Peta;

namespace Arizona.Data.Repository
{
    public sealed class RepositoryContainer
    {

        [TableName("UserObject")]
        public sealed class UserObjectRepository : AppUserRepository, IRepository
        {
        }

        [TableName("Roles")]
        public sealed class RolesRepository : AppUserRepository, IRepository
        {
        }

        [TableName("UserRoles")]
        public sealed class UserRolesRepository : AppUserRepository, IRepository
        {
        }

        [TableName("Sessions")]
        public sealed class SessionRepository : AppHealthRepository, IRepository
        {
        }

        [TableName("Audit")]
        public sealed class AuditRepository : AppHealthRepository, IRepository
        {
        }

        [TableName("Locks")]
        public sealed class LockRepository : AppHealthRepository, IRepository
        {
        }
    }
}
