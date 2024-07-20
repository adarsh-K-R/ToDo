using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Models
{
    public class User
    {
        public string? UserId { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public required string UserName { get; set; }

        [Required]
        public required string Password { get; set; }

        public virtual ICollection<Task>? Tasks { get; set; }
    }
}