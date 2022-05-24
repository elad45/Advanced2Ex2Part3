namespace NoDBPART3.Models
{
    //this is the message we return to the user
    public class MessageGet
    {
        public MessageGet(int id,string content,DateTime date,bool sent)
        {
            Id = id;
            Content = content;
            Created = date;
            Sent = sent;
        }

        public int Id { get; set; }
        
        public string Content { get; set; }

        public DateTime Created { get; set; }

        public bool Sent { get; set; }

        }
 }
