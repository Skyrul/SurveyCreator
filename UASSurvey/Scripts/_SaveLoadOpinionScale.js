
const _SaveLoadOpinionScale = function () {

    _loadOpinionScaleAnswerByQuestionId = (questionId) => {
        let answerjson = UserResponse.load(questionId);
        answerjson.then((data) => {
            if (data) {
                _getAnswerId(data);
                const theAnswer = data[data.length - 1]["AnswerJson"]["opinionscale_"]["answer"];
                const selectedItems = data[data.length - 1]["AnswerJson"]["opinionscale_"]["answer"]["selectedItems"];
                const currentSequence = document.getElementById("current_sequence_number").value;
                const setCheckboxes = (() => {
                    const chosenMap = new Map(selectedItems);
                    let iterator = chosenMap[Symbol.iterator]();
                    for (let item of iterator) {
                        document.getElementById(item[1]).className = "scalebox clonable active";
                    }
                })();
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
            let selectedItems = new Map();
            let actualChoices = [];
            let partNumber = [];
            let j = 0;
            while (document.getElementById("opinionscale_scalebox_" + j + "_sequence_" + seq_num)) {
                if (Object.is(document.getElementById("opinionscale_scalebox_" + j + "_sequence_" + seq_num).className, "scalebox clonable active")) {
                    let idValue = "opinionscale_scalebox_" + j + "_sequence_" + seq_num;
                    let labelKey = document.getElementById(idValue).innerHTML;
                    selectedItems.set(labelKey, idValue);
                    actualChoices.push(labelKey);
                    partNumber.push(j);
                }
                ++j;
            }
            const createArrayFromMap = ((mapper) => {
                let arr = [];
                for (const entry of mapper) {
                    arr.push(entry);
                }
                return arr;
            })(selectedItems);

            const answerId = parseInt(document.getElementById("current_answerId").value);
            const rawDataObject = {
                surveyid: parseInt(document.getElementById("surveyId").value),
                questionid: parseInt(document.getElementById("current_questionId").value),
                contactid: parseInt(document.getElementById("current_question_userId").value),
                answerid: answerId,
                AnswerJSON: _createJSONString({
                    "opinionscale_": {
                        "answer": {
                            "selectedItems": createArrayFromMap                            
                        }
                    }
                })
            };
            //_saveQuestionById_localStorage(rawDataObject);
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
            this._loadOpinionScaleAnswerByQuestionId(parseInt(document.getElementById("current_questionId").value));
        }

    };
}();