using ListingAPI.Models;

namespace ListingAPI.Controllers.Models
{
    public class CreateListingRequest
    {
        public NewspaperCompositeKey PaperId { get; set; }
        public double Price { get; set; }
        public string CreatorId { get; set; }
    }
}
