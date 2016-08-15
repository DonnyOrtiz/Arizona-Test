using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace Arizona.Legacy.Library.Common
{
    public sealed class ConvertTo<T> where T : class
    {
        /// <summary>
        /// Generic T type Xml de-serializer
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public static T From(string xml)
        {
            var stream = new StringReader(xml);
            var reader = new XmlTextReader(stream);

            try
            {
                var serializer = new XmlSerializer(typeof (T));
                return (T) serializer.Deserialize(reader);
            }
            finally
            {
                stream.Close();
                reader.Close();
            }
        }

        /// <summary>
        /// Returns XML from type of T
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static string From(T type)
        {
            var xmlSerializer = new XmlSerializer(typeof (T));
            var result = new MemoryStream(128);
            xmlSerializer.Serialize(result, type);

            return Encoding.ASCII.GetString(result.ToArray());
        }

    }
}

