

const _ValidateLongText = function () {
    _isCompleteLongText = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        return Object.is(document.getElementById("longtext_answertextarea_sequence_" + currentSequence).value, "") ? false : true;
    };

    return {
        isComplete: _isCompleteLongText
    };
}();