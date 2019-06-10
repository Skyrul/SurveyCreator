const AggregateType = function () {

    _setTypeAgg = {
        //"longtext_": _AggregateLongtext,
        //"shorttext_": _AggregateShorttext,
        "multichoice_": _AggregateMultichoice,
        "choice_": _AggregateMultichoice,
        "multistatement_": _AggregateMultistatement,
        //"dropdown_": _SaveLoadDropdown,
        "yesno_": _AggregateYesno,
        //"opinionscale_": _SaveLoadOpinionScale,
        //"number_": _SaveLoadNumber,
        //"date_": _SaveLoadDate,
        //"picture_": _SaveLoadPictureChoice,
        "agree_": _AggregateAgree,
        //"email_": _SaveLoadEmail,
        "rating_": _AggregateRating
        //"file_": _SaveLoadFile
    };

    _onType = (thetype) => {            
        return _setTypeAgg[thetype];
    };

    return {
        ontype: _onType
    }
}();