namespace NoDBPART3.Models
{
    public class Message
    {
        public Message(int id, string idOfSender,string content,bool sent)
        {
            Id = id;
          //  IdOfSender = idOfSender;
            Content = content;
            Created = DateTime.Now;
            Sent = sent;
        }

        public int Id { get; set; }

        //public string IdOfSender { get; set; }

        public string Content { get; set; }

        public DateTime Created { get; set; }

        public bool Sent { get; set; }
    }
}
