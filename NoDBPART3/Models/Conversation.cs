namespace NoDBPART3.Models
{
    public class Conversation
    {
        public Conversation() { }
        public Conversation(int id, string user1, string user2)
        {
            Id = id;
            UsersList = new List<string> { user1, user2 };
            MessagesList = new List<Message>();
        }

        //List of 2 users
        public List<string> UsersList { get; set; }

        //Only contains who sent it
        public List<Message> MessagesList { get; set; }

        public int Id { get; set; }
    }
}