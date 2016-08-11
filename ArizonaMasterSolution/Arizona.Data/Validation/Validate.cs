
namespace Arizona.Data.Validation
{
    public sealed class Validate
    {
        private static object o;

        static Validate()
        {
            o = new object();
        }

        public static EntityValidationResult ValidateEntity<T>(T entity) where T : class
        {
            lock (o)
            {
                return new EntityValidator<T>().Validate(entity);
            }
        }
    }
}
