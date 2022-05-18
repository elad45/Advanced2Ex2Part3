﻿namespace NoDBPART3.Models
{
    public class Contact
    {
        public Contact(/*string userId*/ string id, /*string contactId*/string name, string server)
        {
            //UserId = userId;
            Id = id;
            //ContactId = contactId;
            Name = name;
            Server = server;
            Last = null;
            Lastdate = null;
        }

    //    public string UserId { get; set; }
        //this is contact id
        public string Id { get; set; }

//        public string ContactId { get; set; }

        public string Name { get; set; }

        public string Server { get; set; }

        public string Last { get; set; }

        public DateTime? Lastdate { get; set; }
    }
}
