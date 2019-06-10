$(function () {
    let options = {
        autoclose: true,
        format: 'yyyy-mm-dd'
    };
    $("#start_datepicker").datepicker(options);
    $("#end_datepicker").datepicker(options);
});

const saveNewSurvey = () => {
    const _rawData = {
        "SurveyID": 0,
        "CampaignID": parseInt(document.getElementById("CampaignName").value),
        "SurveyName": document.getElementById("SurveyName").value,
        "Objective": document.getElementById("SurveyObjective").value, 
        "SurveyType": document.getElementById("SurveyType").value,
        "CreateDate": $('#start_datepicker').datepicker('getDate'),
        "CreatedBy": sessionStorage.Firstname + " " + sessionStorage.Lastname,
        "AccountNumber": parseInt(sessionStorage.AccountNumber),
        "UserID": parseInt(sessionStorage.Userid)
    };
    const _targetUrlPost = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/Survey/" : "http://208.92.193.140/uapi/api/Survey/";    
    return $.ajax({
        url: _targetUrlPost,
        data: JSON.stringify(_rawData),
        dataType: "json",
        type: "POST",
        contentType: 'application/json',
        success: function (data) {
            //alert("success: survey saved");                
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            swal("Error! Status " + XMLHttpRequest.status, "Error! " + errorThrown, "error");
            //console.warn(XMLHttpRequest.status);
            //console.warn(errorThrown);
            //debugger;
            //window.location.reload(true);
        }
    });

};

const createNewSurvey = (event) => {
    const theId = event.currentTarget.id;
    const todo = theId.split('_');
    const redirect = () => {
        if (todo[1] === "return") {
            window.location = Object.is(window.location.hostname, 'localhost') ? "http://localhost/Surveys/SurveyList/SurveyList" : "http://208.92.193.140/Surveys/SurveyList/SurveyList";
        }
        else {
            window.location = Object.is(window.location.hostname, 'localhost') ? "http://localhost/Surveys/Design/Design" : "http://208.92.193.140/Surveys/Design/Design";
        }
    };
    $.when(saveNewSurvey()).done((str) => {
        sessionStorage.currentSurveyName = document.getElementById("SurveyName").value;
        sessionStorage.currentSurveyID = str;
        redirect();
    });

    
    
};
document.getElementById("save_return").addEventListener("click", (event) => createNewSurvey(event));
document.getElementById("save_create").addEventListener("click", (event) => createNewSurvey(event));