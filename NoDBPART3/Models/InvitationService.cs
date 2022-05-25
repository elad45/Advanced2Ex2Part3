namespace NoDBPART3.Models
{
    public class InvitationService : IInvitationService
    {

        public bool Invite (string from,string to,string server)
        {
            UserDataService service = new UserDataService();
            User userTo = service.GetAll().Find(user => user.Id == to);
            if (userTo == null)
                return false;

            foreach (Contact c in userTo.ContactsList)
            {
                if (c.Id == from)
                {
                    return false;
                }
            }
            Contact newContact = new Contact(from, from, server);
            userTo.AddContact(newContact);
            ConversationService convService = new ConversationService();
            Conversation conv = new Conversation(convService.nextConvId(), from, to);
            return true;

        }
    }
}
