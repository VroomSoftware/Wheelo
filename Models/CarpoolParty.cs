using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WheeloSolution.Models
{
    public class CarpoolParty
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("RentId")]
        public Rent Rent { get; set; }
        public int RentId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
        public int UserId { get; set; }
    }
}
