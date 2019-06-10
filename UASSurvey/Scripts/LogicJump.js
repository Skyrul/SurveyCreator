const LogicJump = function () {

    _LogicType = null;

    _setLogicType = (questionType) => {        
        _LogicType = LogicCreator.init(questionType);
    };

    _fetchLogicJump = (objIds = { surveyId: 0, questionId: 0 }) => {
        //http://localhost/uapi/api/Questions/GetLogicJumpByQIDSID/1552/130
        const path = "/uapi/api/Questions/GetLogicJumpByQIDSID/" + objIds.surveyId + "/" + objIds.questionId;
        var form_url = Object.is(window.location.hostname, 'localhost') ? "http://localhost" : "http://208.92.193.140";
        form_url += path;

        return $.ajax({
            url: form_url,
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

    _fillChoicesLogicJump = (Data) => {
        let w = 1;
        while (document.getElementById("choice_" + w)) {
            document.getElementById("choice_" + w).innerHTML = Data[w - 1].Answer;
            ++w;
        }
    };

    _fillChoicesOnlyByQuestionType = (questionType) => {
//        alert("questionType" + questionType);
        _setLogicType(questionType);        
        _LogicType.createLabelsAndInputs();        
    };

    _fillJumpsLogicJump = (Data) => {
        let a = 1; 
        while (document.getElementById("select_choice_" + a)) { 
            document.getElementById("select_choice_" + a).value = Data[a - 1].JumpToQuestionD;
            ++a;
        }
    }

    _fillLogicJump = (objIds = { surveyId: 0, questionId: 0 }) => {
        $.when(_fetchLogicJump(objIds)).done((dataFetched) => {
            dataFetched ? (() => {                
                //_fillChoicesLogicJump(dataFetched);
                _fillJumpsLogicJump(dataFetched);
            })() : (() => {
                
            })();
        });
    };

    _link = (event) => {

        if (document.getElementById("logic_jump_checkbox").checked) {
            document.getElementById("view_logicJump").setAttribute("style", "display:inline-block;");
        }
        else {
            document.getElementById("view_logicJump").setAttribute("style", "display:none;");            
        }

    };

    _setListeners = () => {

    };


    _saveLogic = (data) => {

        const InsertLogic = (num, questionId) => {

            const theLogicJump = ((questionId) => {
                return document.getElementById("logic_jump_checkbox").checked ? (() => {
                    return {
                        "SurveyID": parseInt(sessionStorage.getItem("SurveyID")),
                        "QuestionID": parseInt(questionId),
                        "QuestionType": GlobalVariables.currentQuestionType,
                        "Answer": document.getElementById("choice_" + num).innerHTML,
                        "JumpToQuestionD": (() => { let e = document.getElementById("select_choice_" + num); return parseInt(e.options[e.selectedIndex].value); })(),
                        "JumpToQuestiontext": (() => { let e = document.getElementById("select_choice_" + num); return e.options[e.selectedIndex].text; })()
                    };
                })() : {};
            })(questionId);
            //console.log("theLogicJump");
            //console.log(theLogicJump);
            //debugger;

            var dataforsaving = null;
            var surl = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/Questions/InsertLogicJump/" : "http://208.92.193.140/uapi/api/Questions/InsertLogicJump/";

            $.ajax({
                url: surl,
                data: JSON.stringify(theLogicJump),
                dataType: "json",
                type: "POST",
                contentType: 'application/json',
                success: function (data) {
                    //alert("success");
                    //console.log(data);
                    //debugger;
                    //$("#m_sweetalert_demo_3_3").click();
                    //window.location.reload(true);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.warn(XMLHttpRequest.status);
                    console.warn(errorThrown);
                    debugger;
                    window.location.reload(true);
                }
            });
        };

        let n = 1;
        while (document.getElementById("select_choice_" + n)) {
            InsertLogic(n, data);
            ++n;
        }
    };



    return {
        fill: _fillLogicJump,
        link: _link,
        fillChoicesByQuestionType: _fillChoicesOnlyByQuestionType,
        save: _saveLogic
    };
}();