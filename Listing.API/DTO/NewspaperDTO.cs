namespace ListingAPI.DTO
{
    public class NewspaperDTO
    {
        public string SerialNumber { get; set; }

        public DateTime Issued { get; set; }

        IEnumerable<ListingDTO> Listings { get; set; }
    }
}
