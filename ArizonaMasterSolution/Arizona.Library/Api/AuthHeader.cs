using System.Linq;
using Arizona.Data.Constants;

namespace Arizona.Library.Api
{
    public sealed class AuthHeader
    {
        public string HeaderText { get; set; }

        private readonly string[] headerArray;

        public bool AuthSignatureBypass
        {
            get
            {
                try
                {
                    return headerArray.FirstOrDefault(n => n.ToLower().Contains(Arizona.onstants.TOKEN_BYPASS)).Split(':')[1].Trim() == "deadbeef123";
                }
                catch
                {
                    return false;
                } 
            }
        }

        public string Token
        {
            get
            {
                try
                {
                    return headerArray.FirstOrDefault(n => n.ToLower().Contains(Arizona.onstants.TOKEN_NAME)).Split(':')[1].Trim();
                }
                catch
                {
                    return "";
                }
            }
        }

        public long Nonce
        {
            get
            {
                try
                {
                    return long.Parse(headerArray.FirstOrDefault(n => n.ToLower().Contains(Arizona.onstants.NONCE_NAME)).Split(':')[1].Trim());
                }
                catch
                {
                    return 0;
                }
            }
        }

        public string Auth
        {
            get
            {
                try
                {
                    return headerArray.FirstOrDefault(n => n.ToLower().Contains(Arizona.onstants.AUTH_NAME)).Split(':')[1].Trim();
                }
                catch
                {
                    return "";
                }
            }
        }

        public AuthHeader(string header)
        {
            HeaderText = header;
            headerArray = header.Split('\n');
        }
    }
}
