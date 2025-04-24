using Microsoft.AspNetCore.SignalR;

namespace Notification.Api.Hubs;

public class PatientNotificationHub : Hub
{
    public async Task SubscribeToPatient(string patientId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, $"patient-{patientId}");
    }

    public async Task UnsubscribeFromPatient(string patientId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"patient-{patientId}");
    }
}
