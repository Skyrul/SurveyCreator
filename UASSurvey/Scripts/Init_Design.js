(sessionStorage.Userid) ? (() => {
    if (sessionStorage.currentSurveyName) {
        if (Object.is(window.location.port, '55896')) {
            window.location = "http://localhost/Surveys/Design/Design";
        }
    }
    else {
        window.location = Object.is(window.location.hostname, 'localhost') ? "http://localhost/Surveys/SurveyList/SurveyList" : "http://208.92.193.140/Surveys/SurveyList/SurveyList";
    }

})() : (() => {
        window.location = Object.is(window.location.hostname, 'localhost') ? "http://localhost/Surveys/Account/Login" : "http://208.92.193.140/Surveys/Account/Login";
    })();
    
