using ListingAPI.Controllers.Models;
using ListingAPI.Models;
using ListingAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ListingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly IListingService _listingService;

        public ListingController(IListingService listingService)
        {
            this._listingService = listingService ?? throw new ArgumentNullException(nameof(listingService));
        }

        [HttpGet("{serialNumber}/{issued}/{edition}")]
        public IActionResult GetListingsForSn(string serialNumber, DateTime issued, int edition)
        {
            if (string.IsNullOrWhiteSpace(serialNumber))
            {
                return BadRequest(nameof(serialNumber));
            }

            var listings = _listingService.GetListingsForPaper(new NewspaperCompositeKey(serialNumber, issued, edition));
            return Ok(listings);
        }

        [HttpPost("")]
        public IActionResult CreateListing([FromBody] CreateListingRequest parameters)
        {
            _listingService.AddListing(parameters.PaperId, parameters.Price, parameters.CreatorId);
            return Ok();
        }
    }
}
