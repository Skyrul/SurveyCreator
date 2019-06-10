const GlobalVariables = function () {

    _listOfQuestions = new Map();
    _currentQuestionType = "";
    _currentQuestionID = 0;

    return {
        listOfQuestions: _listOfQuestions,
        currentQuestionType: _currentQuestionType,
        currentQuestionID: _currentQuestionID
    };
} ();