using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GTPSchedulerApplication.Core.Entities
{
    public class TutorAvailability
    {
        public int Id { get; set; }
        public int TutorId { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }

        public Tutor Tutor { get; set; } = null!;
    }
}
