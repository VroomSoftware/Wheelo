using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using WheeloSolution.Models;
using WheeloSolution.Data;
using static TestAuthentification.Resources.Enums;
using Microsoft.AspNetCore.Identity;
using WheeloSolution.ViewModels;

namespace WheeloSolution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentController : ControllerBase
    {

        List<Rent> rents;
        List<RentViewModel> rentViewModels;

        private ApplicationDbContext _db;


        public RentController( ApplicationDbContext db)
        {
            _db = db;
            var rentsFromDatabase = _db.Rent.ToList();
            this.rents = new List<Rent>();
            rentViewModels = new List<RentViewModel>();
            this.rents.AddRange(rentsFromDatabase);
        }


        [HttpGet]
        public async Task<IActionResult> GetRents()
        {
            this.rents = _db.Rent.ToList();
            this.getRentViewModel();
            return Ok(JsonSerializer.Serialize(this.rentViewModels));    
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetRent([FromRoute] int id)
        {
            var newRentViewModel = new RentViewModel();
            RentViewModel rentViewModel = GetRentViewModelById(id);
            if (rentViewModel == null)
            {
                return NotFound();
            }
            return Ok(JsonSerializer.Serialize(rentViewModel));

        }
        private RentViewModel GetRentViewModelById(int id)
        {

            foreach (RentViewModel rent in this.rentViewModels)
            {
                if (rent.Id == id)
                {
                    return rent;
                }
            }
            return null;
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRent([FromRoute] int id)
        {
            _db.Rent.Remove(_db.Rent.Find(id));
            _db.SaveChanges();
            rents=_db.Rent.ToList();

            return Ok(JsonSerializer.Serialize(rents));

        }

        [HttpPost]
        public async Task<IActionResult> AddRent([FromBody] Rent newRent)
        {
            if (newRent.Id <= 0)
            {
                var rent = new Rent();
                rent.EndDate = newRent.EndDate;
                rent.StartDate = newRent.StartDate;
                rent.StartPoleId = newRent.StartPoleId;
                rent.EndPoleId = newRent.EndPoleId;
                rent.State = (sbyte)LocationState.Asked;
                rent.UserId = 1;//TODO
                rent.VehicleId = newRent.VehicleId;
                rent.TotalSeats = newRent.TotalSeats;
                rent.SeatsRemaining = newRent.SeatsRemaining;
                rent.StartKm = newRent.StartKm;
                rent.EndKm = newRent.EndKm;

                _db.Rent.Add(rent);
                _db.SaveChanges();
                rents = _db.Rent.ToList();
            }
            return Ok(JsonSerializer.Serialize(rents));
        }

        [HttpPut]
        public async Task<IActionResult> EditRent([FromBody] Rent rent)
        {
            var index = -1;
            foreach (Rent iRent in rents)
            {
                if (iRent.Id == rent.Id)
                {
                    index = this.rents.IndexOf(iRent);
                }
            }
            if(index < 0)
            {
                return NotFound(JsonSerializer.Serialize(this.rents));
            }
            else
            {

                Rent selectedRent = _db.Rent.Where(p => p.Id == rent.Id).FirstOrDefault();
                Vehicle vehicle = _db.Vehicle.Where(p => p.Id == selectedRent.VehicleId).FirstOrDefault();
                User user = _db.User.Where(p => p.Id == selectedRent.UserId).FirstOrDefault();
                Pole startPole = _db.Pole.Where(p => p.Id == selectedRent.StartPoleId).FirstOrDefault();
                Pole endPole = _db.Pole.Where(p => p.Id == selectedRent.EndPoleId).FirstOrDefault();

                rent.Vehicle = vehicle;
                rent.StartPole = startPole;
                rent.EndPole = endPole;
                rent.User = user;
                _db.Entry(selectedRent).CurrentValues.SetValues(rent);
                _db.SaveChanges();
                this.rents = _db.Rent.ToList();
                return Ok(JsonSerializer.Serialize(this.rents));
            }
        }
        private void getRentViewModel()
        {
            this.rentViewModels = new List<RentViewModel>();
            foreach (Rent rent in this.rents)
            {
                var newRentViewModel = new RentViewModel();
                newRentViewModel.Id = rent.Id;
                newRentViewModel.State = rent.State;
                newRentViewModel.StartDate = rent.StartDate;
                newRentViewModel.EndDate = rent.EndDate;
                newRentViewModel.StartKm = rent.StartKm;
                newRentViewModel.EndKm = rent.EndKm;
                newRentViewModel.TotalSeats = rent.TotalSeats;
                newRentViewModel.SeatsRemaining = rent.SeatsRemaining;
                newRentViewModel.StartPole = _db.Pole.Where(pole => pole.Id == rent.StartPoleId).First();
                newRentViewModel.StartPoleName = newRentViewModel.StartPole.Name;
                newRentViewModel.EndPole = _db.Pole.Where(pole => pole.Id == rent.EndPoleId).First();
                newRentViewModel.EndPoleName = newRentViewModel.EndPole.Name;
                newRentViewModel.UserId = 1;

                this.rentViewModels.Add(newRentViewModel);
            }
        }

    }
}
