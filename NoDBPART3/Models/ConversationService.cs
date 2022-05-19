﻿namespace NoDBPART3.Models
{
    public class ConversationService : IConversationService
    {
        private static List<Conversation> conversations = new List<Conversation>()
        {
            new Conversation() {Id = 1, UsersList=new List<string> { "bob2","alice"},
                MessagesList= new List<Message> {new Message (1,"bob2","Hello Alice!",false),
                                                 new Message (2,"alice","Hello Bob2!",true) } },

            new Conversation() {Id = 2, UsersList=new List<string> { "bob2","bob"},
                MessagesList= new List<Message> {new Message (3,"bob2","Hello Bob!",false),
                                                 new Message (4,"bob","Hello Bob2!",true) }}
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
        
        public Message GetMessageById(string user1,string MsgId)
        {
            List<Message> messages = GetMessages(user1);
  
            Message msg =  messages.Find(x => x.Id.ToString() == MsgId);
            if (msg == null)
                return null;
            return msg;
        }

        public void AddMessage(string user1,Message msg)
        {
            var user2 = UserDataService.loggedUser;
            var conv = conversations.FirstOrDefault(x => x.UsersList.Contains(user1) &&
                                                         x.UsersList.Contains(user2));
            if (conv == null)
                return;
            conv.MessagesList.Add(msg);
        }
        public int nextId ()
        {
            return (conversations.Max (x => x.Id)+1);
        }
        
    }
}
