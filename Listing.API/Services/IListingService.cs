using Microsoft.EntityFrameworkCore;
using ListingAPI.Models;
using ListingAPI.DTO;

namespace ListingAPI.Services
{
    public interface IListingService
    {
        IEnumerable<ListingDTO> GetListingsForPaper(NewspaperCompositeKey newspaperId);
        /// <summary>
        /// Add a Listing for a Newspaper
        /// </summary>
        /// <param name="serialNumber"></param>
        /// <param name="price"></param>
        /// <param name="creatorId"></param>
        void AddListing(NewspaperCompositeKey paperId, double price, string creatorId);

        int DeleteListing(NewspaperCompositeKey paperId, int listingId);
    }
}
