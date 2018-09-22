using Microsoft.AspNetCore.Mvc.Testing;
using System.Threading.Tasks;
using Xunit;

namespace AspNetCoreSpa.Web.Integration
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
            var contentType = response.Content.Headers.ContentType.ToString();
            Assert.Equal("text/html; charset=UTF-8", contentType);
        }
        #endregion
    }
}
