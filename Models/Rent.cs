using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

using System.Linq;
using System.Threading.Tasks;

namespace WheeloSolution.Models
{
    public class Rent
    {
        public Rent()
        {
            //Comments = new HashSet<Comments>();
        }
        [Key]
        public int Id { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime StartDate { get; set; }
        public sbyte State { get; set; }

        [ForeignKey("StartPoleId")]
        public Pole StartPole { get; set; }
        public int StartPoleId { get; set; }

        [ForeignKey("EndPoleId")]
        public Pole EndPole { get; set; }
        public int EndPoleId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
        public int UserId { get; set; }

        [ForeignKey("VehicleId")]
        public Vehicle Vehicle { get; set; }
        public int VehicleId { get; set; }

        public int? StartKm { get; set; }
        public int? EndKm { get; set; }

        public int? TotalSeats { get; set; }
        public int? SeatsRemaining { get; set; }
    }
}
