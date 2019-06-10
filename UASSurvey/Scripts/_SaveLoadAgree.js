const _SaveLoadAgree = function () {

    _loadAgreeAnswerByQuestionId = (questionId) => {
        let answerjson = UserResponse.load(questionId);
        answerjson.then((data) => {
            if (data) {
                _getAnswerId(data);
                const theAnswer = data[data.length - 1]["AnswerJson"]["agree_"]["answer"];
                const selectedItems = data[data.length - 1]["AnswerJson"]["agree_"]["answer"]["selectedItems"];
                const currentSequence = document.getElementById("current_sequence_number").value;
                const setCheckboxes = (() => {
                    const chosenMap = new Map(selectedItems);
                    let iterator = chosenMap[Symbol.iterator]();
                    for (let item of iterator) {
                        document.getElementById(item[0]).className = item[1];
                    }
                })();
            }
        });
        answerjson.catch((err) => {
            console.info("UAS: Currently not getting a good response, agree. ");
            console.warn(err);
        });
    };

    return {
        save: () => {
            const seq_num = document.getElementById("current_sequence_number").value;
            let selectedItems = new Map(); //confirmer_I_Disagree_button_sequence_4
            if (document.getElementById("confirmer_I_Disagree_button_sequence_" + seq_num)) {
                let labelKey = "";
                if (Object.is((document.getElementById("confirmer_I_Disagree_button_sequence_" + seq_num)).className, "fa fa-check-square-o")) {
                    labelKey = "confirmer_I_Disagree_button_sequence_" + seq_num;
                }
                else {
                    labelKey = "confirmer_I_Agree_button_sequence_" + seq_num;
                }
                let checkboxValue = "fa fa-check-square-o";
                selectedItems.set(labelKey, checkboxValue);

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
                    "agree_": {
                        "answer": {
                            "selectedItems": createArrayFromMap
                        }
                    }
                })
            };
            //console.log(createArrayFromMap);
            //debugger;

            //_saveQuestionById_localStorage(rawDataObject);
            _saveQuestionById(rawDataObject, {
                "ContactID": rawDataObject.contactid,
                "SurveyID": rawDataObject.surveyid,
                "QuestionID": rawDataObject.questionid,
                "PartsCount": 1,
                "Parts": [1],
                "Answers": [((str) => { let finalStr = str.split("_"); return finalStr[1] + " " + finalStr[2] })(createArrayFromMap[0][0])]
            });

        },

        load: () => {
            this._loadAgreeAnswerByQuestionId(parseInt(document.getElementById("current_questionId").value));
            //_loadFromStorage = (() => {
            //    const questionId = parseInt(document.getElementById("current_questionId").value);
            //    if (localStorage.getItem(questionId)) {
            //        const data = JSON.parse(JSON.parse(localStorage.getItem(questionId))["answerJSONString"])["multichoice_"]["answer"];
            //        const currentSequence = document.getElementById("current_sequence_number").value;
            //        //document.getElementById("multichoice_answerinput_sequence_" + currentSequence).value = data;
            //    }
            //})();
        }

    };
}();