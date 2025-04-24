using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Notification.Api.Database;
using Notification.Api.Model;
using System.Linq;

namespace Notification.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientDetailController : ControllerBase
{
    private readonly PatientDetailsDbContext context;
    public PatientDetailController(PatientDetailsDbContext context)
    {
            this.context = context;
    }

    [HttpGet("{patientId}/details")]
    [ProducesResponseType(typeof(PatientDetailsResponse), 200)]
    public async Task<ActionResult<PatientDetailsResponse>> GetPatientDetails(int patientId)
    {
        // Fetch the patient details along with the documents using eager loading
        var patient = await context.Patients
            .Include(p => p.PatientDocuments)
            .FirstOrDefaultAsync(p => p.Id == patientId);

        if (patient == null)
        {
            return NotFound("Patient not found.");
        }

        // Ensure PatientDocuments is not null and map the patient and its documents to the response
        var patientDetails = new PatientDetailsResponse
        {
            Id = patient.Id,
            Name = patient.Name,
            documents = patient.PatientDocuments?
                .Select(x => x.DocumentPath)
                .Where(path => !string.IsNullOrEmpty(path))
                .ToArray() ?? Array.Empty<string>()
        };

        return Ok(patientDetails);
    }
}
