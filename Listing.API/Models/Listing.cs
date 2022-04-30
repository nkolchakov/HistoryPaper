using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ListingAPI.Models
{
    public class Listing
    {
        public int Id { get; private set; }
        public double Price { get; private set; }
        public string CreatorId { get; private set; }

        // Relations
        // setup composite key with foreign key relations
        // https://stackoverflow.com/questions/54441615/foreign-key-with-composite-key-in-ef-core
        public string SerialNumber { get; private set; }
        public DateTime Issued { get; private set; }
        public int Edition { get; private set; }

        private Listing() { }

        internal Listing(double price, string creatorId, NewspaperCompositeKey paperKey = null)
        {
            if (string.IsNullOrEmpty(creatorId))
            {
                throw new ArgumentNullException(nameof(creatorId));
            }
            if (price < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(price));
            }

            // if null, should be set by relation
            if (paperKey != null)
            {
                SerialNumber = paperKey.SerialNumber;
                Issued = paperKey.Issued;
                Edition = paperKey.Edition;
            }


            Price = price;
            CreatorId = creatorId;
        }

    }
}
