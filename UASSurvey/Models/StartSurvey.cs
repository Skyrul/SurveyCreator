using System.ComponentModel.DataAnnotations;

namespace UASSurvey.Models
{
    public class StartSurvey
    {
        [Required(ErrorMessage = "This field is required")]
        [DataType(DataType.Text)]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "The Campaign ID must be within the range of 3 to 50 characters. ")]
        [Display(Name = "Campaign ID: ")]
        public string CampaignId { get; set; }

        [Required(ErrorMessage = "This field is required")]
        [DataType(DataType.Text)]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "The Survey Name must be within the range of 3 to 50 characters. ")]
        [Display(Name = "Survey Name: ")]
        public string SurveyName { get; set; }

        [Required(ErrorMessage = "This field is required")]
        [DataType(DataType.DateTime)]
        [Display(Name = "Start Date: ")]
        public string StartDate { get; set; }


        [DataType(DataType.DateTime)]
        [Display(Name = "End Date (Optional): ")]
        public string EndDate { get; set; }

        [Required(ErrorMessage = "This field is required")]
        [DataType(DataType.MultilineText)]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "The Survey Objective must be within the range of 3 to 50 characters. ")]
        [Display(Name = "Survey Objective: ")]
        public string SurveyObjective { get; set; }

        [Required(ErrorMessage = "This field is required")]
        [DataType(DataType.Text)]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "The Survey Type must be selected. ")]
        [Display(Name = "Survey Type: ")]
        public string SurveyType { get; set; }

        [Required(ErrorMessage = "This field is required")]
        [DataType(DataType.Text)]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "The Survey Name must be selected. ")]
        [Display(Name = "Survey Name: ")]
        public string CampaignName { get; set; }

    }
}