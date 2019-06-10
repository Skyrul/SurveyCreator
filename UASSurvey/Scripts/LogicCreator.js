const LogicCreator = function () {

    _setLogicCreatorType = {
        "yesno_": _YesNoLogicJump,
        "agree_": _AgreeLogicJump
    };

    _init = (questionType) => {
        return _setLogicCreatorType[questionType];
    };
    return {
        init: _init
    };
}();