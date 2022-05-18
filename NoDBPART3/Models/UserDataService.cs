namespace NoDBPART3.Models
{
    public class UserDataService : IUserDataService
    {
        public static string loggedUser = "bob2";

        private static List<User> users = new List<User>()
        {
            new User() {Id = "bob", Name="Bobby", Password= "123" },
            new User() {Id = "alice", Name="Alicia", Password= "1234" },
            new User(){Id = "bob2", Name="Bobby3", Password= "1235" }
            
        };

        //adds to both users the contact
        public static void initContacts()
        {
            var conversationService = new ConversationService();
            var allConvs = conversationService.GetAll();
            foreach (var conversation in allConvs)
            {
                foreach (var userId in conversation.UsersList)
                {
                    var user = users.Find(x=> x.Id == userId);
                    var secondUserId = conversation.UsersList.Find(x => x != userId);
                    var secondUser = users.Find(x => x.Id == secondUserId);
                    var contact = new Contact(secondUser.Id, secondUser.Name, "http://localhost:7270");
                    if (!user.ContactsList.Any(contact => contact.Id == secondUser.Id))
                        user.AddContact(contact);

                    contact = new Contact(user.Id, user.Name, "http://localhost:7260");
                    if (!secondUser.ContactsList.Any(contact => contact.Id == user.Id))
                        secondUser.AddContact(contact);
                }
            }
        }

        

          public List<User> GetAll()
          {
            return users;
          }

        public User Get(string id)
        {
            User u = users.Find(x => x.Id == id);
            if (u == null)
                return null;
            return u;
        }


        public void Edit(string id, User user)
        {
            User u = Get(id);
            u.Name = user.Name;
            u.Password = user.Password;

        }
        public void Add(User user)
        {
            users.Add(user);
        }

        
        public void Delete(string id)
        {
            users.Remove(Get(id));
        }
        
    }
}
