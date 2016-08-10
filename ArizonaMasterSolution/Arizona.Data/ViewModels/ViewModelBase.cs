using Arizona.General;
using Helix.Infra.Peta;

namespace Arizona.Data.ViewModels
{
    public abstract class ViewModelBase
    {
        protected Database db;

        protected ViewModelBase()
        {
            db = new Database(Config.DbConnectionStringName);
        }
    }
}
