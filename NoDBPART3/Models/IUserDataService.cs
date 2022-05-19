namespace NoDBPART3.Models
{
    public interface IUserDataService
    {
        // list of all the users on the server
        public List<User> GetAll();
        // gets a specific user by id(id = username)
        public User Get(string id);
        // adds a certain user to the list
        public void Add(User user);
        // changes and username and the password
        public void Edit(string id, User user);
        // deletes a user in the users list
        public void Delete(string id);
    }
}
