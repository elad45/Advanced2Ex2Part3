namespace NoDBPART3.Models
{
    public class TransferService :ITransferService
    {

        public bool Send(string from, string to, string content)
        {
            UserDataService service = new UserDataService();
            User userTo = service.GetAll().Find(user => user.Id == to);
            Contact contactFrom = userTo.ContactsList.Find(c => c.Id == from); 
            if (userTo != null && contactFrom != null)
            {
                ConversationService conversationService = new ConversationService();
                conversationService.AddMessage(from, content, to);
                contactFrom.Last = content; // check it with michael
                contactFrom.Lastdate = DateTime.Now; //check it with michael
                return true;
            }

            return false;
        }
    }
}
