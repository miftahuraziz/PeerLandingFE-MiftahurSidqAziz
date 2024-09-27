using Microsoft.AspNetCore.Mvc;
using System.Drawing.Printing;
using System.Net.Http.Headers;

namespace PeerLandingFE.Controllers.api
{
    public class ApiMstUserController : Controller
    {
        private readonly HttpClient _httpClient;

        public ApiMstUserController(HttpClient httpClient)
        {
            _httpClient = httpClient;   
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await _httpClient.GetAsync("https://localhost:7205/rest/v1/user/GetAllUsers");

            if (response.IsSuccessStatusCode)
            {
                var responData = await response.Content.ReadAsStringAsync();
                return Ok(responData);
            }
            else
            {
                return BadRequest("Get All Users Failed");
            }
        }
    }
}
