const _SaveLoadFile = function () {

    _loadFileAnswerByQuestionId = (questionId) => {
        let answerjson = UserResponse.load(questionId);
        answerjson.then((data) => {
            if (data) {
                _getAnswerId(data);
                const theAnswer = data[data.length - 1]["AnswerJson"]["file_"]["answer"];
                const selectedItems = data[data.length - 1]["AnswerJson"]["file_"]["answer"]["selectedItems"];
                const currentSequence = document.getElementById("current_sequence_number").value;                
                const setFilenames = (() => {
                    const chosenMap = new Map(selectedItems);
                    let iterator = chosenMap[Symbol.iterator]();
                    for (let item of iterator) {
                        if (item[0]) {
                            document.getElementById("filename_fileUploader_sequence_" + currentSequence).innerHTML = item[0];
                            document.getElementById("info_fileUploader_sequence_" + currentSequence).setAttribute("style", "display:block;");
                            break;
                        }
                        else {
                            document.getElementById("info_fileUploader_sequence_" + currentSequence).setAttribute("style", "display:none;");
                            break;
                        }
                    }                    
                })();
            }
        });
        answerjson.catch((err) => {
            console.info("UAS: Currently not getting a good response, file upload. ");
            console.warn(err);
        });
    };

    return {
        save: () => {
            const answerId = parseInt(document.getElementById("current_answerId").value);
            const questionId = parseInt(document.getElementById("current_questionId").value);
            const seq_num = document.getElementById("current_sequence_number").value;
            const surveyId = parseInt(document.getElementById("surveyId").value);
            const contactId = parseInt(document.getElementById("current_question_userId").value);
            let selectedItems = new Map();
            let othertext = "";
            let j = 1;

            const getBase64 = (file) => {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {                    
                    let labelKey = file.name;
                    let dataValue = reader.result;
                    selectedItems.set(labelKey, dataValue);
                    const createArrayFromMap = ((mapper) => {
                        let arr = [];
                        for (const entry of mapper) {
                            arr.push(entry);
                        }
                        return arr;
                    })(selectedItems);

                    const rawDataObject = {
                        surveyid: surveyId,
                        questionid: questionId,
                        contactid: contactId,
                        answerid: answerId,
                        AnswerJSON: _createJSONString({
                            "file_": {
                                "answer": {
                                    "selectedItems": createArrayFromMap
                                }
                            }
                        })
                    };
                    
                    _saveQuestionById(rawDataObject, {
                        "ContactID": rawDataObject.contactid,
                        "SurveyID": rawDataObject.surveyid,
                        "QuestionID": rawDataObject.questionid,
                        "PartsCount": 1,
                        "Parts": [1],
                        "Answers": [file.name]
                    });            


                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };                
            };

            var file = document.querySelector('#fileuploader_sequence_' + seq_num).files[0];
            file ? (() => { getBase64(file) })() : (() => { })();             
        },

        load: () => {
            this._loadFileAnswerByQuestionId(parseInt(document.getElementById("current_questionId").value));
        }

    };
}();
