using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.Repositories.Abstract;

namespace AspNetCoreSpa.Server.Repositories
{
    public class LoggingRepository : EntityBaseRepository<Error>, ILoggingRepository
    {
        public LoggingRepository(ApplicationDbContext context) : base(context) { }

        public override void Commit()
        {
            try
            {
                base.Commit();
            }
            catch { }
        }
    }
}
