using Helix.Data;

namespace Arizona.Data.Infra
{
    public abstract class AppUserRepository : HelixPetaRepository, IAppRepository
    {
        protected AppUserRepository() : base("UserDbConnection")
        {
        }
    }
}
