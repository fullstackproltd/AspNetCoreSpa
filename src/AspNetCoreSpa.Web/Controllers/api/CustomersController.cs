using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreSpa.Core.Entities;
using AspNetCoreSpa.Core.ViewModels;
using AspNetCoreSpa.Infrastructure;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreSpa.Web.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : BaseController
    {
        private readonly IUnitOfWork _uow;
        public CustomersController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        // GET: api/Customers
        [HttpGet]
        public IActionResult Get()
        {
            var allCustomers = _uow.Customers.GetAll();
            return Ok(Mapper.Map<IEnumerable<CustomerViewModel>>(allCustomers));
        }

        // GET: api/Customers/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var customer = _uow.Customers.Get(id);
            return Ok(Mapper.Map<CustomerViewModel>(customer));
        }

        // POST: api/Customers
        [HttpPost]
        public void Post([FromBody] CustomerViewModel customer)
        {
            _uow.Customers.Add(Mapper.Map<Customer>(customer));
            _uow.SaveChanges();
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] CustomerViewModel customer)
        {
            _uow.Customers.Update(_uow.Customers.Get(customer.Id));
            var result = _uow.SaveChanges();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _uow.Customers.Remove(_uow.Customers.Get(id));
            _uow.SaveChanges();
        }
    }
}
