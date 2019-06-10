

const _ValidateNumber = function () {
    _isCompleteNumber = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        return Object.is(document.getElementById("number_answerinput_sequence_" + currentSequence).value, "") ? false : true;
    };

    return {
        isComplete: _isCompleteNumber
    };
}();