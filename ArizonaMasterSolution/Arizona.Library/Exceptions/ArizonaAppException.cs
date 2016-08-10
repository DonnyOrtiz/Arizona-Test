using System;
using Helix.Utility;

namespace Arizona.Library.Exceptions
{
    public sealed class ArizonaAppException : Exception
    {
        public ArizonaAppException(string message, params object[] p) 
            : base(string.Format(message,p))
        {
            base.Data["Type"] = "App";
            Logger.Log("Application Exception", message, Logger.LogType.Critical, p);
        }

        public ArizonaAppException(string msg, Exception ex, params object[] p) 
            : base(string.Format(msg,p), ex)
        {
            base.Data["Type"] = "App";
            Logger.Log("Application Exception", ex?.ToString(), Logger.LogType.Critical, p);
        }

        public ArizonaAppException()
            : base()
        {
            base.Data["Type"] = "App";
            Logger.Log("Core Application Exception", "ArizonaAppException", Logger.LogType.Critical);

        }
    }
}
