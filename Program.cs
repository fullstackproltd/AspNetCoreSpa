using System.IO;
using AspNetCoreSpa.Server;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore;
using System.Net;
using System;

namespace AspNetCoreSpa
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            // http://odetocode.com/blogs/scott/archive/2016/09/20/database-migrations-and-seeding-in-asp-net-core.aspx
            // ProcessDbCommands.Process(args, host);
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>    
                   WebHost.CreateDefaultBuilder(args)
                       .UseStartup<Startup>();
    }
}
