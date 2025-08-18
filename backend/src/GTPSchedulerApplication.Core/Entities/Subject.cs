using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GTPSchedulerApplication.Core.Entities
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; // "Biology", "Physics", "Computer Science"
        public string Code { get; set; } = string.Empty; // "BIO", "PHY", "CS"
    }
}
