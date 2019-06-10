


const _ValidateYesNo = function () {
    _isCompleteYesNo = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        return (document.getElementById("Yes_Yes_sequence_" + currentSequence).checked || document.getElementById("No_No_sequence_" + currentSequence).checked) ? true : false;        
    };

    return {
        isComplete: _isCompleteYesNo
    };
}();