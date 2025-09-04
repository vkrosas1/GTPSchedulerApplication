using GTPSchedulerApplication.Core.Entities;
using GTPSchedulerApplication.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GTPSchedulerApplication.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TutorsController :ControllerBase
    {
        private readonly GTPSchedulerApplicationDbContext _context; 

        public TutorsController(GTPSchedulerApplicationDbContext context)
        {
            _context = context;
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
            var tutor = new Tutor
            {
                Name = dto.Name,
                Email = dto.Email
            };

            _context.Tutors.Add(tutor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTutor), new { id = tutor.Id }, tutor);
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
    }

    // DTO for API
    public record CreateTutorDto(string Name, string Email);

}

