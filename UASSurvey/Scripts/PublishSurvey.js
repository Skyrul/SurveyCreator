
let PublishSurvey = function () {
    this.questionIds = [];

    this.getNumberOfQuestions = () => { return questionIds.length; };

    this.create = (publisherFunction) => {
        $.when(_getQuestions()).done(function (questions) {
            setQuestionIds(questions);
            publishByIds();
            publisherFunction();
        });
    };


    setQuestionIds = (questions) => {
        //let all_questions = JSON.parse(questions);
        let all_questions = questions;
        for (let q in all_questions) {
            questionIds.push(parseInt(all_questions[q]["questionid"]));
        }
        //questionIds.sort();        
        console.log(questionIds);
    };
    publishByIds = () => {
        for (let r = 1; r <= questionIds.length; ++r) {
            $.when(getQuestionById(questionIds[r - 1])).done((responseText) => {
                //var res = responseText.replace(/(\\r\\n|\\n|\\r)/gm, '').replace(/[\\]/gi, '');                
                let focusQuestion = responseText;
                new QuestionType(focusQuestion, (r), this.getNumberOfQuestions()).setElement();
            });
        }
    };

    getQuestionById = (id) => {
        var qdatafromapi = null;
        var form_url = Object.is(window.location.hostname, 'localhost') ? "../../../uapi/api/questions/" + id : "http://208.92.193.140/uapi/api/questions/" + id;
        return $.ajax({
            url: form_url,
            //        data: JSON.stringify(questions),
            dataType: "json",
            type: "GET",
            contentType: 'application/json',
            success: function (data) { },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.warn(XMLHttpRequest.status);
                console.warn(errorThrown);
            }
        });
    };

    _getQuestions = () => {
        var datafromapi = null;
        const targetPath = "/uapi/api/questions/"+sessionStorage.SurveyID+"?userid="+sessionStorage.Userid+"&accountnumber="+sessionStorage.AccountNumber;
        var form_url = Object.is(window.location.hostname, 'localhost') ? "http://localhost" : "http://208.92.193.140";
        form_url += targetPath;

        return $.ajax({
            url: form_url,
            //        data: JSON.stringify(questions),
            dataType: "json",
            type: "GET",
            contentType: 'application/json',

            success: function (data) {

                datafromapi = data;

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.warn(XMLHttpRequest.status);
                console.warn(errorThrown);
            }
        });

    };
    setListeners = () => {
        const standardButtonWidthStyle = "width:150px;";
        const doneButtonVisibility = (currentSequence) => {
            if (Object.is(currentSequence, this.getNumberOfQuestions())) {
                document.getElementById("done_button_publish").setAttribute("style", "width:150px;");
            }
            else {
                document.getElementById("done_button_publish").setAttribute("style", "display:none;");
            }
        };

        const hideCurrentQuestion = (currentSequence) => {
            document.getElementsByClassName("sequence_" + currentSequence)[0].setAttribute("style", "display:none;");
            let currentClassName = (document.getElementsByClassName("sequence_" + currentSequence)[0].className) + "";
            document.getElementsByClassName("sequence_" + currentSequence)[0].className = currentClassName.replace("active", "");
        };

        const unhideNextQuestion = (currentSequence) => {
            if (currentSequence <= this.getNumberOfQuestions()) {
                document.getElementsByClassName("sequence_" + currentSequence)[0].setAttribute("style", "display:inline-block;");
                document.getElementsByClassName("sequence_" + currentSequence)[0].className += " active";
                document.getElementById("current_question_type").value = ((theId) => {
                    return theId.split("_")[0] + "_";                    
                })(document.getElementsByClassName("sequence_" + currentSequence)[0].getAttribute("id"));
                doneButtonVisibility(currentSequence);
            }
        };

        const updateProgress = (currentSequence) => {
            let currentPercentageComplete = (Object.is(currentSequence, 1)) ? 0 : Math.round((currentSequence / this.getNumberOfQuestions()) * 100) - 3;

            document.getElementById("current_sequence_number").value = "" + currentSequence;
            document.getElementById("progressbar").setAttribute("style", "width:" + currentPercentageComplete + "%;");
            document.getElementById("progressbar_number").innerHTML = currentPercentageComplete;
        };

        const setDatePicker = () => { document.getElementsByClassName("datepicker_position")[0].setAttribute("style", "display:block;"); };
        const removeDatePicker = () => { document.getElementsByClassName("datepicker_position")[0].setAttribute("style", "display:none;"); };

        const setExceptions = (currentSequence) => {
        };

        const setCurrentQuestionId = () => {
            const seqNum = parseInt(document.getElementById("current_sequence_number").value);
            document.getElementById("current_questionId").value = PublishSurvey.getQuestionIds()[seqNum - 1];
        };

        const validate = (proceedFunction) => {
            if (Validation.isRequired()) {
                (Validation.isComplete({
                    "required": (document.getElementById("is_required_" + "sequence_" + parseInt(document.getElementById("current_sequence_number").value)).value),
                    "type": document.getElementById("current_question_type").value,
                    "currentSequence": parseInt(document.getElementById("current_sequence_number").value)
                })) ? (() => { proceedFunction(); })() : (() => {
                    const doNotProceed = (() => {
                        swal("Cannot proceed!", "Please complete this question to continue.", "error");
                    })();
                    return;
                })();
            }
            else {
                proceedFunction();
            }
        };

        $(document).on("click", "#previous_button_publish", (e) => {            
            const currentType = document.getElementById("current_question_type").value;
            let currentSequence = parseInt(document.getElementById("current_sequence_number").value);                     
            const saveAndContinue = () => {
                SaveAnswer.save();
                let currentSequence = parseInt(document.getElementById("current_sequence_number").value);
                hideCurrentQuestion(currentSequence);
                setExceptions(--currentSequence);

                document.getElementById("current_sequence_number").value = currentSequence;
                if (Object.is(currentSequence, 1)) {
                    document.getElementById("previous_button_publish").setAttribute("style", "display:none;");
                    document.getElementById("next_button_publish").setAttribute("style", "display:inline-block;" + standardButtonWidthStyle);
                }
                else {
                    document.getElementById("previous_button_publish").setAttribute("style", "display:inline-block;" + standardButtonWidthStyle);
                    document.getElementById("next_button_publish").setAttribute("style", "display:inline-block;" + standardButtonWidthStyle);
                }
                unhideNextQuestion(currentSequence);
                updateProgress(currentSequence);
                setCurrentQuestionId();
                SaveAnswer.load();
            };

            validate(saveAndContinue);
            
        });
        $(document).on("click", "#next_button_publish", (e) => {  
            const currentType = document.getElementById("current_question_type").value;
            let currentSequence = parseInt(document.getElementById("current_sequence_number").value);
            
            const saveAndContinue = () => {
                SaveAnswer.save();
                hideCurrentQuestion(currentSequence);
                setExceptions(++currentSequence);
                document.getElementById("current_sequence_number").value = currentSequence;
                const addExceptionNextButtonOfFinalQuestion = ((next_button_action) => {
                    if (Object.is(currentSequence, this.getNumberOfQuestions())) {
                        document.getElementById("next_button_publish").setAttribute("style", "display:none;");
                        document.getElementById("previous_button_publish").setAttribute("style", "display:inline-block;" + standardButtonWidthStyle);
                    }
                    else {
                        document.getElementById("next_button_publish").setAttribute("style", "display:inline-block;" + standardButtonWidthStyle);
                        document.getElementById("previous_button_publish").setAttribute("style", "display:inline-block;" + standardButtonWidthStyle);
                    }
                })();
                unhideNextQuestion(currentSequence);
                updateProgress(currentSequence);
                setCurrentQuestionId();
                SaveAnswer.load();
            };

            validate(saveAndContinue);
        });
        if (document.getElementById("done_button_publish")) {
            document.getElementById("done_button_publish").addEventListener("click", () => {
                //swal({
                //    position: 'top-right',
                //    type: 'success',
                //    title: 'You completed the Survey!',
                //    showConfirmButton: true,
                //    timer: 1500
                //});

            });
        }
        
    };

    this.getSurveyIdFromLocal = () => {
        SaveAnswer.setSurveyId(sessionStorage.SurveyID);
        //localStorage.removeItem("currentSurveyId");
    };

    this.publish = () => {
        this.getSurveyIdFromLocal();
        this.create(setListeners);
    };

    return {
        init: this.publish,
        getQuestionIds: () => {
            return this.questionIds;
        },
        getQuestions: _getQuestions
    };

} ();

(() => { PublishSurvey.init(); })();
