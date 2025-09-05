using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GTPSchedulerApplication.Core.Entities
{
    public class SchoolClass { 
        public int Id { get; set; }

        // Foreign key properties
        [ForeignKey("School")] // SchoolId is the FK for the School navigation property
        public required int SchoolId { get; set; }
        [ForeignKey("Subject")] // SubjectId is the FK for the Subject navigation property
        public required int SubjectId { get; set; }

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