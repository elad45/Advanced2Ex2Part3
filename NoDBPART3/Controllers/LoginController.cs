using Microsoft.AspNetCore.Mvc;
using NoDBPART3.Models;
using NoDBPART3.Models.Request;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NoDBPART3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        // POST api/<LoginController>
        [HttpPost]
        public IActionResult Post([FromBody] Login receivedUser)
        {
            UserDataService userService = new UserDataService();
            User currentUser = userService.Get(receivedUser.Id);
            if (currentUser == null)
                return StatusCode(404);
            else if (currentUser.Password == receivedUser.Password)
            {
                //HttpContext.Session.SetString("LoggedUserID", currentUser.Id);
                return StatusCode(204);
            }
            else
            {
                //400
                return StatusCode(400);
            }
        }
    }
}