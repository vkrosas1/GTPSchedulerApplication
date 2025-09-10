using AutoMapper;
using GTPSchedulerApplication.API.Controllers;
using GTPSchedulerApplication.Core.Entities;
using Xunit; 

namespace GTPSchedulerApplication.API.UnitTests
{
    public class TutorMappingTests
    {
        private readonly IMapper _mapper;

        public TutorMappingTests()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<TutorProfile>(); // Your AutoMapper profile
            });

            config.AssertConfigurationIsValid(); // Throws if any mapping is misconfigured
            _mapper = config.CreateMapper();
        }

        [Fact]
        public void Should_Map_CreateTutorDto_To_Tutor()
        {
            var dto = new CreateTutorDto(
                "Viviana Rosas",
                "viviana@example.com",
                new List<CreateTutorSubjectDto>
                {
                    new(1, "Computer Science", 2)
                },
                new List<CreateTutorAvailabilityDto>
                {
                    new(DayOfWeek.Monday, new TimeOnly(9, 0, 0), new TimeOnly(12, 0, 0))
                }
            );

            var tutor = _mapper.Map<Tutor>(dto);

            Assert.Equal(dto.Name, tutor.Name);
            Assert.Equal(dto.Email, tutor.Email);
            Assert.Single(tutor.TutorSubjects);
            Assert.Single(tutor.Availability);
            Assert.Equal(1, tutor.TutorSubjects[0].SubjectId);
            Assert.Equal(2, tutor.TutorSubjects[0].ProficiencyLevel);
        }
    }
}