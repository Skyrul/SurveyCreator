﻿const _SaveLoadNumber = function () {

    _loadNumberAnswerByQuestionId = (questionId) => {
        let answerjson = UserResponse.load(questionId);
        answerjson.then((data) => {
            if (data) {
                _getAnswerId(data);
                const theAnswer = data[data.length - 1]["AnswerJson"]["number_"]["answer"];
                const currentSequence = document.getElementById("current_sequence_number").value;
                document.getElementById("number_answerinput_sequence_" + currentSequence).value = theAnswer;                
            }
        });
        answerjson.catch((err) => {
            console.info("UAS: Currently not getting a good response. ");
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
                    "number_": {
                        "answer": document.getElementById("number_answerinput_sequence_" + document.getElementById("current_sequence_number").value).value
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
                "Answers": [document.getElementById("number_answerinput_sequence_" + document.getElementById("current_sequence_number").value).value]
            });            

        },

        load: () => {
            this._loadNumberAnswerByQuestionId(parseInt(document.getElementById("current_questionId").value));
        }

    };
}();