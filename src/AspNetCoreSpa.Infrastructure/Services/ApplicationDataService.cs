using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using AspNetCoreSpa.Core;
using AspNetCoreSpa.Core.ViewModels;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;

namespace AspNetCoreSpa.Infrastructure.Services
{
    public class ApplicationDataService : IApplicationDataService
    {
        private readonly RequestLocalizationOptions _locOptions;
        private readonly IStringLocalizer<ApplicationDataService> _stringLocalizer;
        private readonly IMemoryCache _cache;
        public ApplicationDataService(
            IOptions<RequestLocalizationOptions> locOptions,
            IStringLocalizer<ApplicationDataService> stringLocalizer,
            IMemoryCache memoryCache
            )
        {
            _locOptions = locOptions.Value;
            //_context = context;
            //_signInManager = signInManager;
            _stringLocalizer = stringLocalizer;
            _cache = memoryCache;
        }

        public object GetApplicationData(HttpContext context, string stsAuthority)
        {
            var data = Helpers.JsonSerialize(new
            {
                Content = GetContentByCulture(context),
                CookieConsent = GetCookieConsent(context),
                Cultures = _locOptions.SupportedUICultures
                        .Select(c => new { Value = c.Name, Text = c.DisplayName, Current = (c.Name == Thread.CurrentThread.CurrentCulture.Name) })
                        .ToList(),
                StsAuthority = stsAuthority
            });

            return data;
        }

        private Dictionary<string, string> GetContentByCulture(HttpContext context)
        {
            var requestCulture = context.Features.Get<IRequestCultureFeature>();
            // Culture contains the information of the requested culture
            var culture = requestCulture.RequestCulture.Culture;

            var CACHE_KEY = $"Content-{culture.Name}";


            Dictionary<string, string> cacheEntry;

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

        private object GetCookieConsent(HttpContext httpContext)
        {
            var consentFeature = httpContext.Features.Get<ITrackingConsentFeature>();
            var showConsent = !consentFeature?.CanTrack ?? false;
            var cookieString = consentFeature?.CreateConsentCookie();
            return new { showConsent, cookieString };
        }
    }
}