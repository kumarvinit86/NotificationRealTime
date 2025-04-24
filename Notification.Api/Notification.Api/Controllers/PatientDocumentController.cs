using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Notification.Api.Database;
using Notification.Api.Hubs;
using Notification.Api.Model;
using System;

[ApiController]
[Route("api/[controller]")]
public class PatientDocumentController : ControllerBase
{
    private readonly PatientDetailsDbContext _context;
    private readonly IHubContext<PatientNotificationHub> _hubContext;

    public PatientDocumentController(PatientDetailsDbContext context, IHubContext<PatientNotificationHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    [HttpPost("{patientId}/update")]
    public async Task<IActionResult> UpdatePatientDocument(int patientId, string documentPath)
    {
        //var document = await _context.PatientDocuments.FirstOrDefaultAsync(d => d.PatientId == patientId);
        _ = _context.PatientDocuments.AddAsync(new PatientDocument()
        {
            PatientId = patientId,
            DocumentPath = documentPath,
            LastUpdated = DateTime.Now
        });
        var result= await _context.SaveChangesAsync();
        if (result <= 0)
        {
            return NotFound("Patient document not added.");
        }


        // Notify all SignalR subscribers of this patient
        await _hubContext.Clients.Group($"patient-{patientId}")
            .SendAsync("ReceiveNotification", $"{documentPath}");

        return Ok(new { message = "Document added notification sent." });
    }
}
