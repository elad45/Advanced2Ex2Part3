namespace NoDBPART3.Models
{
    public interface IConversationService
    {
        public List<Conversation> GetAll();

        public Conversation Get(int id);

        public void Add(Conversation conversation);

        public void Edit(int id, Conversation conversation);

        public void Delete(int id);

        public List<Message> GetMessages(string user1);

        public Message GetMsgById(string user1, string MsgId);

        public void DeleteMsgById(string user1, string MsgId);

        public int nextConvId();
        public void AddMessage(string user, string contact, string content);
    }
}
