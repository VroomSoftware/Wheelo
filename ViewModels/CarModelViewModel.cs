using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WheeloSolution.ViewModels
{
    public class CarModelViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string BrandName { get; set; }
        
        public int BrandId { get; set; }

        public int NbSeats { get; set; }
    }
}
