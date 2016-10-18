using System;
using System.Collections.Generic;
using Arizona.Data.Constants;
using Arizona.Data.Models;
using Arizona.Library.Api;
using Arizona.Library.Results;
using Newtonsoft.Json;

namespace Arizona.Library.Responses
{
    public sealed class AuthDataResponse : IDataResult
    {
        [JsonProperty("authResult")]
        public AuthResult AuthResult { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("success")]
        public bool Success { get; set; }

        [JsonProperty("ticks")]
        public long Ticks { get; set; }

        public IEnumerable<IModel> Results { get; set; }

        [JsonProperty]
        public DateTime Timestamp { get; set; }

        public AuthDataResponse(UserObject user)
        {
            Timestamp = ArizonaConstants.ArizonaCurrentDate;
            Ticks = ArizonaConstants.ArizonaCurrentDate.Ticks;

            AuthResult = new AuthResult
            {
                User = user ?? new UserObject()
            };
        }

        public AuthDataResponse()
        {
            AuthResult = new AuthResult();
            Timestamp = ArizonaConstants.ArizonaCurrentDate;
            Ticks = ArizonaConstants.ArizonaCurrentDate.Ticks;
        }

        public IList<IModel> Data { get; set; }
    }
}
