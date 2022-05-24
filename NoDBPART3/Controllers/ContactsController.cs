using Microsoft.AspNetCore.Mvc;
using NoDBPART3.Models;
using NoDBPART3.Models.Request;
using System.Web;

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
        // returns all the contacts of the current user
        public IActionResult Get()
        {
            //string xyz = Uri.UnescapeDataString(HttpUtility.ParseQueryString(Request.QueryString.ToString()).Get("user"));
            //User u = service.Get(xyz);
            User u = service.Get(UserDataService.loggedUser);
            if (u == null)
                return NotFound();
            List<ContactFixed> contacts = new List<ContactFixed>();
            foreach(Contact contact in u.ContactsList)
            {
                ContactFixed newContact = new ContactFixed(contact.Id, contact.Name, contact.Server);
                newContact.Last = contact.Last;
                newContact.Lastdate = TimeAgo(contact.Lastdate);
                contacts.Add(newContact);

            }
            return Ok(contacts);
        }

        // POST api/<ContactsController>
        [HttpPost]
        // creates a new contact for the current user
        public IActionResult Post([FromBody] AddContactPost request)
        {
            User user = service.Get(request.User);
            if (user == null)
            {
                return NotFound();
            }
            Contact c = new Contact(request.Id, request.Name, request.Server);
            user.AddContact(c);
            //trying to add conv ------ have to be tested ----
            Conversation conv = new Conversation(conversationService.nextConvId(), request.Id, UserDataService.loggedUser);
            conversationService.Add(conv);
            //
            return StatusCode(201);
        }
        // GET api/<ContactsController>/5
        [HttpGet("{id}")]
        // returns data about contact id = {id}
        public IActionResult Get(string id)
        {

            //has to be changed somehow to the user who sent the request
            User u = service.Get(UserDataService.loggedUser);
            if (u == null)
                return NotFound();
            Contact c = u.ContactsList.Find(x => x.Id == id);
            if (c == null)
                return NotFound();
            return Ok(c);
        }

        // PUT api/<ContactsController>/5
        [HttpPut("{id}")]
        // updates data about contact id = {id}
        public IActionResult Put(string id, [FromBody] EditContactPut request)
        {
            //string userId = service.Get(request.UserId);
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
        // deletes data about contact id = {id}
        public IActionResult Delete(string id)
        {
            //has to be changed to the user who made the request somehow
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
            user.ContactsList.Remove(c);
            return StatusCode(204);
        }

        [HttpGet("{id}/messages")]
        // returns all the messages received/sent by the current logged user
        public IActionResult GetMessages(string id)
        {
            //has to be changed to the user who made the request somehow
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

            List<MessageGet> messagesConverted = conversationService.GetMessagesConverted(id);
            return Ok(messagesConverted);
        }

        //works
        [HttpPost("{id}/messages")]
        // creates a new message between the contact and the logged user
        public IActionResult AddMessage(string id, [FromBody] AddMessage msg)
        {

            //User user = service.Get(msg.UserId);
            User user = service.Get(msg.UserId);
            if (user == null)
            {
                return NotFound();
            }
            Contact c = user.ContactsList.Find(x => x.Id == id);
            if (c == null)
            {
                return NotFound();
            }

            //Message newMsg = new Message(5, "notimportant", msg.Content, true);
            conversationService.AddMessage(id, msg.Content, msg.UserId);
            c.Last = msg.Content;
            //var timeAgoService = new TimeAgoService(DateTime.Now);
            c.Lastdate = DateTime.Now;
            return StatusCode(201);
        }

        [HttpGet("{id}/messages/{id2}")]
        //check if works
        //id is contactId and id2 is msgID
        // returns a message of ID = {id2}, of the contact that has id = {id}
        public IActionResult GetMsgById(string id, string id2)
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
            //List<Message> messages = conversationService.GetMessages(id);
            MessageGet msgConverted = conversationService.GetMsgByIdConverted(id, id2);
            if (msgConverted == null)
                return NotFound();
            return Ok(msgConverted);
        }

        [HttpPut("{id}/messages/{id2}")]
        // edits a message of ID = {id2}, of the contact that has id = {id}
        public IActionResult PutMsgById(string id, string id2, [FromBody] PutMsgById msg)
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
            Message msgToChange = conversationService.GetMsgById(id, id2);
            if (msg == null)
                return NotFound();
            msgToChange.Content = msg.Content;
            return StatusCode(204);
        }

        [HttpDelete("{id}/messages/{id2}")]
        // deletes a message of ID = {id2}, of the contact that has id = {id}
        public IActionResult DeleteMsgById(string id, string id2)
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
            conversationService.DeleteMsgById(id, id2);
            return StatusCode(204);
        }
        private static string TimeAgo(DateTime time)
        {
            string result = string.Empty;
            var timeSpan = DateTime.Now.Subtract(time);

            if (timeSpan <= TimeSpan.FromSeconds(60))
            {
                result = string.Format("{0}s ago", timeSpan.Seconds);
            }
            else if (timeSpan <= TimeSpan.FromMinutes(60))
            {
                result = String.Format("{0}m ago", timeSpan.Minutes);
            }
            else if (timeSpan <= TimeSpan.FromHours(24))
            {
                result = String.Format("{0}h ago", timeSpan.Hours);
            }
            else if (timeSpan <= TimeSpan.FromDays(30))
            {
                result = String.Format("{0}d ago", timeSpan.Days);
            }
            else if (timeSpan <= TimeSpan.FromDays(365))
            {
                result = String.Format("{0}m ago", timeSpan.Days / 30);
            }
            else
            {
                result = timeSpan.Days > 365 ?
                    String.Format("about {0}y ago", timeSpan.Days / 365) :
                    "about a year ago";
            }
            return result;
        }
    }
}
