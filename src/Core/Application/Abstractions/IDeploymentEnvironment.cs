using System;
using System.Collections.Generic;
using System.Text;

namespace AspNetCoreSpa.Application.Abstractions
{
    public interface IDeploymentEnvironment
    {
        string OS { get; }
        string MachineName { get; }
        string RuntimeFramework { get; }
        string EnvironmentName { get; }
        string DeploymentId { get; }
    }
}
