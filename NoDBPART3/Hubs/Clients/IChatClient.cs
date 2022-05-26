using NoDBPART3.Models;

namespace NoDBPART3.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }
}
