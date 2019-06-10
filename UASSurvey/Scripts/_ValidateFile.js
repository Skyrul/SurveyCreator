

const _ValidateFile = function () {
    _isCompleteFile = () => {
        const currentSequence = parseInt(document.getElementById("current_sequence_number").value);
        var file = document.querySelector('#fileuploader_sequence_' + currentSequence).files[0];        
        return (file) ? true : !Object.is(document.getElementById("filename_fileUploader_sequence_" + currentSequence).innerHTML,"") ? true : false;
    };

    return {
        isComplete: _isCompleteFile
    };
}();