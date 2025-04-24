namespace Notification.Api.Model;

public class Patient
{
    public int Id { get; set; }
    public string Name { get; set; }

    public List<PatientDocument>? PatientDocuments;
}
