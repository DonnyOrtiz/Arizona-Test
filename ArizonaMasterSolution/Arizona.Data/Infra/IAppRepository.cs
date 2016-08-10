using Helix.Data;

namespace Arizona.Data.Infra
{
    public interface IAppRepository : IHelixPetaRepository
    {
        void Dispose();
    }
}
