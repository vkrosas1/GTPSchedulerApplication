using AutoMapper;
using GTPSchedulerApplication.Core.Entities;
using GTPSchedulerApplication.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GTPSchedulerApplication.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]


    public class SubjectsController : ControllerBase
    {
        private readonly GTPSchedulerApplicationDbContext _context;
        private readonly IMapper _mapper;


        public SubjectsController(GTPSchedulerApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("subjects")]
        public async Task<ActionResult<List<SubjectDto>>> GetSubjects()
        {
            var subjects = await _context.Subjects
                .Select(s => new SubjectDto(s.Id, s.Name, s.Code))
                .ToListAsync();

            return Ok(subjects);
        }

    }

    public record SubjectDto(int Id, string Name, string Code);

}
