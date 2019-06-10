const SaveType = function () {

    _setType = {
        "longtext_": _SaveLoadLongtext,
        "shorttext_": _SaveLoadShorttext,
        "multichoice_": _SaveLoadMultichoice,
        "choice_": _SaveLoadChoice,
        "multistatement_": _SaveLoadMultistatement,
        "dropdown_": _SaveLoadDropdown,
        "yesno_": _SaveLoadYesno,
        "opinionscale_": _SaveLoadOpinionScale,
        "number_": _SaveLoadNumber,
        "date_": _SaveLoadDate,
        "picture_": _SaveLoadPictureChoice,
        "agree_": _SaveLoadAgree, 
        "email_": _SaveLoadEmail,
        "rating_": _SaveLoadRating,
        "file_": _SaveLoadFile
    };

    _onType = (thetype) => {       
        return _setType[thetype];
    };

    return {
        ontype: _onType
    }
}();