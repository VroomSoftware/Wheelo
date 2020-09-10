using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WheeloSolution.Models;

namespace WheeloSolution.ViewModels
{
    public class VehicleViewModel
    {
        public VehicleViewModel()
        {
            VehicleKey = new HashSet<VehicleKey>();
        }

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public DateTime DateMec { get; set; }
        public bool? IsActive { get; set; }
        public int Km { get; set; }
        public CarModel Model { get; set; }
        public string ModelName { get; set; }
        public Pole Pole { get; set; }
        public string PoleName { get; set; }
        public string Registration { get; set; }
        public Fuel Fuel { get; set; }
        public string FuelName { get; set; }
        public int NbSeats { get; set; }
        public ICollection<VehicleKey> VehicleKey { get; set; }
    }
}
