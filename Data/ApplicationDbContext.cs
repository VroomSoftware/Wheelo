using WheeloSolution.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WheeloSolution.Controllers;

namespace WheeloSolution.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {

        }
        public virtual DbSet<Pole> Pole { get; set; }
        public virtual DbSet<Fuel> Fuel { get; set; }
        public virtual DbSet<Brand> Brand { get; set; }
        public virtual DbSet<CarModel> CarModel { get; set; }
        public virtual DbSet<Vehicle> Vehicle { get; set; }
        public virtual DbSet<Rent> Rent { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Right> Right { get; set; }






    }
}
