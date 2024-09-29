namespace PeerLandingFE.DTO.Res
{
    public class ResFundingsDto
    {
        public string BorrowerName { get; set; }
        public string LenderName { get; set; }
        public decimal Amount { get; set; }
        public DateTime FundedAt { get; set; }
    }
}
