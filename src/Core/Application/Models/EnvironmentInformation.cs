using System;
using System.Collections.Generic;
using System.Text;

namespace AspNetCoreSpa.Application.Models
{
    public class EnvironmentInformation
    {
        public string OS { get; set; }
        public string MachineName { get; set; }
        public string EnvironmentName { get; set; }
        public string FrameworkVersion { get; set; }
        public string CommitId { get; set; }
    }
}
