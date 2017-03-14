using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreSpa.Server.Entities;
using AspNetCoreSpa.Server.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspNetCoreSpa.Server.Controllers.api
{
    public static class AllProducts
    {
        public static List<Product> PRODUCTS = new List<Product>{

            new Product{
                _id= 1,
                ProductName= "Leaf Rake",
                ProductCode= "GDN-0011",
                ReleaseDate= "March 19, 2016",
                Description= "Leaf rake with 48-inch wooden handle.",
                Price= 19.95,
                StarRating= 3.2,
                ImageUrl= "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png",
                Tags = new string[] {"rake", "leaf", "yard", "home"}
            },
            new Product{
                _id= 2,
                ProductName= "Garden Cart",
                ProductCode= "GDN-0023",
                ReleaseDate= "March 18, 2016",
                Description= "15 gallon capacity rolling garden cart",
                Price= 32.99,
                StarRating= 4.2,
                ImageUrl= "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
            },
            new Product{
                _id= 5,
                ProductName= "Hammer",
                ProductCode= "TBX-0048",
                ReleaseDate= "May 21, 2016",
                Description= "Curved claw steel hammer",
                Price= 8.9,
                StarRating= 4.8,
                ImageUrl= "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png",
                Tags = new string[] {"tools", "hammer", "construction"}
            },
            new Product{
                _id= 8,
                ProductName= "Saw",
                ProductCode= "TBX-0022",
                ReleaseDate= "May 15, 2016",
                Description= "15-inch steel blade hand saw",
                Price= 11.55,
                StarRating= 3.7,
                ImageUrl= "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
            },
            new Product{
                _id= 10,
                ProductName= "Video Game Controller",
                ProductCode= "GMG-0042",
                ReleaseDate= "October 15, 2015",
                Description= "Standard two-button video game controller",
                Price= 35.95,
                StarRating= 4.6,
                ImageUrl= "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
            }

    };

    }



    [Produces("application/json")]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class ProductController : BaseController
    {
        private readonly ApplicationDbContext _context;
        private List<Product> _products;
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
            _products = AllProducts.PRODUCTS;
        }

        // GET: api/Product
        [HttpGet]
        public IEnumerable<Product> GetProducts()
        {
            return _products;
        }

        [HttpGet("{id}")]
        public Product GetProduct([FromRoute]int id)
        {
            return _products.FirstOrDefault(x => x._id == id);
        }

        [HttpPut("{id}")]
        public IActionResult PutProduct([FromRoute] int id, [FromBody] Product product)
        {
            var productToEdit = _products.FirstOrDefault(p => p._id == id);
            var index = _products.IndexOf(productToEdit);

            if (index > -1)
            {
                _products[index] = product;
            }

            return Ok(product);
        }

        [HttpPost]
        public IActionResult PostProduct([FromBody] Product product)
        {
            product._id = _products.Count + 1;

            _products.Add(product);

            return Ok(product);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct([FromRoute] int id)
        {
            _products.Remove(_products.FirstOrDefault(p => p._id == id));

            return Ok();
        }

    }
}
