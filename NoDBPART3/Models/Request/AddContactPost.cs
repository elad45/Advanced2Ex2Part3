namespace NoDBPART3.Models.Request
{
    public class AddContactPost
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Server { get; set; }

        //UserId (LOGGED USER)
        public string User { get; set; }
    }
}
