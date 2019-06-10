

const _ValidateEmail = function () {
    _isCompleteEmail = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        let item = document.getElementById("email_input_sequence_" + document.getElementById("current_sequence_number").value).value;
        return (Object.is(item, "")) ? false : true;         
    };

    return {
        isComplete: _isCompleteEmail
    };
}();