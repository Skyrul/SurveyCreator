const _SaveLoadMultistatement = function () {

    _loadMultistatementAnswerByQuestionId = (questionId) => {
        let answerjson = UserResponse.load(questionId);
        answerjson.then((data) => {
            if (data) {
                _getAnswerId(data);                
                const theAnswer = data[data.length - 1]["AnswerJson"]["multistatement_"]["answer"];
                const currentSequence = document.getElementById("current_sequence_number").value;
                const setCheckboxes = (() => {
                    const chosenMap = new Map(theAnswer);
                    let iterator = chosenMap[Symbol.iterator]();
                    for (let item of iterator) {
                        document.getElementById(item[1].id).checked = true;
                    }
                })();
            }
        });
        answerjson.catch((err) => {
            console.info("UAS: Currently not getting a good response. ");
            console.warn(err);
        });
    };

    _createDataObject_Multistatement = (answerObjectMap) => {
        return {
            surveyid: parseInt(document.getElementById("surveyId").value),
            questionid: parseInt(document.getElementById("current_questionId").value),
            contactid: parseInt(document.getElementById("current_question_userId").value),
            answerid: parseInt(document.getElementById("current_answerId").value),
            AnswerJSON: _createJSONString({
                "multistatement_": {
                    "answer": answerObjectMap
                }
            })
        };
    };

    return {
        save: () => {
            const seq_num = document.getElementById("current_sequence_number").value;
            let selectedQuestionAnswerMap = new Map();
            let j = 1;
            let actualChoices = [];
            let partNumber = [];

            while (document.getElementById("multistatement_input_" + j + "_placing_sequence_" + seq_num)) {
                let key = document.getElementById("multistatement_input_" + j + "_placing_sequence_" + seq_num).innerHTML;                            
                let value = document.querySelector('input[name="' + "multistatement_statement_" + j + "_sequence_" + seq_num + '"]:checked') ? document.querySelector('input[name="' + "multistatement_statement_" + j + "_sequence_" + seq_num + '"]:checked').value : "";
                let id = document.querySelector('input[name="' + "multistatement_statement_" + j + "_sequence_" + seq_num + '"]:checked').id;
                selectedQuestionAnswerMap.set(key, { "value": value, "id": id });
                actualChoices.push(value);
                partNumber.push(j);
                ++j;
            }
            const answerArray = ((mapper) => {
                let arr = [];
                for (const entry of mapper) {
                    arr.push(entry);
                }
                return arr;
            })(selectedQuestionAnswerMap);
            //_saveQuestionById_localStorage(rawDataObject);
            const rawDataObject = this._createDataObject_Multistatement(answerArray);
            //_saveQuestionById(this._createDataObject_Multistatement(answerArray));
            _saveQuestionById(rawDataObject, {
                "ContactID": rawDataObject.contactid,
                "SurveyID": rawDataObject.surveyid,
                "QuestionID": rawDataObject.questionid,
                "PartsCount": actualChoices.length,
                "Parts": partNumber,
                "Answers": actualChoices
            });            
        },

        load: () => {
            this._loadMultistatementAnswerByQuestionId(parseInt(document.getElementById("current_questionId").value));
        }

    };
}();