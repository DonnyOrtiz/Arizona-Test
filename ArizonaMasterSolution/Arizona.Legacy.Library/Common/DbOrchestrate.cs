using System;
using System.Data;
using System.Data.SqlClient;
using Arizona.General;
using Helix.Data;

namespace Arizona.Legacy.Library.Common
{
    public sealed class DbOrchestrate
    {
        private static readonly SqlConnection _connection;

        static DbOrchestrate()
        {
            _connection = Config.SqlConn; 
        }

        public static DbOrchestrate Run => new DbOrchestrate();


        public DbOrchestrate ThenQuery(string sqlSproc, out DataSet results, params SqlParameter[] p)
        {
            results = (SqlHelper.ExecuteDataset(_connection ?? Config.SqlConn, CommandType.StoredProcedure, sqlSproc, p));
            return this;
        }

        public DbOrchestrate ThenExecuteNonQuery(string sql, out int results, CommandType commandType = CommandType.StoredProcedure, params SqlParameter[] p)
        {
            results = (SqlHelper.ExecuteNonQuery(_connection ?? Config.SqlConn, commandType, sql, p));
            return this;
        }

        public DbOrchestrate ThenExecuteScalar(string sql, out string results, CommandType commandType = CommandType.StoredProcedure, params SqlParameter[] p)
        {
            results = Convert.ToString(SqlHelper.ExecuteScalar(_connection ?? Config.SqlConn, commandType, sql, p));
            return this;
        }

        public DbOrchestrate Then(string sql, out string results, params SqlParameter[] p)
        {
            return ThenExecuteScalar(sql, out results, CommandType.StoredProcedure, p);
        }
        
        public DbOrchestrate Close()
        {
            return ThenEnd();
        }

        public DbOrchestrate End()
        {
            return ThenEnd();
        }

        public DbOrchestrate ThenEnd()
        {
            if (_connection.State == ConnectionState.Closed)
                return this; 

            _connection?.Close();
            _connection?.Dispose();

            return this;
        }

    }
}