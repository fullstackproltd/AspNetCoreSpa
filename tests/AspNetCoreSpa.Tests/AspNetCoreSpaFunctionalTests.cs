using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace AspNetCoreSpa.Web.Tests
{
    public class AspNetCoreSpaFunctionalTests : IClassFixture<WebApplicationFactory<Startup>>
    {
        public AspNetCoreSpaFunctionalTests(WebApplicationFactory<Startup> factory)
        {
            Factory = factory;
        }

        public WebApplicationFactory<Startup> Factory { get; }


        public HttpClient Client { get; }

        [Fact]
        public async Task CanRetrieveHomePageAsync()
        {
            // Arrange
            var client = Factory.CreateClient();

            // Act
            var response = await client.GetAsync("/");

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("text/html; charset=utf-8", response.Content.Headers.ContentType.ToString());
        }
    }
}
