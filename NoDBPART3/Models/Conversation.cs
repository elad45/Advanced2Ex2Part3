namespace NoDBPART3.Models
{
    public class Conversation
    {


        //List of 2 two users
        public List<string> UsersList { get; set; }

        //Only contains who sent it
        public List<Message> MessagesList { get; set; }

        public int Id { get; set; }


    }
}
