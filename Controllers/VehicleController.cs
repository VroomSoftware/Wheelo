using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using WheeloSolution.Models;
using WheeloSolution.ViewModels;
using TestAuthentification.Resources;
using WheeloSolution.Data;

namespace WheeloSolution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {

        List<Vehicle> vehicles;
        List<VehicleViewModel> vehicleViewModels;
        private ApplicationDbContext _db;

        public VehicleController(ApplicationDbContext db)
        {
            _db = db;
            vehicles = new List<Vehicle>();
            vehicleViewModels = new List<VehicleViewModel>();
            
        }


        [HttpGet]
        public async Task<IActionResult> GetVehicles()
        {
            this.vehicles = _db.Vehicle.ToList();
            this.getVehicleViewModel();
            return Ok(JsonSerializer.Serialize(this.vehicleViewModels));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle([FromRoute] int id)
        {
            var newVehicleViewModel = new VehicleViewModel();
            VehicleViewModel vehicleViewModel = GetVehicleViewModelById(id);
            if (vehicleViewModel == null)
            {
                return NotFound();
            }
            return Ok(JsonSerializer.Serialize(vehicleViewModel));

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle([FromRoute] int id)
        {

            Vehicle currentVehicle = null;
            foreach(Vehicle vehicle in this.vehicles)
            {
                if(vehicle.Id == id)
                {
                    currentVehicle = vehicle;
                }
            }

            this.vehicles.Remove(currentVehicle);

            if (currentVehicle == null)
            {
                return NotFound();
            }
            return Ok(JsonSerializer.Serialize(this.vehicles));

        }

        [HttpPost]
        public async Task<IActionResult> AddVehicle([FromBody] Vehicle newVehicle)
        {
            if (newVehicle.Id <= 0)
            {
                var vehicle = new Vehicle()
                {
                    Name = newVehicle.Name,
                    IsActive = newVehicle.IsActive,
                    Color = newVehicle.Color,
                    DateMec = newVehicle.DateMec,
                    FuelId = newVehicle.FuelId,
                    PoleId = newVehicle.PoleId,
                    ModelId = newVehicle.ModelId,
                    Km = newVehicle.Km,
                    Registration = newVehicle.Registration
                };

                _db.Vehicle.Add(vehicle);
                _db.SaveChanges();
                this.vehicles = _db.Vehicle.ToList();
            }
            return Ok(JsonSerializer.Serialize(this.vehicles));

        }

        [HttpPut]
        public async Task<IActionResult> EditVehicle([FromBody] Vehicle newVehicle)
        {
            var index = 0;
            foreach (Vehicle iVehicle in this.vehicles)
            {
                if (iVehicle.Id == newVehicle.Id)
                {
                    index = this.vehicles.IndexOf(iVehicle);
                }
            }
            if (index < 0)
            {
                return NotFound(JsonSerializer.Serialize(this.vehicles));
            }
            Vehicle selectedVehicle = _db.Vehicle.Where(p => p.Id == newVehicle.Id).FirstOrDefault();
            _db.Entry(selectedVehicle).CurrentValues.SetValues(newVehicle);
            _db.SaveChanges();
            this.vehicles = _db.Vehicle.ToList();
            this.getVehicleViewModel();

            return Ok(JsonSerializer.Serialize(this.vehicleViewModels));

        }

        private Vehicle GetVehicleById(int id)
        {

            foreach (Vehicle vehicle in this.vehicles)
            {
                if(vehicle.Id == id)
                {
                    return vehicle;
                }
            }
            return null;
        }
        private VehicleViewModel GetVehicleViewModelById(int id)
        {

            foreach (VehicleViewModel vehicle in this.vehicleViewModels)
            {
                if (vehicle.Id == id)
                {
                    return vehicle;
                }
            }
            return null;
        }

        private void getVehicleViewModel()
        {
            this.vehicleViewModels = new List<VehicleViewModel>();
            foreach (Vehicle vehicle in this.vehicles)
            {
                var newVehicleViewModel = new VehicleViewModel();
                newVehicleViewModel.Id = vehicle.Id;
                newVehicleViewModel.Name = vehicle.Name;
                newVehicleViewModel.Color = vehicle.Color;
                newVehicleViewModel.DateMec = vehicle.DateMec;
                newVehicleViewModel.IsActive = vehicle.IsActive;
                newVehicleViewModel.Km = vehicle.Km;
                newVehicleViewModel.Model = _db.CarModel.Where(carmodel => carmodel.Id == vehicle.ModelId).First();
                newVehicleViewModel.ModelName = newVehicleViewModel.Model.Name;
                newVehicleViewModel.NbSeats = newVehicleViewModel.Model.NbSeats;
                newVehicleViewModel.Pole = _db.Pole.Where(pole => pole.Id == vehicle.PoleId).First();
                newVehicleViewModel.PoleName = newVehicleViewModel.Pole.Name;
                newVehicleViewModel.Registration = vehicle.Registration;
                newVehicleViewModel.Fuel = _db.Fuel.Where(fuel => fuel.Id == vehicle.FuelId).First();
                newVehicleViewModel.FuelName = newVehicleViewModel.Fuel.Name;
                newVehicleViewModel.VehicleKey = vehicle.VehicleKey;

                this.vehicleViewModels.Add(newVehicleViewModel);
            }
        }

    }
}
