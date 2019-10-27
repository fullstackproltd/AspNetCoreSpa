using System.Collections.Generic;
using AspNetCoreSpa.Core.Entities;
using AspNetCoreSpa.Core.ViewModels;
using AspNetCoreSpa.Infrastructure;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreSpa.Web.Controllers.api
{
    public class ProductCategoryController : BaseController
    {
        private readonly IUnitOfWork _uow;

        private readonly IMapper _mapper;

        public ProductCategoryController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        // GET: api/ProductCategories
        [HttpGet]
        public IActionResult Get()
        {
            var allProductCategories = _uow.ProductCategories.GetAll();
            return Ok(_mapper.Map<IEnumerable<ProductCategoryViewModel>>(allProductCategories));
        }

        // GET: api/ProductCategories/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _uow.ProductCategories.Get(id);
            return Ok(_mapper.Map<ProductCategoryViewModel>(category));
        }

        // POST: api/ProductCategories
        [HttpPost]
        public void Post([FromBody] ProductCategoryViewModel productCategory)
        {
            _uow.ProductCategories.Add(_mapper.Map<ProductCategory>(productCategory));
            _uow.SaveChanges();
        }

        // PUT: api/ProductCategories/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] ProductCategoryViewModel category)
        {
            var cat = _uow.ProductCategories.Get(id);
            cat.Name = category.Name;
            cat.Description = category.Description;
            cat.Icon = category.Icon;
            _uow.ProductCategories.Update(cat);
            var result = _uow.SaveChanges();
        }

        // DELETE: api/ProductCategories/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _uow.ProductCategories.Remove(_uow.ProductCategories.Get(id));
            _uow.SaveChanges();
        }
    }
}
