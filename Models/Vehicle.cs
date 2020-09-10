using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TestAuthentification.Resources;

namespace WheeloSolution.Models
{
    public partial class Vehicle
    {
        public Vehicle()
        {
            //Comments = new HashSet<Comment>();
            //Historymaintenance = new HashSet<Historymaintenance>();
            Images = new HashSet<Image>();
            VehicleKey = new HashSet<VehicleKey>();
            Rent = new HashSet<Rent>();
        }

        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(25)]
        public string Color { get; set; }
        public DateTime DateMec { get; set; }
        public bool? IsActive { get; set; }
        public int Km { get; set; }

        [ForeignKey("ModelId")]
        public CarModel Model { get; set; }
        public int ModelId { get; set; }

        [ForeignKey("PoleId")]
        public Pole Pole { get; set; }
        public int PoleId { get; set; }

        public string Registration { get; set; }
        //public sbyte VehState { get; set; }

        [ForeignKey("FuelId")]
        public Fuel Fuel { get; set; }
        public int FuelId { get; set; }
        //public ICollection<Comment> Comments { get; set; }
        //public ICollection<Historymaintenance> Historymaintenance { get; set; }
        public ICollection<Image> Images { get; set; }
        public ICollection<VehicleKey> VehicleKey { get; set; }
        public ICollection<Rent> Rent { get; set; }
    }
}
