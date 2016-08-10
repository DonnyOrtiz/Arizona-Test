using Helix.Data;

namespace Arizona.Data.Infra
{
    public abstract partial class AppRepository : HelixPetaRepository, IAppRepository
    {
        protected AppRepository() : base("DbConnection") // This is the CORE (aka 'default') database connection 
        {
        }
    }
}
