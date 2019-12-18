namespace AspNetCoreSpa.Domain.Entities
{
    public class ContactUs : IEntityBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }

    }

}
