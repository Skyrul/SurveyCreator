const ValidateType = function () {
    _setTypeValidate = {
        "longtext_": _ValidateLongText,
        "shorttext_": _ValidateShortText,
        "multichoice_": _ValidateMultichoice,
        "choice_": _ValidateChoice,
        "multistatement_": _ValidateStatement,
        "dropdown_": _ValidateDropDown,
        "yesno_": _ValidateYesNo,
        "number_": _ValidateNumber,
        "picture_": _ValidatePictureChoices,
        "opinionscale_": _ValidateOpinionScale,
        "agree_": _ValidateAgree,
        "email_": _ValidateEmail,
        "rating_": _ValidateRating,
        "file_": _ValidateFile,
        "date_": _ValidateDate
    };
    //selectoptionsdropdown_sequence_12
    _validateThis = (theType) => {        
        return _setTypeValidate[theType];
    };
    
    return {
        ofType: _validateThis
    };
}();