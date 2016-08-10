using System.Configuration;

namespace Arizona.General
{
    public sealed class Config
    {
        public static string DbConnectionStringName => ConfigurationManager.AppSettings["ConnectionStringName"] ?? "DbConnection";

        public static string DbConnectionString => ConfigurationManager.ConnectionStrings[DbConnectionStringName].ConnectionString;
    }
}
