namespace NoDBPART3.Models
{
    public class User
    {
        public User(string id, string name, string password)
        {
            Id = id;
            Name = name;
            Password = password;
            ContactsList = new List<Contact>();
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public string Password { get; set; }

        public List<Contact> ContactsList { get; set; }

        public void AddContact(Contact c)
        {
            ContactsList.Add(c);
        }
    }
}
