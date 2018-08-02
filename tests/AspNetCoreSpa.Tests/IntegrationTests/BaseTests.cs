using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace AspNetCoreSpa.Web.Tests
{
    #region snippet1
    public class BasicTests : IClassFixture<WebApplicationFactory<AspNetCoreSpa.Web.Startup>>
    {
        private readonly WebApplicationFactory<AspNetCoreSpa.Web.Startup> _factory;

        public BasicTests(WebApplicationFactory<AspNetCoreSpa.Web.Startup> factory)
        {
            _factory = factory;
        }

        [Theory]
        [InlineData("/")]
        public async Task Get_EndpointsReturnSuccessAndCorrectContentType(string url)
        {
            // Arrange
            var client = _factory.CreateClient();

            // Act
            var response = await client.GetAsync(url);

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("text/html; charset=utf-8", response.Content.Headers.ContentType.ToString());

        }
        #endregion
    }
}
