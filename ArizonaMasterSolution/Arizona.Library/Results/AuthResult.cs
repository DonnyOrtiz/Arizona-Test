using Arizona.Data.Models;
using Newtonsoft.Json;

namespace Arizona.Library.Results
{
    public sealed class AuthResult
    {

        [JsonProperty("user")]
        public UserObject User { get; set; }


    }
}
