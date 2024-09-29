using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using PeerLandingFE.DTO.Req;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace PeerLandingFE.Controllers.api
{
    public class ApiMstLoanController : Controller
    {
        private readonly HttpClient _httpClient;
        public ApiMstLoanController(HttpClient httpClient)
        {
           _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLoans()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await _httpClient.GetAsync("https://localhost:7205/rest/v1/loan/GetAllLoans");

            if (response.IsSuccessStatusCode)
            {
                var responData = await response.Content.ReadAsStringAsync();
                return Ok(responData);
            }
            else
            {
                return BadRequest("Get All Loans Failed");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetLoanById(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Loan id cannot be null or empty");
            }
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await _httpClient.GetAsync($"https://localhost:7205/rest/v1/loan/GetById/{id}");

            if (response.IsSuccessStatusCode)
            {
                var responData = await response.Content.ReadAsStringAsync();
                return Ok(responData);
            }
            else
            {
                return BadRequest("Fetch Loan Failed");
            }
        }

        /*[HttpPut]
        public async Task<IActionResult> UpdateLoan(string id, [FromBody] ReqUpdateLoanDto reqUpdateLoanDto)
        {
            if (id == null)
            {
                return BadRequest("Invalid loan data");
            }

            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var json = JsonSerializer.Serialize(reqUpdateLoanDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PutAsync($"https://localhost:7205/rest/v1/loan/UpdateLoanById/{id}", content);

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                return Ok(jsonData);
            }
            else
            {
                return BadRequest("Fetch loan Failed");
            }
        }*/

        [HttpPost]
        public async Task<IActionResult> FundingLoan([FromBody] ReqFundingLoanDto reqFundingLoanDto)
        {
            if (reqFundingLoanDto == null)
            {
                return BadRequest("Invalid loan data");
            }

            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var json = JsonSerializer.Serialize(reqFundingLoanDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("https://localhost:7205/rest/v1/funding/FundingLoan", content);

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                return Ok(jsonData);
            }
            else
            {
                return BadRequest("Fetch loan Failed");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetLoans(string borrowerId)
        {
            if (string.IsNullOrEmpty(borrowerId))
            {
                return BadRequest("Borrower id cannot be null or empty");
            }
            //var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            //_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await _httpClient.GetAsync($"https://localhost:7205/rest/v1/loan/GetLoanByBorrowerId/{borrowerId}");
            Console.WriteLine(response);
            if (response.IsSuccessStatusCode)
            {
                var responData = await response.Content.ReadAsStringAsync();
                return Ok(responData);
            }
            else
            {
                return BadRequest("Get All Loans Failed");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateLoan([FromBody] ReqLoanDto reqLoanDto)
        {
            var json = JsonSerializer.Serialize(reqLoanDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://localhost:7205/rest/v1/loan/NewLoan", content);

            if (response.IsSuccessStatusCode)
            {
                var responData = await response.Content.ReadAsStringAsync();
                return Ok(responData);
            }
            else
            {
                return BadRequest("Create Loan Failed");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetLoansByStatus(string status)
        {
            //var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            //_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await _httpClient.GetAsync($"https://localhost:7205/rest/v1/loan/GetLoans?status={status}");
            Console.WriteLine(response);
            if (response.IsSuccessStatusCode)
            {
                var responData = await response.Content.ReadAsStringAsync();
                return Ok(responData);
            }
            else
            {
                return BadRequest("Get All Loans Failed");
            }
        }
    }
}
