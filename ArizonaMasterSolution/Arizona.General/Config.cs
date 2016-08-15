using System.Configuration;
using System.Data.Common;
using System.Data.SqlClient;

namespace Arizona.General
{
    public sealed class Config
    {
        public static string DbConnectionStringName => ConfigurationManager.AppSettings["ConnectionStringName"] ?? "DbConnection";

        public static string DbConnectionString => ConfigurationManager.ConnectionStrings[DbConnectionStringName].ConnectionString;

        public static SqlConnection SqlConn => new SqlConnection(DbConnectionString);
        
    }
}
