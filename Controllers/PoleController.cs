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
    public class PoleController : ControllerBase
    {

        List<Pole> poles;

        private ApplicationDbContext _db;


        public PoleController( ApplicationDbContext db)
        {
            _db = db;
            var polesFromDatabase = _db.Pole.ToList();
            this.poles = new List<Pole>();
            this.poles.AddRange(polesFromDatabase);
        }


        [HttpGet]
        public async Task<IActionResult> GetPoles()
        {
            this.poles = _db.Pole.ToList();
            return Ok(JsonSerializer.Serialize(this.poles));

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPole([FromRoute] int id)
        {

            Pole pole = _db.Pole.SingleOrDefault(p => p.Id == id);
            if (pole == null)
            {
                return NotFound();
            }
            return Ok(JsonSerializer.Serialize(pole));

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePole([FromRoute] int id)
        {
            _db.Pole.Remove(_db.Pole.Find(id));
            _db.SaveChanges();
            poles=_db.Pole.ToList();

            return Ok(JsonSerializer.Serialize(poles));

        }

        [HttpPost]
        public async Task<IActionResult> AddPole([FromBody] Pole newPole)
        {
            if (newPole.Id <= 0)
            {
                var pole = new Pole();
                pole.Name=newPole.Name;
                pole.Address=newPole.Address;
                pole.City=newPole.City;
                pole.Cp=newPole.Cp;
                _db.Pole.Add(pole);
                _db.SaveChanges();
                poles = _db.Pole.ToList();
            }
            return Ok(JsonSerializer.Serialize(poles));

        }

        [HttpPut]
        public async Task<IActionResult> EditPole([FromBody] Pole pole)
        {
            var index = -1;
            foreach (Pole iPole in poles)
            {
                if (iPole.Id == pole.Id)
                {
                    index = this.poles.IndexOf(iPole);
                }
            }
            if(index < 0)
            {
                return NotFound(JsonSerializer.Serialize(this.poles));
            }
            else
            {
                Pole selectedPole = _db.Pole.Where(p => p.Id == pole.Id).FirstOrDefault();
                _db.Entry(selectedPole).CurrentValues.SetValues(pole);
                _db.SaveChanges();
                this.poles = _db.Pole.ToList();
                return Ok(JsonSerializer.Serialize(this.poles));
            }


        }

    }
}
