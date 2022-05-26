using Microsoft.AspNetCore.SignalR;
using NoDBPART3.Hubs.Clients;
using NoDBPART3.Models;

namespace NoDBPART3.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }
}