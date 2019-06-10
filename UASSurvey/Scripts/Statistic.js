const Statistic = function () {  
    _aggregator = null;

    _getAggregate = (questionId, part, answer) => {
        const _rawData = {
            "QuestionID": questionId,
            "Part": part,
            "Answer": answer
        };
        debugger;
        const _targetUrlPost = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/Answers/GetStatAnswerByQuestionID/" : "http://208.92.193.140/uapi/api/Answers/GetStatAnswerByQuestionID/";
            return $.ajax({
                url: _targetUrlPost,
                data: JSON.stringify(_rawData),
                dataType: "json",
                type: "POST",
                contentType: 'application/json',
                success: function (data) {
                    console.log("data:", data);
                    //alert("success: user response saved");                
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.warn(XMLHttpRequest.status);
                    console.warn(errorThrown);
                    debugger;
                    //window.location.reload(true);
                }
            });
    };

    _aggregate = (questionDetails, questionId) => {
        //console.info("questiontype: ", questionDetails.questiontype);
        if (            
            Object.is(questionDetails.questiontype, "multistatement_")
        ) {            
            _aggregator = AggregateType.ontype(questionDetails.questiontype);            
            _aggregator.init(questionId, questionDetails);            
            _aggregator.fetch().then((fulfilled) => {
                _aggregator.drawChart();
                // perhaps return the drawChart function back to summary?
                //google.charts.setOnLoadCallback(func);          
            });
        }

                
    };

    _fetchNumberOfParts = (surveyId, questionId) => {
        const path = "/uapi/api/Answers/GetNumberOfParts/" + surveyId + "/" + questionId;
        var form_url = Object.is(window.location.hostname, 'localhost') ? "http://localhost" : "http://208.92.193.140";
        form_url += path;
        return $.ajax({
            url: form_url,
            dataType: "json",
            type: "GET",
            contentType: 'application/json',
            success: function (data) {
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.warn(XMLHttpRequest.status);
                console.warn(errorThrown);
            }
        });
    };

    return {
        getAggregate: _getAggregate,
        aggregate: _aggregate,
        getNumberOfParts: _fetchNumberOfParts
    };
}();