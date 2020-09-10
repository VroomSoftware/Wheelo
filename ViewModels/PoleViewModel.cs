using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using TestAuthentification.Resources;

namespace WheeloSolution.ViewModels
{
    public class PoleViewModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Display(Name = "Nom")]
        public string Name { get; set; }
        [Required]
        [Display(Name = "Ville")]
        public string City { get; set; }
        [Display(Name = "Adresse")]
        public string Address { get; set; }
        [Required]
        [StringLength(5, ErrorMessage = "Le {0} doit comporter {2} caractères.", MinimumLength = 5)]
        [Display(Name = "Code Postal")]
        public string Cp { get; set; }
    }
}
