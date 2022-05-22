using Microsoft.AspNetCore.Mvc;
using NoDBPART3.Models;
using System.Web;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NoDBPART3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET: api/<UsersController>
        [HttpGet]
        //returns user nickname
        public IActionResult Get()
        {
            string loggedUserId = Uri.UnescapeDataString(HttpUtility.ParseQueryString(Request.QueryString.ToString()).Get("user"));
            UserDataService service = new UserDataService();
            User u = service.Get(loggedUserId);
            if (u == null)
                return NotFound();
            return Ok(u.Name);
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsersByNick()
        {
            UserDataService service = new UserDataService();
            List<User> users = service.GetAll();
            if (users == null)
            {
                return NotFound();
            }
            List<string> nickNames = new List<string>();
            foreach (User user in users)
            {
                nickNames.Add(user.Name);
            }
            return Ok(nickNames);
        }

    }
}
