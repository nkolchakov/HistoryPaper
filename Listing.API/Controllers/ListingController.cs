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

        [HttpDelete("{serialNumber}/{issued}/{edition}/{listingId}")]
        public IActionResult DeleteListing(string serialNumber, Nullable<DateTime> issued, int edition, int listingId)
        {
            IActionResult result;
            if (string.IsNullOrWhiteSpace(serialNumber))
            {
                result = BadRequest(nameof(serialNumber));
            }
            else if (!issued.HasValue)
            {
                result = BadRequest(issued);
            }
            else if (edition < 1)
            {
                result = BadRequest("invalid paper edition");
            }
            else if (listingId < 1)
            {
                result = BadRequest("invalid listing id");
            }
            else
            {
                var paperCompositeId = new NewspaperCompositeKey(serialNumber, issued.Value, edition);
                try
                {
                    int id = _listingService.DeleteListing(paperCompositeId, listingId);
                    result = Ok(id);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }

            return result;
        }
    }
}
