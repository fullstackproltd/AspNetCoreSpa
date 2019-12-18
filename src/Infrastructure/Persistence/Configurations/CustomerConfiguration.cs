using System;
using System.Collections.Generic;
using System.Text;
using AspNetCoreSpa.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {

            builder.Property(e => e.UserId).IsRequired();
            builder.Property(e => e.CreatedBy).HasMaxLength(256);
            builder.Property(e => e.UpdatedBy).HasMaxLength(256);
        }
    }
}