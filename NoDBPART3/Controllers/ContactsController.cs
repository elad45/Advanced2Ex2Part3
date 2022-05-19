using Microsoft.AspNetCore.Mvc;
using NoDBPART3.Models;
using NoDBPART3.Models.Request;

// return Ok(WHatever) - means status code 200
// return StatusCode(201,WHATEVER I WANT TO RETURN)
namespace NoDBPART3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private IUserDataService service;
        private IConversationService conversationService;
        public ContactsController()
        {
            service = new UserDataService();
            conversationService = new ConversationService();
        }
        // GET: api/<ContactsController>
        //works
        [HttpGet]
        public IActionResult Get()
        {
            User u = service.Get(UserDataService.loggedUser);
            if (u == null)
                return NotFound();
            return Ok(u.ContactsList);
        }

        // GET api/<ContactsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            User u = service.Get(UserDataService.loggedUser);
            if (u == null)
                return NotFound();
            Contact c = u.ContactsList.Find(x=> x.Id == id);
            if (c == null)
                return NotFound();
            return Ok(c);
        }

        // POST api/<ContactsController>
        [HttpPost]
        public IActionResult Post( [FromBody] AddContactPost request)
        {
            User user = service.Get(request.User);
            if (user == null)
            {
                return NotFound();
            }
            Contact c = new Contact(request.Id, request.Name, request.Server);
            user.AddContact(c);
            //trying to add constructor
            //Conversation conv = new Conversation(conversationService.NextId(),request.Id);
            //conversationService.Add(conv);
            //
            return StatusCode(201);
        }

        // PUT api/<ContactsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] EditContactPut request)
        {
            User user = service.Get(UserDataService.loggedUser);
            if (user == null)
            {
                return NotFound();
            }
            Contact c = user.ContactsList.Find(x => x.Id == id);
            if (c == null)
            {
                return NotFound();
            }
            c.Server = request.Server;
            c.Name = request.Name;
            return StatusCode(204);
        }

        // DELETE api/<ContactsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            User user = service.Get(UserDataService.loggedUser);
            if (user == null)
            {
                return NotFound();
            }
            Contact c = user.ContactsList.Find(x => x.Id == id);
            if ( c == null)
            {
                return NotFound();
            }
            user.ContactsList.Remove(c);
            return StatusCode(204);
        }

        //Messages return by id
        [HttpGet("{id}/messages")]
        public IActionResult GetMessages(string id)
        {
            User user = service.Get(UserDataService.loggedUser);
            if (user == null)
            {
                return NotFound();
            }
            Contact c = user.ContactsList.Find(x => x.Id == id);
            if (c == null)
            {
                return NotFound();
            }

            List<Message> messages = conversationService.GetMessages(id);
            return Ok(messages);
        }
        /*
        [HttpPost("{id}/messages")]
        public IActionResult AddMessage (string id, [FromBody]AddMessage content)
        {
            User user = service.Get(UserDataService.loggedUser);
            if (user == null)
            {
                return NotFound();
            }
            Contact c = user.ContactsList.Find(x => x.Id == id);
            if (c == null)
            {
                return NotFound();
            }

            List<Message> messages = conversationService.GetMessages(id);
            messages.Add(new Message())

        }
        */
    }
}

