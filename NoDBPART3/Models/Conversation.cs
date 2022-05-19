namespace NoDBPART3.Models
{
    public class Conversation
    {
        public Conversation() { }
        public Conversation(int id,string user1, string user2)
        {
            Id = id;
            // the talking couple
            UsersList = new List<string> { user1, user2 };
            MessagesList = new List<Message>();
        }

        //List of 2 users
        public List<string> UsersList { get; set; }

        // messages of the conversation
        public List<Message> MessagesList { get; set; }

        public int Id { get; set; }
    }
}
