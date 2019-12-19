using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using AspNetCoreSpa.Application.Abstractions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace AspNetCoreSpa.Web.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly RequestLocalizationOptions _locOptions;
        private readonly IStringLocalizer<ApplicationService> _stringLocalizer;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IMemoryCache _cache;
        public ApplicationService(
            IOptions<RequestLocalizationOptions> locOptions,
            IStringLocalizer<ApplicationService> stringLocalizer,
            IHttpContextAccessor contextAccessor,
            IMemoryCache memoryCache)
        {
            _locOptions = locOptions.Value;
            _stringLocalizer = stringLocalizer;
            _contextAccessor = contextAccessor;
            _cache = memoryCache;
        }

        public object GetApplicationData()
        {
            var data = JsonConvert.SerializeObject(new
            {
                Content =  new Dictionary<string, string>(), //GetContentByCulture(),
                CookieConsent = GetCookieConsent(),
                Cultures = _locOptions.SupportedUICultures
                        .Select(c => new
                        {
                            Value = c.Name,
                            Text = c.DisplayName,
                            Current = (c.Name == Thread.CurrentThread.CurrentCulture.Name)
                        })
                        .ToList(),
            },
                new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    StringEscapeHandling = StringEscapeHandling.EscapeHtml,
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });

            return data;
        }

        private Dictionary<string, string> GetContentByCulture()
        {
            var requestCulture = _contextAccessor.HttpContext.Features.Get<IRequestCultureFeature>();
            // Culture contains the information of the requested culture
            var culture = requestCulture.RequestCulture.Culture;

            var CACHE_KEY = $"Content-{culture.Name}";


            Dictionary<string, string> cacheEntry;

            // Look for cache key.
            if (!_cache.TryGetValue(CACHE_KEY, out cacheEntry))
            {
                // Key not in cache, so get & set data.
                var culturalContent = _stringLocalizer.GetAllStrings()
                                        .Select(c => new
                                        {
                                            Key = c.Name,
                                            Value = c.Value
                                        })
                                        .ToDictionary(x => x.Key, x => x.Value);
                cacheEntry = culturalContent;

                // Set cache options.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromMinutes(30));

                // Save data in cache.
                _cache.Set(CACHE_KEY, cacheEntry, cacheEntryOptions);
            }

            return cacheEntry;
        }

        private object GetCookieConsent()
        {
            var consentFeature = _contextAccessor.HttpContext.Features.Get<ITrackingConsentFeature>();
            var showConsent = !consentFeature?.CanTrack ?? false;
            var cookieString = consentFeature?.CreateConsentCookie();
            return new { showConsent, cookieString };
        }
    }
}