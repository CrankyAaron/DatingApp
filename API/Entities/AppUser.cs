using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        // public string Gender { get; set; }
        // public string Introudction { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        // public DateOnly DateOfBirth { get; set; }
        // public string KnownAs { get; set; }
        // public DateTime Created { get; set; } = DateTime.UtcNow;
        // public DateTime LastActive { get; set; } = DateTime.UtcNow;


    }
}