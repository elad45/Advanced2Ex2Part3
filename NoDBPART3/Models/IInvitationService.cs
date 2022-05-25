namespace NoDBPART3.Models
{
    public interface IInvitationService
    {
        public bool Invite(string from, string to, string server);
    }
}
