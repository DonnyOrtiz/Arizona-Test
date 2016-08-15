using System;
using System.Data;
using System.Data.SqlClient;
using NUnit.Framework;
using Arizona.Legacy.Library.Common;

namespace Arizona.TestSuite
{
    [TestFixture]
    public class LegacyLibraryTests
    {
        [Test]
        public void DbOrchestrationTest()
        {
            try
            {
                var r = "";
                var d = DbOrchestrate.Run
                    .ThenExecuteScalar("select count(*) from Locks", out r, CommandType.Text, new SqlParameter("", SqlDbType.VarChar) {Value = r})
                    .ThenExecuteScalar("select count(*) from Parts", out r, CommandType.Text, new SqlParameter("", SqlDbType.NVarChar) {Value = r})
                    .ThenEnd();

                Assert.AreEqual(1, 1);
                // add more validation asserts here
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                Assert.AreEqual(1,0);
                System.Diagnostics.Debug.WriteLine(ex.Message);
            }

        }

        [Test]
        public void XmlSerializer()
        {
            try
            {
                var xml = "<TestResponse><Message>test</Message><ID>123</ID></TestResponse>";
                var obj1 = new TestResponse {Message = "test", ID = 123};

                var xmlSerialized = ConvertTo<TestResponse>.From(xml);
                var xmlObject = ConvertTo<TestResponse>.From(obj1);

                Assert.AreEqual(1, 1);
                // add more validation asserts here
            }
            catch (Exception ex)
            {
                var msg = ex.Message;
                Assert.AreEqual(1, 0);
                System.Diagnostics.Debug.WriteLine(ex.Message);
            }
        }
    }

    internal class TestResponse
    {
        public string Message { get; set;  } 
        public int ID { get; set; }
    }
}
