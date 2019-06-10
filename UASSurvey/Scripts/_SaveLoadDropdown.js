
const _SaveLoadDropdown = function () {

    _loadSelectedAnswerByQuestionId = (questionId) => {
        let answerjson = UserResponse.load(questionId);
        answerjson.then((data) => {
            if (data) {
                _getAnswerId(data);
                const theAnswer = data[data.length - 1]["AnswerJson"]["dropdown_"]["answer"];
                const currentSequence = document.getElementById("current_sequence_number").value;
                document.getElementById("selectoptionsdropdown_sequence_" + currentSequence).value = theAnswer;
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
            const rawDataObject = {
                surveyid: parseInt(document.getElementById("surveyId").value),
                questionid: parseInt(document.getElementById("current_questionId").value),
                contactid: parseInt(document.getElementById("current_question_userId").value),
                answerid: parseInt(document.getElementById("current_answerId").value),
                AnswerJSON: _createJSONString({
                    "dropdown_": {
                        "answer": document.getElementById("selectoptionsdropdown_sequence_" + seq_num).value
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
                "Answers": [document.getElementById("selectoptionsdropdown_sequence_" + seq_num).value]
            });            

        },

        load: () => {
            this._loadSelectedAnswerByQuestionId(parseInt(document.getElementById("current_questionId").value));
        }

    };
}();