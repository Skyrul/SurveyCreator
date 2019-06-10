

const _ValidateShortText = function () {
    _isCompleteShortText = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        return Object.is(document.getElementById("shorttext_answerinput_sequence_" + currentSequence).value, "") ? false : true;
    };

    return {
        isComplete: _isCompleteShortText
    };
}();