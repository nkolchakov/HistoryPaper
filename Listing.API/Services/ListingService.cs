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

            return newspaper.Listings.Select(l => new ListingDTO()
            {
                SerialNumber = l.SerialNumber,
                Price = l.Price,
                CreatorId = l.CreatorId
            });
        }

        public void RemoveListing(Listing listing)
        {
            throw new NotImplementedException();
        }
    }
}
