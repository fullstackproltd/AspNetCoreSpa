
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreSpa.Server.Entities
{
    public class Product
    {
        [Key]
        public int _id { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public string[] Tags { get; set; }
        public string ReleaseDate { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public double StarRating { get; set; }
        public string ImageUrl { get; set; }
    }

}
