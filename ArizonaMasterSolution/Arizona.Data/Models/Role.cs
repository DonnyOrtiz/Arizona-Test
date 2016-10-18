using Helix.Infra.Peta;
using Newtonsoft.Json;

namespace Arizona.Data.Models
{
    [TableName("Roles")]
    public sealed class Role : ModelBase<Role>, IModel
    {
        [JsonProperty("roleId")]
        public int RoleID { get; set; }

        [JsonProperty("roleName")]
        public string RoleName { get; set; }

        [Ignore]
        public int ID { get; set; }

    }
}
