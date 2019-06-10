using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UASSurvey.Models
{
    public class AccountModels
    {
    }
    public class AppLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    public class Account
    {
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string MoblePhone { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }


    }
}