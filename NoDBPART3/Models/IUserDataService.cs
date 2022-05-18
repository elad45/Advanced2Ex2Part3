namespace NoDBPART3.Models
{
    public interface IUserDataService
    {
        public List<User> GetAll();

        public User Get(string id);

        public void Add(User user);

        public void Edit(string id, User user);

        public void Delete(string id);
    }
}
