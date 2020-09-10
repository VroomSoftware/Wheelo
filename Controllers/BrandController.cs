using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using WheeloSolution.Models;
using WheeloSolution.Data;

namespace WheeloSolution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {

        List<Brand> brands;

        private ApplicationDbContext _db;


        public BrandController( ApplicationDbContext db)
        {
            _db = db;
            var brandsFromDatabase = _db.Brand.ToList();
            this.brands = new List<Brand>();
            this.brands.AddRange(brandsFromDatabase);
        }


        [HttpGet]
        public async Task<IActionResult> GetBrands()
        {
            this.brands = _db.Brand.ToList();
            return Ok(JsonSerializer.Serialize(this.brands));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrand([FromRoute] int id)
        {

            Brand brand = _db.Brand.SingleOrDefault(p => p.Id == id);
            if (brand == null)
            {
                return NotFound();
            }
            return Ok(JsonSerializer.Serialize(brand));

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand([FromRoute] int id)
        {
            _db.Brand.Remove(_db.Brand.Find(id));
            _db.SaveChanges();
            brands=_db.Brand.ToList();

            return Ok(JsonSerializer.Serialize(brands));

        }

        [HttpPost]
        public async Task<IActionResult> AddBrand([FromBody] Brand newBrand)
        {
            if (newBrand.Id <= 0)
            {
                var brand = new Brand();
                brand.Name=newBrand.Name;
                _db.Brand.Add(brand);
                _db.SaveChanges();
                brands = _db.Brand.ToList();
            }
            return Ok(JsonSerializer.Serialize(brands));

        }

        [HttpPut]
        public async Task<IActionResult> EditBrands([FromBody] Brand brand)
        {
            var index = -1;
            foreach (Brand iBrand in brands)
            {
                if (iBrand.Id == brand.Id)
                {
                    index = this.brands.IndexOf(iBrand);
                }
            }
            if(index < 0)
            {
                return NotFound(JsonSerializer.Serialize(this.brands));
            }
            else
            {
                Brand selectedBrand = _db.Brand.Where(p => p.Id == brand.Id).FirstOrDefault();
                _db.Entry(selectedBrand).CurrentValues.SetValues(brand);
                _db.SaveChanges();
                this.brands = _db.Brand.ToList();
                return Ok(JsonSerializer.Serialize(this.brands));
            }


        }

    }
}
