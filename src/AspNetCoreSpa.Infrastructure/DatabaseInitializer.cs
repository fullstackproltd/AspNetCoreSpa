using AspNet.Security.OpenIdConnect.Primitives;
using AspNetCoreSpa.Core;
using AspNetCoreSpa.Core.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using OpenIddict.Core;
using OpenIddict.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace AspNetCoreSpa.Infrastructure
{
    public interface IDatabaseInitializer
    {
        void Initialise();
    }

    public class DatabaseInitializer : IDatabaseInitializer
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        private readonly IHostingEnvironment _hostingEnvironment;

        public DatabaseInitializer(
            ApplicationDbContext context,
            ILogger<DatabaseInitializer> logger,
            IHostingEnvironment hostingEnvironment
            )
        {
            _context = context;
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;
        }

        public void Initialise()
        {
            _context.Database.Migrate();

            AddLocalisedData();
            AddShopData();
        }
        private void AddLocalisedData()
        {
            if (!_context.Cultures.Any())
            {
                var translations = _hostingEnvironment.GetTranslationFile();

                var locales = translations.First().Split(",").Skip(1).ToList();

                var currentLocale = 0;

                locales.ForEach(locale =>
                {
                    currentLocale += 1;

                    var culture = new Culture
                    {
                        Name = locale
                    };
                    var resources = new List<Resource>();
                    translations.Skip(1).ToList().ForEach(t =>
                    {
                        var line = t.Split(",");
                        resources.Add(new Resource
                        {
                            Culture = culture,
                            Key = line[0],
                            Value = line[currentLocale]
                        });
                    });

                    culture.Resources = resources;

                    _context.Cultures.Add(culture);

                    _context.SaveChanges();
                });
            }
        }

        private void AddShopData()
        {
            if (!_context.Customers.Any())
            {
                for (int i = 0; i < 10; i++)
                {
                    _context.Customers.Add(new Customer
                    {
                        Name = "John Doe " + i,
                        Email = $"{i}test@test.com",
                        PhoneNumber = "0123456789" + i,
                        Address = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet",
                        City = "Lorem Ipsum " + i,
                        Gender = i % 2 == 0 ? Gender.Male : Gender.Female,
                        UpdatedDate = DateTime.UtcNow,
                        CreatedDate = DateTime.UtcNow
                    });
                }
            }

            if (!_context.ProductCategories.Any())
            {
                for (int i = 0; i < 10; i++)
                {
                    _context.ProductCategories.Add(new ProductCategory
                    {
                        Name = "Category " + 1,
                        Description = "Category description " + i,
                        UpdatedDate = DateTime.UtcNow,
                        CreatedDate = DateTime.UtcNow
                    });
                }
            }

            if (!_context.Products.Any())
            {
                for (int i = 0; i < 100; i++)
                {
                    _context.Products.Add(new Product
                    {
                        Name = "Product " + i,
                        Description = "Product description " + i,
                        BuyingPrice = 100 + i,
                        SellingPrice = 110 + i,
                        UnitsInStock = 10 + i,
                        IsActive = true,
                        ProductCategoryId = new Random().Next(1, 11),
                        CreatedDate = DateTime.UtcNow,
                        UpdatedDate = DateTime.UtcNow
                    });
                }
            }

            if (!_context.Orders.Any())
            {
                for (int i = 0; i < 10; i++)
                {
                    _context.Orders.Add(new Order
                    {
                        Discount = 500,
                        CustomerId = 1,
                        CreatedDate = DateTime.UtcNow,
                        UpdatedDate = DateTime.UtcNow,
                        OrderDetails = new List<OrderDetail> {
                        new OrderDetail() { UnitPrice = 101, Quantity = 1, ProductId = 1 },
                        new OrderDetail() { UnitPrice = 100, Quantity = 1, ProductId = 2 }
                    }
                    });
                }
            }

            _context.SaveChanges();
        }
    }
}
