using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TokenAuth.API.Data;
using TokenAuth.API.Models;
using TokenAuth.API.UserRepository;

namespace TokenAuth.API.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        private UserRepo userRepo;

        public UserController()
        {
            userRepo = new UserRepo();
        }

        [Route("")]
        [HttpPost]
        public HttpResponseMessage PostUser(User user)
        {
            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Username or Password cannot be empty");
            }

            if (userRepo.ValidateUser(user.UserName, user.Password) != null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "User already exists");
            }

            ApplicationDbContext dbContext = new ApplicationDbContext();
            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.Created, user);
        }

        [Route("{username}")]
        [HttpGet]
        public HttpResponseMessage GetUser(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Username cannot be empty");
            }

            var user = userRepo.GetUserByUsername(username);

            if (user == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "User not found");
            }

            return Request.CreateResponse(HttpStatusCode.OK, user);
        }


        // Dispose UserRepo when done
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                userRepo.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
