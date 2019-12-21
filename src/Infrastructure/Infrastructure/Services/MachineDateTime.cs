using System;
using AspNetCoreSpa.Common;

namespace AspNetCoreSpa.Infrastructure.Services
{
    public class MachineDateTime : IDateTime
    {
        public DateTime Now => DateTime.Now;

        public int CurrentYear => DateTime.Now.Year;
    }
}
