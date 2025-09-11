using AutoMapper;
using GTPSchedulerApplication.Core.Entities;
using GTPSchedulerApplication.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TutorsController : ControllerBase
{
    private readonly GTPSchedulerApplicationDbContext _context;
    private readonly IMapper _mapper;
    // private readonly ILogger _logger;

    public TutorsController(GTPSchedulerApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpPost]
    public async Task<ActionResult<TutorDto>> CreateTutor(CreateTutorDto dto)
    {
        // Look up SubjectId based on subject code 
        var subjectCodes = dto.TutorSubjects.Select(ts => ts.SubjectCode).ToList();
        var subjects = await _context.Subjects.Where(s => subjectCodes.Contains(s.Code)).ToDictionaryAsync(s => s.Code, s => s.Id);

        // Build TutorSubjects with correct SubjectId
        var tutorSubjects = dto.TutorSubjects.Select(ts => new TutorSubject
        {
            SubjectId = subjects[ts.SubjectCode],
            ProficiencyLevel = ts.ProficiencyLevel,
        }).ToList();

        var tutor = new Tutor
        {
            Name = dto.Name,
            Email = dto.Email,
            TutorSubjects = tutorSubjects,
        };

        _context.Tutors.Add(tutor);
        await _context.SaveChangesAsync();

        // Fetch the tutor with navigation properties for mapping to DTO
        var createdTutor = await _context.Tutors
            .Include(t => t.TutorSubjects)
                .ThenInclude(ts => ts.Subject)
            .Include(t => t.Availability)
            .FirstOrDefaultAsync(t => t.Id == tutor.Id);

        var tutorDto = _mapper.Map<TutorDto>(createdTutor);

        return CreatedAtAction(nameof(GetTutor), new { id = tutor.Id }, tutorDto);
    }

    [HttpGet]
    public async Task<ActionResult<List<TutorDto>>> GetTutors()
    {
        var tutors = await _context.Tutors
            .Include(t => t.TutorSubjects)
                .ThenInclude(ts => ts.Subject)
            .Include(t => t.Availability)
            .ToListAsync();

        return _mapper.Map<List<TutorDto>>(tutors);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TutorDto>> GetTutor(int id)
    {
        try
        {
            var tutor = await _context.Tutors
            .Include(t => t.TutorSubjects)
            .ThenInclude(ts => ts.Subject)
            .Include(t => t.Availability)
            .FirstOrDefaultAsync(t => t.Id == id);
            return tutor == null ? NotFound() : _mapper.Map<TutorDto>(tutor);
        }
        catch (Exception ex) {
            throw new ApplicationException("Internal error");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Tutor>> DeleteTutor(int id)
    {
        var tutor = await _context.Tutors.FindAsync(id);
        if (tutor != null)
        {
            _context.Tutors.Remove(tutor);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        else
        {
            return NotFound($"User with ID {id} not found.");
        }
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchTutor(int id, UpdateTutorPartialDto dto)
    {
        var tutor = await _context.Tutors.FindAsync(id);
        if (tutor == null) return NotFound();

        if (dto.Email is not null) tutor.Email = dto.Email;
        if (dto.IsActive.HasValue) tutor.IsActive = dto.IsActive.Value;

        await _context.SaveChangesAsync();
        return NoContent();
    }

}

// input DTOs (createTutor)
public record CreateTutorSubjectDto(string SubjectCode, int ProficiencyLevel, string? SubjectName);
public record CreateTutorAvailabilityDto(DayOfWeek DayOfWeek, TimeOnly StartTime, TimeOnly EndTime);
public record CreateTutorDto(
    string Name, 
    string Email, 
    List<CreateTutorSubjectDto> TutorSubjects, 
    List<CreateTutorAvailabilityDto>? Availability
    );

// output DTO for API (GetTutor/after creation)
public record TutorSubjectDto(int SubjectId, int ProficiencyLevel, string? SubjectName);
public record TutorAvailabilityDto(DayOfWeek DayOfWeek, TimeOnly StartTime, TimeOnly EndTime);
public record TutorDto(
    int Id, 
    string Name, 
    string Email, 
    bool IsActive, 
    List<TutorSubjectDto> TutorSubjects, 
    List<TutorAvailabilityDto>? Availability
    );
public class UpdateTutorPartialDto
{
    public string? Email { get; set; }
    public bool? IsActive { get; set; }
}






