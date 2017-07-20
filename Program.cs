using System.IO;
using AspNetCoreSpa.Server;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore;

namespace AspNetCoreSpa
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);

            host.Run();

            // var host = new WebHostBuilder()
            //     .CaptureStartupErrors(true)
            //     // .UseSetting("detailedErrors", "true")
            //     .UseKestrel()
            //     .UseConfiguration(config)
            //     .UseContentRoot(Directory.GetCurrentDirectory())
            //     .UseIISIntegration()
            //     .UseStartup<Startup>()
            //     .Build();

            // http://odetocode.com/blogs/scott/archive/2016/09/20/database-migrations-and-seeding-in-asp-net-core.aspx
            ProcessDbCommands.Process(args, host);
        }

        public static IWebHost BuildWebHost(string[] args) =>
          WebHost.CreateDefaultBuilder(args)
              .UseConfiguration(new ConfigurationBuilder()
                  .SetBasePath(Directory.GetCurrentDirectory())
                  .AddJsonFile("hosting.json", optional: true)
                  .Build()
              )
              .UseStartup<Startup>()
              .Build();
    }
}
