using System.ComponentModel.DataAnnotations;

namespace PeerLandingFE.DTO.Req
{
    public class ReqLoanDto
    {
        public string BorrowerId { get; set; }
        public decimal Amount { get; set; }
    }
}
