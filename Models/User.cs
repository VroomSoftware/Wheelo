using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WheeloSolution.Models
{
    public class User
    {
        public User()
        {
            // Comments = new HashSet<Comments>();
            // Images = new HashSet<Images>();
            // Rent = new HashSet<Rent>();
        }

        public int Id { get; set; }
        public string IdAspNetUser { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string LastName { get; set; }
        public string LicenceId { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }

        [ForeignKey("UserPoleId")]
        public Pole UserPole { get; set; }
        public int UserPoleId { get; set; }
        
        [ForeignKey("UserRightId")]
        public Right UserRight { get; set; }
        public int UserRightId { get; set; }

        //public ICollection<Comments> Comments { get; set; }
        //public ICollection<Images> Images { get; set; }
    }
}
