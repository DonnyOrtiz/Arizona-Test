using System;

namespace Arizona.General
{
    public static class ConfigExtensionMethods
    {
        public static string DefaultValue(this string val, string defaultReturnedValue)
        {
            return string.IsNullOrEmpty(val) ? defaultReturnedValue : Convert.ToString(val);
        }
    }
}
