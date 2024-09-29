using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace PeerLandingFE.Controllers.api
{
    public class ApiFundingController : Controller
    {
        private readonly HttpClient _httpClient;

        public ApiFundingController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFundings(string lenderId)
        {
            if (string.IsNullOrEmpty(lenderId))
            {
                return BadRequest("Lender id cannot be null or empty");
            }
            //var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            //_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await _httpClient.GetAsync($"https://localhost:7205/rest/v1/funding/GetAllFundings/{lenderId}");

            if (response.IsSuccessStatusCode)
            {
                var responData = await response.Content.ReadAsStringAsync();
                return Ok(responData);
            }
            else
            {
                return BadRequest("Get All Fundings Failed");
            }
        }
    }
}
