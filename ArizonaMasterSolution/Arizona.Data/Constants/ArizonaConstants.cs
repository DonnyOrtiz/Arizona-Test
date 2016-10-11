using System;
using Arizona.General;
using Helix.Utility;

namespace Arizona.Data.Constants
{
    public sealed class ArizonaConstants
    {
        public static string SUCCESS = "Success";
        public static string FAILURE = "Failure";

        public static string TOKEN_NAME = "x-arz-token";
        public static string NONCE_NAME = "x-arz-nonce";
        public static string AUTH_NAME = "x-arz-auth";
        public static string TOKEN_BYPASS = "x-arz-bypass";

        public static DateTime ArizonaCurrentDate => DateTime.Now;

        public static int RecordLockExpirationInMin => int.Parse(Settings.Get("record_lock_expiration_min").DefaultValue("20"));
    }
}
