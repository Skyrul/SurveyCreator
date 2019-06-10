const _ValidateOpinionScale = function () {
    _isCompleteOpinionScale = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        let item = document.getElementById("opinionscale_scalebox_0_sequence_" + currentSequence);
        let z = 0;
        while (item) {
            if (Object.is(item.className,"scalebox clonable active")) {
                return true;
            }
            ++z;
            item = document.getElementById("opinionscale_scalebox_"+z+"_sequence_" + currentSequence);            
        }
        return false;
    };

    return {
        isComplete: _isCompleteOpinionScale
    };
}();