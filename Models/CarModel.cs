using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WheeloSolution.Models
{
    public class CarModel
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [ForeignKey("BrandId")]
        public Brand Brand { get; set; }
        public int BrandId { get; set; }

        public int NbSeats { get; set; }
    }
}
