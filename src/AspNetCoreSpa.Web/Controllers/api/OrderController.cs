﻿using System.Collections.Generic;
using AspNetCoreSpa.Core.Entities;
using AspNetCoreSpa.Core.ViewModels;
using AspNetCoreSpa.Infrastructure;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreSpa.Web.Controllers.api
{
    public class OrderController : BaseController
    {
        private readonly IUnitOfWork _uow;
        public OrderController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        // GET: api/Order
        [HttpGet]
        public IActionResult Get()
        {
            var allOrder = _uow.Orders.GetAll();
            return Ok(Mapper.Map<IEnumerable<OrderViewModel>>(allOrder));
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var Order = _uow.Orders.Get(id);
            return Ok(Mapper.Map<OrderViewModel>(Order));
        }

        // POST: api/Order
        [HttpPost]
        public void Post([FromBody] OrderViewModel Order)
        {
            _uow.Orders.Add(Mapper.Map<Order>(Order));
            _uow.SaveChanges();
        }

        // PUT: api/Order/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] OrderViewModel order)
        {
            var o = _uow.Orders.Get(id);
            o.Discount = order.Discount;
            o.Comments = order.Comments;
            _uow.Orders.Update(o);
            var result = _uow.SaveChanges();
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _uow.Orders.Remove(_uow.Orders.Get(id));
            _uow.SaveChanges();
        }
    }
}
