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
            var host = BuildWebHost(args);

            // http://odetocode.com/blogs/scott/archive/2016/09/20/database-migrations-and-seeding-in-asp-net-core.aspx
            ProcessDbCommands.Process(args, host);

            host.Run();

        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                    .UseStartup<Startup>()
                    .UseKestrel(options =>
                    {
                        options.AddServerHeader = false;

                        var hostingEnv = (IHostingEnvironment)options.ApplicationServices.GetService(typeof(IHostingEnvironment));
                        // These bindings are overritten by IIS if that is the hosted server
                        // But if deployed using Docker then in production default address (http://localhost:5000) is used i.e with localhost rather IP address
                        // This is the reason why IPAddress (127.0.0.1) is only used for local dev only and https address is enabled by explicitly setting flag EnableDevHttps
                        if (hostingEnv.IsDevelopment())
                        {
                            options.Listen(IPAddress.Loopback, 5000);
                            if (Convert.ToBoolean(Startup.Configuration["EnableDevHttps"]))
                            {
                                options.Listen(IPAddress.Loopback, 5001, listenOptions =>
                                    {
                                        // A self-signed certificate can be generated from this project
                                        // https://www.pluralsight.com/blog/software-development/selfcert-create-a-self-signed-certificate-interactively-gui-or-programmatically-in-net
                                        listenOptions.UseHttps("extra/aspnetcorespa.pfx", "aspnetcorespa");
                                    });
                            }
                        }
                    })
                    .Build();
    }
}
