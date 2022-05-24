using Microsoft.AspNetCore.Mvc;
using NoDBPART3.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NoDBPART3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] User newUser)
        {
            UserDataService userService = new UserDataService();
            User currentUser = userService.Get(newUser.Id);
            
            
            
            //id already exists
            if (currentUser != null)
                return StatusCode(404);
            //nickname already exists
            //else if (userService.GetAll().Find(x => x.Name == newUser.Name) != null)
            //    return StatusCode(405);
            else
            {
                //add new user
                User user = new User(newUser.Id, newUser.Name, newUser.Password);
                userService.Add(user);
                return StatusCode(204);
            }
        }
    }
}
