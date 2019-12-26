using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using AspNetCoreSpa.Application.Abstractions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
namespace AspNetCoreSpa.Infrastructure.Environment
{
    public class DeploymentEnvironment : IDeploymentEnvironment
    {
        private readonly ILogger<DeploymentEnvironment> _logger;
        private readonly IWebHostEnvironment _hostingEnv;
        private string _commitSha;

        public DeploymentEnvironment(IWebHostEnvironment hostingEnv, ILogger<DeploymentEnvironment> logger)
        {
            _hostingEnv = hostingEnv;
            _logger = logger;
        }

        public string OS => $"{RuntimeInformation.OSDescription} {RuntimeInformation.OSArchitecture}";
        public string MachineName => System.Environment.MachineName;
        public string RuntimeFramework =>
            $"{RuntimeInformation.FrameworkDescription} {RuntimeInformation.ProcessArchitecture}";
        public string EnvironmentName => _hostingEnv.EnvironmentName;

        public string DeploymentId
        {
            get
            {
                if (_commitSha == null)
                {
                    LoadCommitSha();
                }

                return _commitSha;
            }
        }

        private void LoadCommitSha()
        {
            try
            {
                var git = Process.Start(new ProcessStartInfo
                {
                    FileName = "git",
                    Arguments = "rev-parse HEAD",
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true
                });
                var gitOut = "";
                while (!git.StandardOutput.EndOfStream)
                {
                    gitOut += git.StandardOutput.ReadLine();
                }
                gitOut += " (local)";

                git.WaitForExit();
                if (git.ExitCode != 0)
                {
                    _logger.LogDebug("Problem using git to set deployment ID:\r\n  git exit code: {0}\r\n git output: {1}", git.ExitCode, _commitSha);
                    _commitSha = "(Could not determine deployment ID)";
                }
                else
                {
                    _commitSha = gitOut;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(0, ex, "Error determining deployment ID");
                _commitSha = "(Error determining deployment ID)";
            }
        }
    }
}
