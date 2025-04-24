namespace Notification.Api.Model;

public class PatientDocument
{
    public int Id { get; set; }
    public int PatientId { get; set; }
    public string DocumentPath { get; set; }
    public DateTime LastUpdated { get; set; }

    public Patient Patient { get; set; }
}
