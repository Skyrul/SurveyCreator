const _ValidatePictureChoices = function () {
    _isCompletePictureChoices = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        let item = document.getElementById("picture_1_checkbox_sequence_" + currentSequence);        
        let z = 1;
        while (item) {
            if (item.checked) {
                return true;
            }
            ++z;
            item = document.getElementById("picture_"+z+"_checkbox_sequence_" + currentSequence);
        }
        return false;
    };

    return {
        isComplete: _isCompletePictureChoices
    };
}();