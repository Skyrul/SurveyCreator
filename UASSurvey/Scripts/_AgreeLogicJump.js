const _AgreeLogicJump = function () {

    _getChoicesFromUserInputAgree = () => {
        return ["Agree", "Disagree"]; //simulated
    };

    _setLabelsAgree = () => {
        const choices = _getChoicesFromUserInputAgree();
        for (let r = 1; r <= choices.length; ++r) {
            document.getElementById("choice_" + r).innerHTML = choices[r - 1];
        }
    };

    // this method is only interested in cloning the template and then inserting the labels, 
    // we don't fill the list of questions in the dropdown here because, 
    // the filling of questions of the dropdown will be handled separately by the listener, 
    // right after the call of this method.
    _createAgreeLogicJump = () => {
        // getChoicesFromUserInput(); 
        // cloneTemplateByNumberOfInputs();
        _setLabelsAgree();
    };
    return {
        createLabelsAndInputs: _createAgreeLogicJump
    };
}();
