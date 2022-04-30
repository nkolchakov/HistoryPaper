using ListingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ListingAPI.Data
{
    public class ListingDbContext : DbContext
    {
        internal DbSet<Newspaper> Newspapers { get; set; }
        internal DbSet<Listing> Listings { get; set; }

        public ListingDbContext(DbContextOptions<ListingDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Newspaper>(n =>
            {

                n.HasKey(x => new { x.SerialNumber, x.Issued, x.Edition });
                n.HasMany(x => x.Listings)
                        .WithOne()
                        .HasForeignKey(l => new { l.SerialNumber, l.Issued, l.Edition });
            });

            modelBuilder.Entity<Newspaper>().Metadata
                        .FindNavigation(nameof(Newspaper.Listings))?
                        .SetPropertyAccessMode(PropertyAccessMode.Field);
        }
    }
}
