using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using WheeloSolution.Models;
using WheeloSolution.ViewModels;
using WheeloSolution.Data;

namespace WheeloSolution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuelController : ControllerBase
    {

        List<Fuel> fuels;

        private ApplicationDbContext _db;


        public FuelController( ApplicationDbContext db)
        {
            _db = db;
            var fuelsFromDatabase = _db.Fuel.ToList();
            this.fuels = new List<Fuel>();
            this.fuels.AddRange(fuelsFromDatabase);
        }


        [HttpGet]
        public async Task<IActionResult> GetFuels()
        {
            this.fuels = _db.Fuel.ToList();
            return Ok(JsonSerializer.Serialize(this.fuels));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFuel([FromRoute] int id)
        {

            Fuel fuel = _db.Fuel.SingleOrDefault(p => p.Id == id);
            if (fuel == null)
            {
                return NotFound();
            }
            return Ok(JsonSerializer.Serialize(fuel));

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFuel([FromRoute] int id)
        {
            _db.Fuel.Remove(_db.Fuel.Find(id));
            _db.SaveChanges();
            fuels=_db.Fuel.ToList();

            return Ok(JsonSerializer.Serialize(fuels));

        }

        [HttpPost]
        public async Task<IActionResult> AddFuel([FromBody] Fuel newFuel)
        {
            if (newFuel.Id <= 0)
            {
                var fuel = new Fuel();
                fuel.Name=newFuel.Name;
                _db.Fuel.Add(fuel);
                _db.SaveChanges();
                fuels = _db.Fuel.ToList();
            }
            return Ok(JsonSerializer.Serialize(fuels));

        }

        [HttpPut]
        public async Task<IActionResult> EditFuels([FromBody] Fuel fuel)
        {
            var index = -1;
            foreach (Fuel iFuel in fuels)
            {
                if (iFuel.Id == fuel.Id)
                {
                    index = this.fuels.IndexOf(iFuel);
                }
            }
            if(index < 0)
            {
                return NotFound(JsonSerializer.Serialize(this.fuels));
            }
            else
            {
                Fuel selectedFuel = _db.Fuel.Where(p => p.Id == fuel.Id).FirstOrDefault();
                _db.Entry(selectedFuel).CurrentValues.SetValues(fuel);
                _db.SaveChanges();
                this.fuels = _db.Fuel.ToList();
                return Ok(JsonSerializer.Serialize(this.fuels));
            }


        }

    }
}
