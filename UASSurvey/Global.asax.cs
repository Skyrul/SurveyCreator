using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using System.Web.Routing;

namespace UASSurvey
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_PreSendRequestHeaders()
        {
            Response.Headers.Remove("X-Frame-Options");
            Response.AddHeader("X-Frame-Options", "AllowAll");

        }


        protected void Application_Start()
        {
            AntiForgeryConfig.SuppressXFrameOptionsHeader = true;
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            
        }
    }
}
