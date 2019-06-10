

const _ValidateDate = function () {
    _isCompleteDate = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        return Object.is(document.getElementById("m_datepicker_3_sequence_" + currentSequence).children[0].value, "") ? false : true;
    };

    return {
        isComplete: _isCompleteDate
    };
}();