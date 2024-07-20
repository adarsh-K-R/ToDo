using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Data.Models
{
    public class Task
    {
        [Key]
        [Required]
        public required string Id { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Details { get; set; }

        [Required]
        public required DateTime CreatedOn { get; set; }

        [Required]
        public required DateTime DueDate { get; set; }

        [Required]
        public required string Priority { get; set; }

        [Required]
        public required bool IsCompleted { get; set; }

        [Required]
        public required bool IsDeleted { get; set; }

        [Required]
        public required DateTime ModifiedOn { get; set; }

        [Required]
        public required string UserId { get; set; }

        public virtual User? User { get; set; }
    }
}