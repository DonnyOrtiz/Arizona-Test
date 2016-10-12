
using Arizona.Data.Infra;
using Helix.Infra.Peta;

namespace Arizona.Data.Repository
{
    public sealed class RepositoryContainer
    {
        /*
         [TableName("Customers")]
        public sealed class CustomerRepository : AppRepository, IRepository
        {
        }
         
         */

        //This is currently pointing to the "ARZ" database table "audit" but can be moved to another server/database but adjusting connection string in app|web.config
        [TableName("Audit")]
        public sealed class AuditRepository : AppRepository, IRepository
        {
        }

        [TableName("Locks")]
        public sealed class LockRepository : AppRepository, IRepository
        {
        }
    }
}
