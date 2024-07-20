using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Models
{
    public class Task
    {
        public string? Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Details { get; set; }

        public DateTime? CreatedOn { get; set; } = DateTime.UtcNow;

        [Required]
        public required DateTime DueDate { get; set; }

        [Required]
        public required string Priority { get; set; }

        public bool? IsCompleted { get; set; } = false;

        public bool? IsDeleted { get; set; } = false;

        public DateTime? ModifiedOn { get; set;} = DateTime.UtcNow;

        public string? UserId { get; set; }
    }
}