using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetCore3._1API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCore3._1API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public EmployeesController(DatabaseContext context) 
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Employee>> Get() 
        {
            return Ok(_context.Employees.ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<Employee> Get(int id)
        {
            var employeeInDb = _context.Employees.FirstOrDefault(a => a.id == id);
            return Ok(employeeInDb);
        }

        [HttpPost]
        public ActionResult<Employee> Post(Employee employee) 
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
            return Ok(employee);
        }

        [HttpPut]
        public ActionResult<Employee> Put(Employee employee) 
        {
            var employeeInDb = _context.Employees.FirstOrDefault(a => a.id == employee.id);
            employeeInDb.name = employee.name;
            employeeInDb.email = employee.email;
            employeeInDb.password = employee.password;
            _context.SaveChanges();
            return Ok(employee);
        }

        [HttpDelete("{id}")]
        public ActionResult<Employee> Delete(int id) 
        {
            var employeeInDb = _context.Employees.FirstOrDefault(a => a.id == id);
            _context.Employees.Remove(employeeInDb);
            _context.SaveChanges();
            return Ok(employeeInDb);
        }
    }
}