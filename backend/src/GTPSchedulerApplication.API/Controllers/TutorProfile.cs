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
            CreateMap<TutorSubject, TutorSubjectDto>()
                .ForMember(dest => dest.SubjectName, opt => opt.MapFrom(src => src.Subject.Name));
            CreateMap<TutorAvailability, TutorAvailabilityDto>();

            // DTO → Entity
            CreateMap<CreateTutorDto, Tutor>();
            CreateMap<CreateTutorSubjectDto, TutorSubject>();
            CreateMap<CreateTutorAvailabilityDto, TutorAvailability>();
        }
    }
}
