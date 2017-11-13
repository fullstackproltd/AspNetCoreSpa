using System.Linq;
using AspNetCoreSpa.Server.Services;
using AspNetCoreSpa.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class ContentController : BaseController
    {

        private readonly IContentService _contentService;
        public ContentController(IContentService contentService)
        {
            _contentService = contentService;
        }

        [HttpGet]
        public IActionResult Get(string lang)
        {
            return Ok(_contentService.GetContent(lang));
        }

    }
}
