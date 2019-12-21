using System.Threading.Tasks;
using AspNetCoreSpa.Application.Features.Products.Commands.CreateProduct;
using AspNetCoreSpa.Application.Features.Products.Commands.DeleteProduct;
using AspNetCoreSpa.Application.Features.Products.Commands.UpdateProduct;
using AspNetCoreSpa.Application.Features.Products.Queries.GetProductDetail;
using AspNetCoreSpa.Application.Features.Products.Queries.GetProductsFile;
using AspNetCoreSpa.Application.Features.Products.Queries.GetProductsList;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace AspNetCoreSpa.Web.Controllers
{
    [Authorize]
    public class ProductsController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<ProductsListVm>> GetAll()
        {
            var vm = await Mediator.Send(new GetProductsListQuery());

            return base.Ok(vm);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ProductDetailVm>> Get(int id)
        {
            var vm = await Mediator.Send(new GetProductDetailQuery { Id = id });

            return base.Ok(vm);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create([FromBody] CreateProductCommand command)
        {
            var productId = await Mediator.Send(command);

            return Ok(productId);
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Update([FromBody] UpdateProductCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteProductCommand { Id = id });

            return NoContent();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<FileResult> Download()
        {
            var vm = await Mediator.Send(new GetProductsFileQuery());

            return File(vm.Content, vm.ContentType, vm.FileName);
        }
    }
}