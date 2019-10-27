using AspNetCoreSpa.Core;
using AspNetCoreSpa.Core.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AspNetCoreSpa.Infrastructure
{
    public interface ISeedData
    {
        void Initialise();
    }

    public class SeedData : ISeedData
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger _logger;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public SeedData(
            ApplicationDbContext context,
            ILogger<SeedData> logger,
            IWebHostEnvironment hostingEnvironment
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
                        DateOfBirth = DateTime.Now.AddDays(i),
                        PhoneNumber = "0123456789" + i,
                        Address = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                    Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet",
                        City = "Lorem Ipsum " + i,
                        Gender = i % 2 == 0 ? Gender.Male : Gender.Female,
                        UpdatedDate = DateTime.UtcNow,
                        CreatedDate = DateTime.UtcNow
                    });
                }

                _context.SaveChanges();
            }

            if (!_context.ProductCategories.Any())
            {
                for (int i = 0; i < 10; i++)
                {
                    _context.ProductCategories.Add(new ProductCategory
                    {
                        Name = "Category " + i,
                        Description = "Category description " + i,
                        UpdatedDate = DateTime.UtcNow,
                        CreatedDate = DateTime.UtcNow
                    });
                }

                _context.SaveChanges();
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

                _context.SaveChanges();
            }

            if (!_context.Orders.Any())
            {
                var customer = _context.Customers.First();
                for (int i = 0; i < 10; i++)
                {
                    _context.Orders.Add(new Order
                    {
                        Discount = 500 + 1m,
                        Comments = i + " Lorem ipsum is just a dummy text e.g the quick brown fox jumps over the lazy dog.",
                        CustomerId = customer.Id,
                        CreatedDate = DateTime.UtcNow,
                        UpdatedDate = DateTime.UtcNow,
                        OrderDetails = null
                    });
                }
                _context.SaveChanges();
            }

        }
    }
}
