using System;
using System.Linq;
using AspNetCoreSpa.Server.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Localization;

namespace AspNetCoreSpa.Server.Controllers.api
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class ContentController : BaseController
    {
        private readonly IStringLocalizer<ContentController> _stringLocalizer;
        private readonly IMemoryCache _cache;

        public ContentController(IStringLocalizer<ContentController> stringLocalizer, IMemoryCache memoryCache)
        {
            _stringLocalizer = stringLocalizer;
            _cache = memoryCache;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(GetContentByCulture());
        }

        [HttpGet("cultures")]
        public IActionResult GetCultures()
        {
            return Ok();
        }

        private string GetContentByCulture()
        {
            var requestCulture = HttpContext.Features.Get<IRequestCultureFeature>();
            // Culture contains the information of the requested culture
            var culture = requestCulture.RequestCulture.Culture;

            var CACHE_KEY = $"Content-{culture.Name}";


            string cacheEntry;

            // Look for cache key.
            if (!_cache.TryGetValue(CACHE_KEY, out cacheEntry))
            {
                // Key not in cache, so get & set data.
                var culturalContent = _stringLocalizer.WithCulture(culture)
                                        .GetAllStrings()
                                        .Select(c => new ContentVm
                                        {
                                            Key = c.Name,
                                            Value = c.Value
                                        })
                                        .ToDictionary(x => x.Key, x => x.Value);
                cacheEntry = Helpers.JsonSerialize(culturalContent);

                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromMinutes(30));

                // Save data in cache.
                _cache.Set(CACHE_KEY, cacheEntry, cacheEntryOptions);
            }

            return cacheEntry;
        }
    }
}