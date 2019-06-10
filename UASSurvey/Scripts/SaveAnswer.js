
const SaveAnswer = function () {
    _INVALID_ID = -1;
    let executeType = null; // will contain a polymorphic function, wherein contains executable save() and load() because every type is savable and loadable
    const AnswerModal = {
        userId: new Number(-1),
        surveyId: new Number(-1),
        questionId: new Number(-1),
        answerJSONString: new String("")
    };
    const postfixSequence = "sequence_" + this.sequenceNumber;

    let { _userId, _surveyId, _questionId, _finalJSONString } = AnswerModal;

    _finalObject = AnswerModal;
    
    _createAnswerObject = () => {
        if (!Object.is(this._surveyId, _INVALID_ID) && !isNullUndefinedEmptyString(this._surveyId)) {
            this._finalObject = { userId: 1, surveyId: this._surveyId, questionId: 1, answerJSONString: "" };                        
            return this._finalObject;
        }
        else {
            throw new Error("This is not a valid survey!");
        }
    };

    _createJSONString = (obj) => {
        return JSON.stringify(obj);
    };

    _getAnswerId = (dataArr) => {
        document.getElementById("current_answerId").value = dataArr[dataArr.length - 1]["answerid"];
    };


    _saveQuestionById_localStorage = (obj) => {
        localStorage.setItem(obj.questionid, _createJSONString(obj));
    };

    _saveQuestionById = (obj, actualAnswer) => {

        const answerId = UserResponse.save(obj, actualAnswer);
        // then set answerId

    };

    _init = () => {
        //let typeName = document.getElementById("current_question_type").value;
        this._setExecutableType(document.getElementById("current_question_type").value);
    };

    _save = () => {        
        //let obj = typeThing[document.getElementById("current_question_type").value]();                
        this._init();
        this.executeType.save();
    };

    _load = () => {
        this._init();
        this.executeType.load();
        
    };

    _setExecutableType = (theType) => {
        this.executeType = SaveType.ontype(theType);        
    };

    return {
        setCurrentType: (theType) => _setExecutableType,

        setSurveyId: (id) => {
            this._surveyId = id;
            if (document.getElementById("surveyId")) {
                document.getElementById("surveyId").value = id;
            }
            
        },

        getSurveyId: () => {
            return this._surveyId;
        },

        createObject: _createAnswerObject,

        getJSONString: _createJSONString,

        save: _save,

        load: _load,

        init: _init

    };

} ();