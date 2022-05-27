namespace NoDBPART3.Models
{
    public class ConversationService : IConversationService
    {
        private static List<Conversation> conversations = new List<Conversation>()
        {
            new Conversation() {Id = 1,
                                UsersList=new List<string> { "bob2","alice"},
                                MessagesList= new List<Message> {
                                                               new Message (1,"bob2","Hello Alice!",false),
                                                               new Message (2,"alice","Hello Bob2!, it's Alice",true) } },

            new Conversation() {Id = 2,
                                UsersList=new List<string> { "bob2","bob"},
                                MessagesList= new List<Message> {new Message (3,"bob2","Hello Bob!",false),
                                                                 new Message (4,"bob","Hello Bob2! it's bob",true) }}
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

        //GetConversation
        public Conversation GetConv(string user1, string user2)
        {
            return conversations.FirstOrDefault(x => x.UsersList.Contains(user1) &&
                                                         x.UsersList.Contains(user2));
        }
        //have to be checked
        public List<MessageGet> GetMessagesConverted(string user1, string user2)
        {
            //var user2 = UserDataService.loggedUser;
            var conv = conversations.FirstOrDefault(x => x.UsersList.Contains(user1) &&
                                                         x.UsersList.Contains(user2));
            if (conv == null)
                return null;
            List<MessageGet> msgConvertedList = convertMessage(conv.MessagesList, user2);
            return msgConvertedList;
        }

        public Message GetMsgById(string user1, string MsgId,string user2)
        {
            List<Message> messages = GetMessages(user1, user2);

            Message msg = messages.Find(x => x.Id.ToString() == MsgId);
            if (msg == null)
                return null;
            return msg;
        }

        //works
        public List<Message> GetMessages(string user1, string user2)
        {
            var conv = conversations.FirstOrDefault(x => x.UsersList.Contains(user1) &&
                                                         x.UsersList.Contains(user2));
            if (conv == null)
                return null;
            return conv.MessagesList;
        }

        //have to be checked
        public MessageGet GetMsgByIdConverted(string user1, string MsgId, string user)
        {
            List<MessageGet> messages = GetMessagesConverted(user1, user);

            MessageGet msgConverted = messages.Find(x => x.Id.ToString() == MsgId);
            if (msgConverted == null)
                return null;
            return msgConverted;
        }
        //should work
        public void DeleteMsgById(string user1, string MsgId, string user2)
        {
            List<Message> messages = GetMessages(user1, user2);
            Message message = messages.Find(msg => msg.Id.ToString() == MsgId);
            messages.Remove(message);
        }

        //should work
        public void AddMessage(string contactId, string content, string userId)
        {
            int newMsgId;
            //var user2 = UserDataService.loggedUser;
            var conv = conversations.FirstOrDefault(x => x.UsersList.Contains(contactId) &&
                                                         x.UsersList.Contains(userId));
            if (conv == null)
                return;
            if (conv.MessagesList.Count != 0)
            {
                newMsgId = conv.MessagesList.Max(msg => msg.Id) + 1;
            }
            else
            {
                newMsgId = 1;
            }
            Message newMsg = new Message(newMsgId, userId, content, true);
            conv.MessagesList.Add(newMsg);

        }



        public int nextConvId()
        {
            return (conversations.Max(x => x.Id) + 1);
        }


        //have to be tested
        //convert the messages to as we want it to be at the API when returning to the user
        public List<MessageGet> convertMessage(List<Message> messages, string userId)
        {
            List<MessageGet> messageRet = new List<MessageGet>();
            foreach (var message in messages)
            {
                if (userId == message.IdOfSender)
                {
                    messageRet.Add(new MessageGet(message.Id, message.Content, message.Created, true));
                }
                else
                {
                    messageRet.Add(new MessageGet(message.Id, message.Content, message.Created, false));
                }
            }
            return messageRet;
        }

    }
}