const _SaveLoadYesno = function () {

    _loadYesnoAnswerByQuestionId = (questionId) => {
        let answerjson = UserResponse.load(questionId);
        answerjson.then((data) => {
            if (data) {
                _getAnswerId(data);
                const theAnswer = data[data.length - 1]["AnswerJson"]["yesno_"]["answer"];
                const currentSequence = document.getElementById("current_sequence_number").value;
                document.getElementById(theAnswer).checked = true;
            }
        });
        answerjson.catch((err) => {
            console.info("UAS: Currently not getting a good response. ");
            console.warn(err);
        });
    };    

    return {
        save: () => {
            const seq_num = document.getElementById("current_sequence_number").value;
            const theAnswerId = document.querySelector('input[name="yesnocommon"]:checked').id;
            //_saveQuestionById_localStorage(rawDataObject);
            //_saveQuestionById({
            //    surveyid: parseInt(document.getElementById("surveyId").value),
            //    questionid: parseInt(document.getElementById("current_questionId").value),
            //    contactid: parseInt(document.getElementById("current_question_userId").value),
            //    answerid: parseInt(document.getElementById("current_answerId").value),
            //    AnswerJSON: _createJSONString({
            //        "yesno_": {
            //            "answer": theAnswerId
            //        }
            //    })
            //});

            _saveQuestionById(
                {
                    surveyid: parseInt(document.getElementById("surveyId").value),
                    questionid: parseInt(document.getElementById("current_questionId").value),
                    contactid: parseInt(document.getElementById("current_question_userId").value),
                    answerid: parseInt(document.getElementById("current_answerId").value),
                    AnswerJSON: _createJSONString({
                        "yesno_": {
                            "answer": theAnswerId
                        }
                    })
                },
                {
                "ContactID": parseInt(document.getElementById("current_question_userId").value),
                "SurveyID": parseInt(document.getElementById("surveyId").value),
                "QuestionID": parseInt(document.getElementById("current_questionId").value),
                "PartsCount": 1,
                "Parts": [1],
                "Answers": [theAnswerId.split("_")[0]]
                }
            );

        },

        load: () => {
            this._loadYesnoAnswerByQuestionId(parseInt(document.getElementById("current_questionId").value));
        }

    };
}();