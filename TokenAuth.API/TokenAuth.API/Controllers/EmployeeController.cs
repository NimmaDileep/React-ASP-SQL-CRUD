using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TokenAuth.API.Data;

namespace TokenAuth.API.Controllers
{
    public class EmployeeController : ApiController
    {
        ApplicationDbContext dbContext = new ApplicationDbContext();

        /*[Authorize(Roles = ("User"))]
        public HttpResponseMessage GetEmployeeById(int id)
        {
            var user = dbContext.Employees.FirstOrDefault(e => e.Id == id);
            return Request.CreateResponse(HttpStatusCode.OK, user);
        }*/

        [Authorize(Roles = ("User, Admin, SuperUser"))]
        [Route("api/Employee/GetSomeEmployees")]
        public HttpResponseMessage GetEmployees()
        {
            var user = dbContext.Employees.ToList();
            return Request.CreateResponse(HttpStatusCode.OK, user);
        }

    }
}
