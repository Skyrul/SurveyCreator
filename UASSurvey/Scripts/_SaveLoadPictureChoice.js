﻿const _SaveLoadPictureChoice = function () {

    _loadPictureChoiceAnswerByQuestionId = (questionId) => {
        let answerjson = UserResponse.load(questionId);
        answerjson.then((data) => {
            if (data) {
                _getAnswerId(data);
                const theAnswer = data[data.length - 1]["AnswerJson"]["picture_"]["answer"];
                const selectedItems = data[data.length - 1]["AnswerJson"]["picture_"]["answer"]["selectedItems"];
                const currentSequence = document.getElementById("current_sequence_number").value;
                const setCheckboxes = (() => {
                    const chosenMap = new Map(selectedItems);
                    let iterator = chosenMap[Symbol.iterator]();
                    for (let item of iterator) {
                        document.getElementById(item[0]).checked = true;                        
                    }
                })();
            }
        });
        answerjson.catch((err) => {
            console.info("UAS: Currently not getting a good response, picture choice. ");
            console.warn(err);
        });
    };

    return {
        save: () => {            
            const seq_num = document.getElementById("current_sequence_number").value;
            let selectedItems = new Map();
            let actualChoices = [];
            let partNumber = [];
            let othertext = "";
            let j = 1; 
            let currentElement = document.getElementById("picture_" + j + "_checkbox_sequence_" + seq_num);            
            while (currentElement) {                
                if (currentElement.checked) {
                    let labelKey = "picture_" + j + "_checkbox_sequence_" + seq_num;
                    let checkboxValue = "picture_" + j + "_img_sequence_" + seq_num;
                    selectedItems.set(labelKey, checkboxValue);
                    actualChoices.push(document.getElementById(checkboxValue).getAttribute("alt"));
                    partNumber.push(j);
                }
                else {
                    actualChoices.push("");
                    partNumber.push(j);
                }
                ++j;
                currentElement = document.getElementById("picture_" + j + "_checkbox_sequence_" + seq_num);
                //console.log(currentElement);
                //console.log(currentElement.checked);
                //debugger;
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
                    "picture_": {
                        "answer": {
                            "selectedItems": createArrayFromMap                            
                        }
                    }
                })
            };
            //_saveQuestionById_localStorage(rawDataObject);
            //_saveQuestionById(rawDataObject);
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
            this._loadPictureChoiceAnswerByQuestionId(parseInt(document.getElementById("current_questionId").value));

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
