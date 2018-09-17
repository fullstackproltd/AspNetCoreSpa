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
    public class ProductController : BaseController
    {
        private readonly IUnitOfWork _uow;
        public ProductController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        // GET: api/Product
        [HttpGet]
        public IActionResult Get()
        {
            var allProduct = _uow.Products.GetAll();
            return Ok(Mapper.Map<IEnumerable<ProductViewModel>>(allProduct));
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = _uow.Products.Get(id);
            return Ok(Mapper.Map<ProductViewModel>(product));
        }

        // POST: api/Product
        [HttpPost]
        public void Post([FromBody] ProductViewModel product)
        {
            _uow.Products.Add(Mapper.Map<Product>(product));
            _uow.SaveChanges();
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] ProductViewModel product)
        {
            var p = _uow.Products.Get(id);
            p.Name = product.Name;
            p.Description = product.Description;
            p.Icon = product.Icon;
            p.BuyingPrice = product.BuyingPrice;
            p.SellingPrice = product.SellingPrice;
            p.UnitsInStock = product.UnitsInStock;
            p.IsActive = product.IsActive;
            p.IsDiscontinued = product.IsDiscontinued;
            _uow.Products.Update(p);
            var result = _uow.SaveChanges();
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _uow.Products.Remove(_uow.Products.Get(id));
            _uow.SaveChanges();
        }
    }
}
