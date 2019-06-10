using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UASSurvey.Models
{
    public class SurveyList
    {
        public int SurveyID { get; set; }
        public int CampaignID { get; set; }
        public string SurveyName { get; set; }
        public string CreateDate { get; set; }
        public string CreatedBy { get; set; }
        public string Notes { get; set; }
    }
}