

const _ValidateChoice = function () {
    _isCompleteChoice = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        let j = 1;
        while (document.getElementById("choice_input_" + j + "_checkbox_sequence_" + currentSequence)) {
            if (document.getElementById("choice_input_" + j + "_checkbox_sequence_" + currentSequence).checked) {
                if (Object.is(document.getElementById("choice_input_" + j + "_checkbox_sequence_" + currentSequence).nextElementSibling.innerHTML, "Other")) {
                    if (Object.is(document.getElementById("portlet_body_" + j + "_sequence_" + currentSequence).getElementsByClassName("othertext")[0].value, ""))
                    { return false; }
                    else { return true; }

                }
                else {
                    return true;
                }
            }
            ++j;
        }
        return false;
    };

    return {
        isComplete: _isCompleteChoice
    };
}();