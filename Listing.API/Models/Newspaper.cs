using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ListingAPI.Models
{
    public class NewspaperCompositeKey
    {
        public string SerialNumber { get; set; }
        public DateTime Issued { get; set; }
        public int Edition { get; set; }

        public NewspaperCompositeKey(string serialNumber, DateTime issued, int edition)
        {
            this.SerialNumber = serialNumber;
            this.Issued = issued;
            this.Edition = edition;
        }

        public object?[]? GetKeys()
        {
            return new object[] { SerialNumber, Issued, Edition };
        }
    }

    public class Newspaper
    {
        // Composite keys
        public string SerialNumber { get; private set; }

        public DateTime Issued { get; private set; }

        public int Edition { get; private set; }

        //Relations
        private HashSet<Listing> _listings;
        public IEnumerable<Listing> Listings => _listings?.ToList();

        private Newspaper() { }

        internal Newspaper(string serialNumber, DateTime issued, int edition)
        {
            if (string.IsNullOrEmpty(serialNumber))
            {
                throw new ArgumentNullException(nameof(serialNumber));
            }
            SerialNumber = serialNumber;
            Issued = issued;
            Edition = edition;
            _listings = new HashSet<Listing>();
        }

        internal NewspaperCompositeKey GetKeys()
        {
            return new NewspaperCompositeKey(SerialNumber, Issued, Edition);
        }

        internal void AddListing(NewspaperCompositeKey paperKey, double price, string creatorId, DbContext dbContext)
        {
            if (dbContext == null)
            {
                throw new ArgumentNullException(nameof(dbContext));
            }

            if (_listings != null)
            {
                // Initaly should not be loaded, because we use the Newspaper without Include(n => n.Listings)
                // Add the listing directly w/ the FK. More efficient.
                // saw the pattern here https://www.thereformedprogrammer.net/creating-domain-driven-design-entity-classes-with-entity-framework-core/
                _listings.Add(new Listing(price, creatorId));
            }
            else if (dbContext.Entry(this).IsKeySet)
            {
                // if book exists, the setted foreign key below should map the objects
                dbContext.Add(new Listing(price, creatorId, paperKey));
            }
            else
            {
                throw new Exception("Something went wrong !");
            }
        }

        public void RemoveListing(Listing listing)
        {
            _listings.Remove(listing);
        }
    }
}
