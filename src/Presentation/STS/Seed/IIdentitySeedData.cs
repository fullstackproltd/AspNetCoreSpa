using System;

namespace AspNetCoreSpa.STS.Seed
{
    public interface IIdentitySeedData
    {
        void Seed(IServiceProvider serviceProvider);
    }
}