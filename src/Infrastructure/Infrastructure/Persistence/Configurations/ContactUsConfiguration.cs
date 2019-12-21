using AspNetCoreSpa.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AspNetCoreSpa.Infrastructure.Persistence.Configurations
{
    public class ContactUsConfiguration : IEntityTypeConfiguration<ContactUs>
    {
        public void Configure(EntityTypeBuilder<ContactUs> builder)
        {

            builder.Property(e => e.Name).IsRequired().HasMaxLength(255);
            builder.Property(e => e.Email).IsRequired().HasMaxLength(255);
            builder.Property(e => e.Message).IsRequired().HasMaxLength(1024);
        }
    }
}