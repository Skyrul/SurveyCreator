
let UserResponse = function () {
    const _targetUrlPost = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/Answers/" : "http://208.92.193.140/uapi/api/Answers/";
    const _targetStatisticPost = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/Answers/SetEachAnswer/" : "http://208.92.193.140/uapi/api/Answers/SetEachAnswer/";
    let _rawData = new Object();
    let _actualAnswers = new Object();
    let _questionIdForGET = new Number();

    const _setActualAnswers = (data) => {                
        _actualAnswers = data;
        //debugger;
        //{
        //    "ContactID": data.contactid,
        //    "SurveyID": data.surveyid,
        //    "QuestionID": data.questionid,
        //    "PartsCount": 5  
        //    "Parts": [1,2,..],
        //    "Answers": ["","223",..]
        //}

    };
    const _setData = (data, actualAnswers) => {
        if (data) { _rawData = data; }
        else { _rawData = null; }
        
        _setActualAnswers(actualAnswers);
    };
    
    const _getData = () => { return _rawData; };

    const _postEachAnswerPart = (_currentPartAnswer) => {       
        return $.ajax({
            url: _targetStatisticPost,
            data: JSON.stringify(_currentPartAnswer),
            dataType: "json",
            type: "POST",
            contentType: 'application/json',
            success: function (data) {
                //alert("success: user response saved");                
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

    const _postToStat = () => {
        for (let x = 1; x <= parseInt(_actualAnswers["PartsCount"]); ++x){        
            _postEachAnswerPart({
                "ContactID": _actualAnswers["ContactID"],
                "SurveyID": _actualAnswers["SurveyID"],
                "QuestionID": _actualAnswers["QuestionID"],
                "Part": _actualAnswers["Parts"][x-1],
                "Answer": _actualAnswers["Answers"][x-1]
            });
        }
    };

    const _postToAnswers = () => {
        return $.ajax({
            url: _targetUrlPost,
            data: JSON.stringify(_rawData),
            dataType: "json",
            type: "POST",
            contentType: 'application/json',
            success: function (data) {
                //alert("success: user response saved");                
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                swal("Error! Status " + XMLHttpRequest.status, "Error! " + errorThrown, "error");
                //console.warn(XMLHttpRequest.status);
                //console.warn(errorThrown);                
                //window.location.reload(true);
            }
        });        
    };

    const _postToDb = () => {
        if (_rawData) {
            return $.when(_postToStat(), _postToAnswers()).done((res1, res2) => { });
        }
        else {
            return $.when(_postToStat()).done((res1) => { });
        }
        
    };


    const _postToDb___ = () => {
        return $.ajax({
            url: _targetUrlPost,
            data: JSON.stringify(_rawData),
            dataType: "json",
            type: "POST",
            contentType: 'application/json',
            success: function (data) {
                //alert("success: user response saved");                
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                swal("Error! Status " + XMLHttpRequest.status, "Error! " + errorThrown, "error");
                //console.warn(XMLHttpRequest.status);
                //console.warn(errorThrown);
                
                //window.location.reload(true);
            }
        });
    };
    

    // deprecated
    const _getDataFromDb = () => {
        let _targetUrlGet = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/Answers/" : "http://208.92.193.140/uapi/api/Answers/";
        _targetUrlGet += _questionIdForGET;
        return $.ajax({
            url: _targetUrlGet,            
            dataType: "json",
            type: "GET",
            contentType: 'application/json',
            success: function (data) {
                // datafromapi = data.replace(/[\\]/gi, '');
                //console.log(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.warn(XMLHttpRequest.status);
                console.warn(errorThrown);


            }
        });
    };

    const _getDataFromDbBySQCID = () => {
        let surveyId = sessionStorage.SurveyID;
        let clientId = sessionStorage.Userid;
        let _targetUrlGet = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/Answers/GetAnswerBySQCID/" : "http://208.92.193.140/uapi/api/Answers/GetAnswerBySQCID/";
        _targetUrlGet += surveyId + "/";
        _targetUrlGet += _questionIdForGET + "/";
        _targetUrlGet += clientId;        
        return $.ajax({
            url: _targetUrlGet,
            dataType: "json",
            type: "GET",
            contentType: 'application/json',
            success: function (data) {
                // datafromapi = data.replace(/[\\]/gi, '');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.warn(XMLHttpRequest.status);
                console.warn(errorThrown);


            }
        });
    };


    const _setQuestionIdForGET = (questionId) => {
        _questionIdForGET = questionId;
    };

    const _saveToDb = (dataObject, actualAnswers) => {               
        _setData(dataObject, actualAnswers);        
        return _postToDb();
    };

    const _loadFromDb = (questionId) => {
        _setQuestionIdForGET(questionId);
        // set survey id
        // set client id
        return _getDataFromDbBySQCID();
        //return _getDataFromDb();
    };
    
    return {              
        save: _saveToDb,
        load: _loadFromDb,
    };

}();