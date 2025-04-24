namespace Notification.Api.Model;

public class UserSubscription
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int PatientId { get; set; }

    public User User { get; set; }
    public Patient Patient { get; set; }
}
