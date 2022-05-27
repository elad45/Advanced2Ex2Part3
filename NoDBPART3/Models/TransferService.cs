namespace NoDBPART3.Models
{
    public class TransferService : ITransferService
    {

        public bool Send(string from, string to, string content)
        {
            UserDataService service = new UserDataService();
            //User userTo = service.GetAll().Find(user => user.Id == to);
            User userTo = service.Get(to);
            Contact contactFrom = userTo.ContactsList.Find(c => c.Id == from);
            if (userTo != null && contactFrom != null)
            {
                ConversationService conversationService = new ConversationService();
                conversationService.AddMessage(from, content, to);
                //user is the logged user
                if (userTo == null || contactFrom == null)
                {
                    return false;
                }
                contactFrom.Last = content;
                //var timeAgoService = new TimeAgoService(DateTime.Now);
                contactFrom.Lastdate = DateTime.Now;
                return true;
            }

            return false;
        }
    }
}
