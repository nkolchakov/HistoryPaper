using ListingAPI.Data;
using ListingAPI.DTO;
using ListingAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ListingAPI.Services
{
    public class ListingService : IListingService
    {
        private readonly ListingDbContext _dbContext;
        public ListingService(ListingDbContext context)
        {
            _dbContext = context ?? throw new ArgumentNullException(nameof(context));
        }

        public void AddListing(NewspaperCompositeKey paperId, double price, string creatorId)
        {
            var newspaper = _dbContext.Find<Newspaper>(paperId.GetKeys());
            if (newspaper == null)
            {
                // no paper found, add it
                newspaper = _dbContext.Add(new Newspaper(paperId.SerialNumber, paperId.Issued, paperId.Edition)).Entity;
            }

            newspaper.AddListing(paperId, price, creatorId, _dbContext);
            _dbContext.SaveChanges();
        }

        public ListingDTO? GetListingById(int id)
        {
            Listing? listing = _dbContext.Listings.Find(id);
            ListingDTO? listingDto = null;
            if (listing != null)
            {
                listingDto = ListingDTO.FromModel(listing);

            }
            return listingDto;
        }

        public IEnumerable<ListingDTO> GetListingsForPaper(NewspaperCompositeKey newspaperId)
        {
            Newspaper newspaper = _dbContext.Newspapers
                .Include(n => n.Listings)
                .FirstOrDefault(n => n.SerialNumber == newspaperId.SerialNumber &&
                                        n.Issued == newspaperId.Issued &&
                                        n.Edition == newspaperId.Edition);

            if (newspaper == null)
            {
                return Enumerable.Empty<ListingDTO>();
            }

            return newspaper.Listings.Select(l => ListingDTO.FromModel(l));
        }

        public int DeleteListing(NewspaperCompositeKey paperId, int listingId)
        {
            var newspaper = _dbContext.Newspapers
                .Include(n => n.Listings.Where(l => l.Id == listingId))
                .FirstOrDefault<Newspaper>(n =>
                                    n.SerialNumber == paperId.SerialNumber &&
                                    n.Issued == paperId.Issued &&
                                    n.Edition == paperId.Edition);
            if (newspaper != null)
            {
                var listing = newspaper.Listings.FirstOrDefault();
                if (listing != null)
                {
                    newspaper.RemoveListing(listing);
                    _dbContext.SaveChanges();
                    return listingId;
                }
            }

            return -1;
        }
    }
}
