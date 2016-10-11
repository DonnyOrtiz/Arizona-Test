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
        /*
         public sealed partial class CustomerController : GenericControllerBase<Customer>, IController<Customer>
        {
            public CustomerController()
                : base(new RepositoryContainer.CustomerRepository(), "Customers")
            {
            }
        }
         */

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
