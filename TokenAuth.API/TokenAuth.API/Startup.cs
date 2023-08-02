﻿using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Threading.Tasks;
using System.Web.Http;
using TokenAuth.API.Provider;

[assembly: OwinStartup(typeof(TokenAuth.API.Startup))]

namespace TokenAuth.API
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            OAuthAuthorizationServerOptions options = new OAuthAuthorizationServerOptions
            {
                //http and Https
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"), //https://localhost:44316/token
                AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
                Provider = new AppAuthorizationServerProvider()
            };
            app.UseOAuthAuthorizationServer(options);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
        }
    }
}
