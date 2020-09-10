using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using WheeloSolution.Models;
using WheeloSolution.Data;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using WheeloSolution.ViewModels;

namespace WheeloSolution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarModelController : ControllerBase
    {

        List<CarModel> carmodels;
        List<CarModelViewModel> carmodelViewModels;

        private ApplicationDbContext _db;


        public CarModelController( ApplicationDbContext db)
        {
            _db = db;
            var carmodelsFromDatabase = _db.CarModel.ToList();
            this.carmodels = new List<CarModel>();
            this.carmodelViewModels = new List<CarModelViewModel>();
            this.carmodels.AddRange(carmodelsFromDatabase);
        }


        [HttpGet]
        public async Task<IActionResult> GetCarModels()
        {
            this.carmodels = _db.CarModel.ToList();
            this.getCarModelViewModel();
            return Ok(JsonSerializer.Serialize(this.carmodelViewModels));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarModel([FromRoute] int id)
        {

            CarModel carmodel = _db.CarModel.SingleOrDefault(p => p.Id == id);
            if (carmodel == null)
            {
                return NotFound();
            }
            return Ok(JsonSerializer.Serialize(carmodel));

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCarModel([FromRoute] int id)
        {
            _db.CarModel.Remove(_db.CarModel.Find(id));
            _db.SaveChanges();
            carmodels=_db.CarModel.ToList();

            return Ok(JsonSerializer.Serialize(carmodels));

        }

        [HttpPost]
        public async Task<IActionResult> AddCarModel([FromBody] CarModel newCarModel)
        {
            if (newCarModel.Id <= 0)
            {
                var carmodel = new CarModel();
                carmodel.Name=newCarModel.Name;
                carmodel.NbSeats = newCarModel.NbSeats;
                carmodel.BrandId = newCarModel.BrandId;
                _db.CarModel.Add(carmodel);
                _db.SaveChanges();
                carmodels = _db.CarModel.ToList();
            }
            return Ok(JsonSerializer.Serialize(carmodels));

        }

        [HttpPut]
        public async Task<IActionResult> EditCarModels([FromBody] CarModel carmodel)
        {
            var index = -1;
            foreach (CarModel iCarModel in carmodels)
            {
                if (iCarModel.Id == carmodel.Id)
                {
                    index = this.carmodels.IndexOf(iCarModel);
                }
            }
            if(index < 0)
            {
                return NotFound(JsonSerializer.Serialize(this.carmodels));
            }
            else
            {
                CarModel selectedCarModel = _db.CarModel.Where(p => p.Id == carmodel.Id).FirstOrDefault();
                _db.Entry(selectedCarModel).CurrentValues.SetValues(carmodel);
                _db.SaveChanges();
                this.carmodels = _db.CarModel.ToList();
                return Ok(JsonSerializer.Serialize(this.carmodels));
            }

        }

        private void getCarModelViewModel()
        {
            this.carmodelViewModels = new List<CarModelViewModel>();
            foreach(CarModel carmodel in this.carmodels)
            {
                var newCarModelViewModel = new CarModelViewModel();
                newCarModelViewModel.Id = carmodel.Id;
                newCarModelViewModel.Name = carmodel.Name;
                newCarModelViewModel.BrandName = _db.Brand.Where(brand => brand.Id == carmodel.BrandId).First().Name;
                newCarModelViewModel.BrandId = carmodel.BrandId;
                newCarModelViewModel.NbSeats = carmodel.NbSeats;

                this.carmodelViewModels.Add(newCarModelViewModel);
            }
        }

    }
}
