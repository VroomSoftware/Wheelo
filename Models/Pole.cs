using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WheeloSolution.Models
{
    public class Pole
    { 
        public Pole()
        {
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Address { get; set; }

        [Required]
        [MaxLength(50)]
        public string City { get; set; }

        [Required]
        [MaxLength(10)]
        public string Cp { get; set; }

        [Required]
        [MaxLength(25)]
        public string Name { get; set; }
    }
}
