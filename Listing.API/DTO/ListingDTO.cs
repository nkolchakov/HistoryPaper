using ListingAPI.Models;

namespace ListingAPI.DTO
{
    public class ListingDTO
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public string CreatorId { get; set; }
        public string SerialNumber { get; set; }
        public string? Description { get; set; }


        public static ListingDTO FromModel(Listing listing)
        {
            return new ListingDTO()
            {
                Id = listing.Id,
                CreatorId = listing.CreatorId,
                Price = listing.Price,
                SerialNumber = listing.SerialNumber,
                Description = listing.Description
            };
        }
    }
}
