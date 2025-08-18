using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GTPSchedulerApplication.Core.Entities
{
    public class TutorSubject
    {
        public int TutorId { get; set; }
        public int SubjectId { get; set; }
        public int ProficiencyLevel { get; set; } // 1-5 scale

        public Tutor Tutor { get; set; } = null!;
        public Subject Subject { get; set; } = null!;
    }
}
