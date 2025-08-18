using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GTPSchedulerApplication.Core.Entities
{
    public class Assignment
    {
        public int Id { get; set; }
        public int TutorId { get; set; }
        public int SchoolClassId { get; set; }
        public DateTime AssignedDate { get; set; }
        public AssignmentStatus Status { get; set; }
        public double PriorityScore { get; set; }

        public Tutor Tutor { get; set; } = null!;
        public SchoolClass SchoolClass { get; set; } = null!;
    }

    public enum AssignmentStatus
    {
        Pending,
        Confirmed,
        Cancelled,
        Completed
    }
}
