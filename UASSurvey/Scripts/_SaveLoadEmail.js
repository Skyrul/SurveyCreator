const _SaveLoadEmail = function () {

    _loadEmailAnswerByQuestionId = (questionId) => {
        let answerjson = UserResponse.load(questionId);
        answerjson.then((data) => {
            if (data) {
                _getAnswerId(data);
                const theAnswer = data[data.length - 1]["AnswerJson"]["email_"]["answer"];
                const currentSequence = document.getElementById("current_sequence_number").value;
                document.getElementById("email_input_sequence_" + currentSequence).value = theAnswer;
            }
        });
        answerjson.catch((err) => {
            console.info("UAS: Currently not getting a good response, email ");
            console.warn(err);
        });
    };

    
    return {
        save: () => {
            const answerId = parseInt(document.getElementById("current_answerId").value);
            const rawDataObject = {
                surveyid: parseInt(document.getElementById("surveyId").value),
                questionid: parseInt(document.getElementById("current_questionId").value),
                contactid: parseInt(document.getElementById("current_question_userId").value),
                answerid: answerId,
                AnswerJSON: _createJSONString({ 
                    "email_": {
                        "answer": document.getElementById("email_input_sequence_" + document.getElementById("current_sequence_number").value).value
                    }
                })
            };              
            //_saveQuestionById_localStorage(rawDataObject);
            _saveQuestionById(rawDataObject, {
                "ContactID": rawDataObject.contactid,
                "SurveyID": rawDataObject.surveyid,
                "QuestionID": rawDataObject.questionid,
                "PartsCount": 1,
                "Parts": [1],
                "Answers": [document.getElementById("email_input_sequence_" + document.getElementById("current_sequence_number").value).value]
            });            

        },

        load: () => {
            this._loadEmailAnswerByQuestionId(parseInt(document.getElementById("current_questionId").value));
            //_loadFromStorage = (() => {
            //    const questionId = parseInt(document.getElementById("current_questionId").value);
            //    if (localStorage.getItem(questionId)) {
            //        const data = JSON.parse(JSON.parse(localStorage.getItem(questionId))["AnswerJSON"])["longtext_"]["answer"];
            //        const currentSequence = document.getElementById("current_sequence_number").value;
            //        document.getElementById("longtext_answertextarea_sequence_" + currentSequence).value = data;
            //    }
            //})();
        }

    };
}();