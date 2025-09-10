using AutoMapper;
using GTPSchedulerApplication.Core.Entities;
namespace GTPSchedulerApplication.API.Controllers
{
    public class TutorProfile : Profile
    {
        public TutorProfile()
        {
            // Entity → DTO
            CreateMap<Tutor, TutorDto>();
            CreateMap<TutorSubject, TutorSubjectDto>();
            CreateMap<TutorAvailability, TutorAvailabilityDto>();

            // DTO → Entity
            CreateMap<CreateTutorDto, Tutor>();
            CreateMap<CreateTutorSubjectDto, TutorSubject>();
            CreateMap<CreateTutorAvailabilityDto, TutorAvailability>();
        }
    }
}
