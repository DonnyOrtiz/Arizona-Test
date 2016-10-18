using Helix.Data;

namespace Arizona.Data.Infra
{
    public abstract class AppImagingRepository : HelixPetaRepository, IAppRepository
    {
        protected AppImagingRepository() : base("ImagingDbConnection")
        {
        }
    }
}
