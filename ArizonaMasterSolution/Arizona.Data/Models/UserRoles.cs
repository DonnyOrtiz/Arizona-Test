using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Arizona.Data.Constants;
using Arizona.Data.Validation;
using Helix.Infra.Peta;
using Newtonsoft.Json;

namespace Arizona.Data.Models
{
    [TableName("UserRoles")]
    public sealed class UserRoles : ModelBase<UserRoles>, IModel
    {
        public string UserId { get; set; }
        public int RoleId { get; set; }

        [Ignore]
        public int ID { get; set; }
    }
}
