namespace NoDBPART3.Models
{
    public class ConversationService : IConversationService
    {
        private static List<Conversation> conversations = new List<Conversation>()
        {
            new Conversation() {Id = 1, UsersList=new List<string> { "bob2","alice"},
                MessagesList= new List<Message> {new Message (201,"bob2","Hello Alice!",false),
                                                 new Message (202,"alice","Hello Bob2!",true) } },

            new Conversation() {Id = 2, UsersList=new List<string> { "bob2","bob"},
                MessagesList= new List<Message> {new Message (201,"bob2","Hello Bob!",false),
                                                 new Message (202,"bob","Hello Bob2!",true) }}
        };

        public List<Conversation> GetAll()
        {
            return conversations;
        }

        public void Add(Conversation conversation)
        {
            conversations.Add(conversation);
        }

        public void Delete(int id)
        {
            conversations.Remove(Get(id));
        }

        public void Edit(int id, Conversation conversation)
        {
            var conv = conversations.Find(x => x.Id == id);
            conv.MessagesList = conversation.MessagesList;
        }

        public Conversation Get(int id)
        {
            return conversations.Find(x => x.Id == id);
        }

        public List<Message> GetMessages(string user1)
        {
            var user2 = UserDataService.loggedUser;
            var conv = conversations.FirstOrDefault(x => x.UsersList.Contains(user1) &&
                                                         x.UsersList.Contains(user2));
            if (conv == null)
                return null;
            return conv.MessagesList;
        }    
        /*
            foreach(var conversation in conversations)
            {
                int i = 0;
                foreach (var checkedId in conversation.UsersList)
                {
                    if ((checkedId == contactId) || (checkedId == loggedId))
                        i++;
                }
                if (i == 2)
                {
                    return conversation.MessagesList;
                }
            }
            return null;
            */
        
    }
}
