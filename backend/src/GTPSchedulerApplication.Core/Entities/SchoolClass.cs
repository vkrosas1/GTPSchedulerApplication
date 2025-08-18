using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GTPSchedulerApplication.Core.Entities
{
    public class SchoolClass { 
        public int Id { get; set; }
        public required string SchoolId { get; set; } 
        public required string SubjectId { get; set; }
        public DayOfWeek DayOfWeek { get; set; } 
        public TimeOnly StartTime {get; set;}
        public int DurationMinutes {get; set;}
        public int MaxStudents {get; set;}

        // Nav properties 
        public School School { get; set; } = null!;
        public Subject Subject { get; set; } = null!;
        public List<Assignment> Assignments { get; set; } = new();

        // Computed property
        public TimeOnly EndTime => StartTime.AddMinutes(DurationMinutes);

    }
}