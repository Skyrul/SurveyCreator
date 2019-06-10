

const _ValidateStatement = function () {
    _isCompleteStatement = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        let j = 1;
        let currentItem = document.getElementById("multistatement_input_" + j + "_col_sequence_" + currentSequence);        
        while (currentItem) {            
            let w = 1;
            let currentRadio = document.getElementById("multistatement_statement_" + j + "_sequence_" + currentSequence + "_radio_" + w);
            let checked = false;
            while (currentRadio) {
                if (currentRadio.checked) {
                    checked = true;
                    break;
                }
                ++w;
                currentRadio = document.getElementById("multistatement_statement_" + j + "_sequence_" + currentSequence + "_radio_" + w);
            }
            if (!checked) {
                return false;
            }
            ++j;
            currentItem = document.getElementById("multistatement_input_" + j + "_col_sequence_" + currentSequence);            
        }
        return true;
    };

    return {
        isComplete: _isCompleteStatement
    };
}();