
const _SaveLoadRating = function () {

    _loadRatingAnswerByQuestionId = (questionId) => {
        let answerjson = UserResponse.load(questionId);
        answerjson.then((data) => {
            if (data) {
                _getAnswerId(data); 
                const theAnswer = data[data.length - 1]["AnswerJson"]["rating_"]["answer"];
                const currentSequence = document.getElementById("current_sequence_number").value;
                const setCheckboxes = (() => {
                    const chosenMap = new Map(theAnswer);                    
                    let iterator = chosenMap[Symbol.iterator]();
                    for (let item of iterator) {
                        setRatingForExisting(item[0], item[1].ratingValue); 
                        document.getElementById(item[1].placeValueId).innerHTML = item[1].ratingValue;
                    }
                })();
            }
        });
        answerjson.catch((err) => {
            console.info("UAS: Currently not getting a good response, rating. ");
            console.warn(err);
        });
    };

    _createDataObject_Rating = (answerObjectMap) => {
        return {
            surveyid: parseInt(document.getElementById("surveyId").value),
            questionid: parseInt(document.getElementById("current_questionId").value),
            contactid: parseInt(document.getElementById("current_question_userId").value),
            answerid: parseInt(document.getElementById("current_answerId").value),
            AnswerJSON: _createJSONString({
                "rating_": {
                    "answer": answerObjectMap
                }
            })
        };
    };

    return {
        save: () => {
            const seq_num = document.getElementById("current_sequence_number").value;
            let selectedQuestionAnswerMap = new Map();                        
            let actualChoices = [];
            let partNumber = [];
                const saveCurrent = (() => {                    
                    let j = 1;
                    let iterations = document.getElementById("rating_input_0_col_sequence_"+seq_num).parentElement.children.length - 1;
                    const starsType = [
                        "basic_stars_live_rating_",
                        "rounded_stars_live_rating_",
                        "gradient_stars_live_rating_",
                        "full_stars_live_rating_"
                    ];
                    
                    for (let j = 1; j <= iterations; ++j) {
                        let currentLive = "";
                        for (let p in starsType) {
                            currentLive = starsType[p] + j + "_sequence_" + seq_num;
                            if (!Object.is(document.getElementById(currentLive).className.split(' ')[0],"hidden_part")) {
                                break;
                            }
                        }                        
                        let placeValueId = currentLive;
                        let key = document.getElementById(currentLive).nextElementSibling.getAttribute("id");
                        let value = document.getElementById(currentLive).innerHTML;
                        selectedQuestionAnswerMap.set(key, { "placeValueId": placeValueId, "ratingValue": value });

                        const getTotalStars = ((ratingPlacing) => {
                            return document.getElementById(ratingPlacing).nextElementSibling.children.length;                            
                        })(currentLive);

                        actualChoices.push(value);                        
                        actualChoices.push(getTotalStars);                        
                    }

                    const setPartNumbers = (() => {
                        for (let q = 1; q <= actualChoices.length; ++q) {
                            partNumber.push(q);
                        }
                    })();

                    const answerArray = ((mapper) => {
                        let arr = [];
                        for (const entry of mapper) {
                            arr.push(entry);
                        }
                        return arr;
                    })(selectedQuestionAnswerMap);

                    const rawDataObject = this._createDataObject_Rating(answerArray);

                    //_saveQuestionById();
                    _saveQuestionById(rawDataObject, {
                        "ContactID": rawDataObject.contactid,
                        "SurveyID": rawDataObject.surveyid,
                        "QuestionID": rawDataObject.questionid,
                        "PartsCount": actualChoices.length,
                        "Parts": partNumber,
                        "Answers": actualChoices
                    });            

                })();

        },

        load: () => {
            this._loadRatingAnswerByQuestionId(parseInt(document.getElementById("current_questionId").value));
        }

    };
}();