using System.Collections.Generic;

namespace AspNetCoreSpa.Application.Employees.Queries.GetEmployeesList
{
    public class EmployeesListVm
    {
        public IList<EmployeeLookupDto> Employees { get; set; }
    }
}
 