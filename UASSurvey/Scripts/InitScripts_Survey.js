if (sessionStorage.Userid) {
    document.getElementById("current_question_userId").value = sessionStorage.Userid;
    document.getElementById("surveyId").value = sessionStorage.SurveyID;    
}
else {
    window.location = Object.is(window.location.hostname, 'localhost') ? "http://localhost/Surveys/Account/Login" : "http://208.92.193.140/Surveys/Account/Login";
}
