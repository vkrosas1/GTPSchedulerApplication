namespace GTPSchedulerApplication.Core.Entities
{
    public class Tutor { 
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;

        // Nav properties 
        public List<TutorSubject> TutorSubjects { get; set; } = new();
        public List<TutorAvailability> Availability { get; set; } = new();
        public List<Assignment> Assignments { get; set; } = new();

    }
}