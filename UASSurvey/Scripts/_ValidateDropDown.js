

const _ValidateDropDown = function () {
    _isCompleteDropDown = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        return Object.is(document.getElementById("selectoptionsdropdown_sequence_" + currentSequence).value, "") ? false : true;        
    };

    return {
        isComplete: _isCompleteDropDown
    };
}();