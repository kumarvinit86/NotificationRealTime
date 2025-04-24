namespace Notification.Api.Model
{
    public class PatientDetailsResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }

        //assign with new blank array
        public required string[] documents { get; set; }
    }
}
