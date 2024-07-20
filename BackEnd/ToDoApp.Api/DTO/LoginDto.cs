using System.ComponentModel.DataAnnotations;

namespace EmployeeDirectory.Api.DTO;

public class LoginDto
{
    [Required]
    public string? UserName { get; set; }

    [Required]
    public string? Password { get; set; }
}