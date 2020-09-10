using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using WheeloSolution.Models;
using WheeloSolution.ViewModels;
using WheeloSolution.Data;
using Microsoft.EntityFrameworkCore;

namespace WheeloSolution.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        List<User> users;

        private ApplicationDbContext _db;

        public UserController( ApplicationDbContext db)
        {
            _db = db;
            var usersFromDatabase = _db.User.ToList();
            this.users = new List<User>();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] string idAspNetUser)
        {

            User user = _db.User.FirstOrDefault(u => u.IdAspNetUser == idAspNetUser);
            if (user == null)
            {
                return NotFound();
            }

            user.UserPole = _db.Pole.Where(p => p.Id == user.UserPoleId).FirstOrDefault();
            user.UserRight = _db.Right.Where(r => r.RightId == user.UserRightId).FirstOrDefault();
            return Ok(JsonSerializer.Serialize(user));

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {

            this.users = _db.User.ToList();
            
            int index = 0;

            for (index = 0; index < this.users.Count(); index++)
            {
                this.users[index].UserPole = _db.Pole.Where(p => p.Id == this.users[index].UserPoleId).FirstOrDefault();
                this.users[index].UserRight = _db.Right.Where(r => r.RightId == this.users[index].UserRightId).FirstOrDefault();
            }

            return Ok(JsonSerializer.Serialize(this.users));

        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User newUser)
        {
            if (newUser.Id <= 0)
            {
                User user = new User();
                user.IdAspNetUser = newUser.IdAspNetUser;
                user.Email = newUser.Email;
                user.Firstname = newUser.Firstname;
                user.LastName = newUser.LastName;
                user.LicenceId = newUser.LicenceId;
                user.Password = newUser.Password;
                user.Phone = newUser.Phone;
                user.UserRightId = newUser.UserRightId;
                user.UserPoleId = newUser.UserPoleId;

                _db.User.Add(user);
                _db.SaveChanges();
                this.users = _db.User.ToList();
            }
            return Ok(JsonSerializer.Serialize(this.users));

        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] User oldUser)
        {
            var index = 0;
            foreach (User iUser in this.users)
            {
                if (iUser.Id == oldUser.Id)
                {
                    index = this.users.IndexOf(iUser);
                }
            }
            if (index < 0)
            {
                return NotFound(JsonSerializer.Serialize(this.users));
            }
            User selectedUser = _db.User.Where(u => u.Id == oldUser.Id).FirstOrDefault();
            _db.Entry(selectedUser).CurrentValues.SetValues(oldUser);
            _db.SaveChanges();
            this.users = _db.User.ToList();

            return Ok(JsonSerializer.Serialize(this.users));

        }

    }
}
