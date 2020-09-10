using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WheeloSolution.Models;

namespace WheeloSolution.ViewModels
{
    public class RentViewModel
    {
        public RentViewModel()
        {
        }
        [Key]
        public int Id { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime StartDate { get; set; }
        public sbyte State { get; set; }

        public Pole StartPole { get; set; }
        public string StartPoleName { get; set; }

        public Pole EndPole { get; set; }
        public string EndPoleName { get; set; }

        public int UserId { get; set; }
        public string UserName { get; set; }

        public Vehicle Vehicle { get; set; }
        public string VehicleName { get; set; }

        public int? StartKm { get; set; }
        public int? EndKm { get; set; }

        public int? TotalSeats { get; set; }
        public int? SeatsRemaining { get; set; }
        //public ICollection<Comments> Comments { get; set; }
    }
}
