const _ValidateAgree = function () {
    _isCompleteAgree = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        let itemAgree = document.getElementById("confirmer_I_Agree_button_sequence_" + currentSequence);
        let itemDisagree = document.getElementById("confirmer_I_Disagree_button_sequence_" + currentSequence);
        return (itemAgree.className === "fa fa-check-square-o" || itemDisagree.className === "fa fa-check-square-o") ? true : false;
    };

    return {
        isComplete: _isCompleteAgree
    };
}();