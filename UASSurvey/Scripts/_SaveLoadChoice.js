
const _SaveLoadChoice = function () {

    _loadChoiceAnswerByQuestionId = (questionId) => { 
        let answerjson = UserResponse.load(questionId);
        answerjson.then((data) => {
            if (data) {
                _getAnswerId(data);
                const theAnswer = data[data.length - 1]["AnswerJson"]["choice_"]["answer"];
                const selectedItems = data[data.length - 1]["AnswerJson"]["choice_"]["answer"]["selectedItems"];
                const currentSequence = document.getElementById("current_sequence_number").value;
                const setCheckboxes = (() => {
                    const chosenMap = new Map(selectedItems);
                    let iterator = chosenMap[Symbol.iterator]();
                    for (let item of iterator) {
                        document.getElementById(item[1]).checked = true;
                        if (Object.is(item[0], "Other")) {
                            document.getElementById(item[1]).parentNode.parentNode.parentNode.parentNode.nextElementSibling.children[3].setAttribute("style", "display:block");
                            document.getElementById(item[1]).parentNode.parentNode.parentNode.parentNode.nextElementSibling.children[3].value = data[data.length - 1]["AnswerJson"]["choice_"]["answer"]["othertext"];
                        }
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
            let othertext = "";            
            let j = 1;                        
            while (document.getElementById("choice_input_" + j + "_checkbox_sequence_" + seq_num)) {
                if (document.getElementById("choice_input_" + j + "_checkbox_sequence_" + seq_num).checked) {
                    let labelKey = document.getElementById("choice_input_" + j + "_checkbox_sequence_" + seq_num).nextElementSibling.innerHTML;
                    let checkboxValue = "choice_input_" + j + "_checkbox_sequence_" + seq_num;
                    selectedItems.set(labelKey, checkboxValue);                    
                    actualChoices.push(labelKey);
                    partNumber.push(j);
                    if (Object.is(document.getElementById("choice_input_" + j + "_checkbox_sequence_" + seq_num).nextElementSibling.innerHTML, "Other")) {
                        othertext = document.getElementById("portlet_body_" + j + "_sequence_" + seq_num).getElementsByClassName("othertext")[0].value;
                    }
                }
                else {
                    actualChoices.push("");
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
                //let iterator = mapper[Symbol.iterator]();
                //let arr = [];
                //for (let t = 1; t < mapper.size; ++t) {
                //    arr.push(iterator.next().value);
                //}
                //return arr;
            })(selectedItems);

            const answerId = parseInt(document.getElementById("current_answerId").value);
            const rawDataObject = {
                surveyid: parseInt(document.getElementById("surveyId").value),
                questionid: parseInt(document.getElementById("current_questionId").value),
                contactid: parseInt(document.getElementById("current_question_userId").value),
                answerid: answerId,
                AnswerJSON: _createJSONString({
                    "choice_": {
                        "answer": {
                            "selectedItems": createArrayFromMap,
                            "othertext": othertext
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
            this._loadChoiceAnswerByQuestionId(parseInt(document.getElementById("current_questionId").value));
        }

    };
}();