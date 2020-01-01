using System.Threading.Tasks;
using AspNetCoreSpa.Web;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace AspNetCoreSpa.Integration.Tests.IntegrationTests
{
    #region snippet1
    public class BasicTests : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public BasicTests(WebApplicationFactory<Startup> factory)
        {
            _factory = factory;
        }

        [Theory(Skip = "TODO: enable npm script in Web Startup and remove skip")]
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
