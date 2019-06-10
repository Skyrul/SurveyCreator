const _SaveLoadShorttext = function () {

    //_saveQuestionById_localStorage = (obj) => {
    //    localStorage.setItem(obj.questionId, _createJSONString(obj));
    //};

    //_createJSONString = (obj) => {
    //    return JSON.stringify(obj);
    //};

    return {
        save: () => {
            const answerId = parseInt(document.getElementById("current_answerId").value);
            const rawDataObject = {
                surveyid: parseInt(document.getElementById("surveyId").value),
                questionid: parseInt(document.getElementById("current_questionId").value),
                contactid: parseInt(document.getElementById("current_question_userId").value),
                answerid: answerId,
                AnswerJSON: _createJSONString({
                    "shorttext_": {
                        "answer": document.getElementById("shorttext_answerinput_" + "sequence_" + document.getElementById("current_sequence_number").value).value
                    }
                })
            };
            
            _saveQuestionById(rawDataObject, {
                "ContactID": rawDataObject.contactid,
                "SurveyID": rawDataObject.surveyid,
                "QuestionID": rawDataObject.questionid,
                "PartsCount": 1,
                "Parts": [1],
                "Answers": [document.getElementById("shorttext_answerinput_" + "sequence_" + document.getElementById("current_sequence_number").value).value]
            });

        },

        load: () => {
            let answerjson = UserResponse.load(parseInt(document.getElementById("current_questionId").value));
            answerjson.then((data) => {
                if (data) {
                    _getAnswerId(data);
                    const theAnswer = data[data.length - 1]["AnswerJson"]["shorttext_"]["answer"];
                    const currentSequence = document.getElementById("current_sequence_number").value;
                    document.getElementById("shorttext_answerinput_" + "sequence_" + currentSequence).value = theAnswer;                    
                }
            });
            answerjson.catch((err) => {
                console.info("UAS: Currently not getting a good response, short text. ");
                console.warn(err);
            });

            //_loadFromStorage = (() => {
            //    const questionId = parseInt(document.getElementById("current_questionId").value);
            //    if (localStorage.getItem(questionId)) {
            //        const data = JSON.parse(JSON.parse(localStorage.getItem(questionId))["answerJSONString"])["shorttext_"]["answer"];
            //        const currentSequence = document.getElementById("current_sequence_number").value;
            //        document.getElementById("shorttext_answerinput_sequence_" + currentSequence).value = data;
            //    }
            //})();
        }

    };
}();