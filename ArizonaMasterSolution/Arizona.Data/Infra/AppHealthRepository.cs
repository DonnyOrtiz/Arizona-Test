using Helix.Data;

namespace Arizona.Data.Infra
{
    public abstract class AppHealthRepository : HelixPetaRepository, IAppRepository
    {
        protected AppHealthRepository() : base("HealthDbConnection")
        {
        }
    }
}
