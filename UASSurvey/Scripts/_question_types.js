
const QuestionType = function () {
    _closeWindow = () => {
        $("#divdesigner").hide();
        $("#question_types").hide();
        $("#divoutline").show();
    };

    _setListeners = () => {
        document.getElementById("new_question_button").addEventListener("click", () => {
            $("#divoutline").hide();
            $("#divdesigner").hide();
            $("#question_types").show();
        });

        document.getElementById("question_type_close").addEventListener("click", _closeWindow);
    };

    _init = () => {
        _setListeners();
    };
    return {
        init: _init,
        close: _closeWindow
    };
}();

QuestionType.init();