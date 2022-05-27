namespace NoDBPART3.Models
{
    public interface ITransferService
    {
        public bool Send(string from, string to, string content);
    }
}
