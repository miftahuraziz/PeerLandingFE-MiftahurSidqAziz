using Microsoft.AspNetCore.Mvc;

namespace PeerLandingFE.Controllers
{
    public class BorrowerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Home()
        {
            return View();
        }
    }
}
