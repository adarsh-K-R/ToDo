using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoApp.Data.Models
{
    public class User
    {
        [Key]
        [Required]
        public required string UserId { get; set; }
        
        [Required]
        public required string UserName { get; set; }

        [Required]
        public required string Password { get; set; }

        public virtual ICollection<Task>? Tasks { get; set; }
    }
}