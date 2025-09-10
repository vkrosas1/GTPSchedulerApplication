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

    public TutorsController(GTPSchedulerApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<Tutor>>> GetTutors()
    {
        return await _context.Tutors
            .Include(t => t.TutorSubjects)
                .ThenInclude(ts => ts.Subject)
            .Include(t => t.Availability)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Tutor>> CreateTutor(CreateTutorDto dto)
    {
        var tutor = _mapper.Map<Tutor>(dto);

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

    [HttpGet("{id}")]
    public async Task<ActionResult<Tutor>> GetTutor(int id)
    {
        var tutor = await _context.Tutors
            .Include(t => t.TutorSubjects)
            .ThenInclude(ts => ts.Subject)
            .Include(t => t.Availability)
            .FirstOrDefaultAsync(t => t.Id == id);

        return tutor == null ? NotFound() : tutor;
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
}
// output DTO for API (GetTutor/after creation)
public record TutorSubjectDto(int SubjectId, string SubjectName, int ProficiencyLevel);
public record TutorAvailabilityDto(DayOfWeek DayOfWeek, TimeOnly StartTime, TimeOnly EndTime);
public record TutorDto(
    int Id, 
    string Name, 
    string Email, 
    bool IsActive, 
    List<TutorSubjectDto> TutorSubjects, 
    List<TutorAvailabilityDto> Availability
    );


// input DTOs (createTutor)
public record CreateTutorSubjectDto(int SubjectId, string SubjectName, int ProficiencyLevel);
public record CreateTutorAvailabilityDto(DayOfWeek DayOfWeek, TimeOnly StartTime, TimeOnly EndTime);
public record CreateTutorDto(
    string Name, 
    string Email, 
    List<CreateTutorSubjectDto> TutorSubjects, 
    List<CreateTutorAvailabilityDto> Availability
    );



