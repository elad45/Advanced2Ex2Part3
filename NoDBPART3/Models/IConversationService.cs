namespace NoDBPART3.Models
{
    public interface IConversationService
    {
        // gets all the conversations between everyone in the site
        public List<Conversation> GetAll();

        //gets the id of a certain conversation
        public Conversation Get(int id);

        // adds a conversation to our list
        public void Add(Conversation conversation);

        // edits a certain conversation
        public void Edit(int id, Conversation conversation);

        // deletes a certain conversation

        public void Delete(int id);

        // gets all the messages of a certain conversation

        public List<Message> GetMessages(string user1);

        // easy to understand
        public Message GetMsgById(string user1, string MsgId);

        // easy to understand

        public void DeleteMsgById(string user1, string MsgId);

        // creating the next id

        public int nextConvId();

        // adds a message to the conversation
        public void AddMessage(string id, string content);
    }
}
