const Validation = function () {    
    let executeType = null;
    let TheObject = null; // the object to validate
    //param: obj = { "required": false, "type": "longtext", currentSequence: "5" }

    _setObject = (obj) => {
        TheObject = obj;
        executeType = ValidateType.ofType(TheObject.type);
    };

    _isCompleteForm = (obj) => {
        _setObject(obj);        
        return executeType.isComplete();
    };

    _isRequiredValidation = () => {     
        let currentSequence = parseInt(document.getElementById("current_sequence_number").value);        
        return (Object.is((document.getElementById("is_required_" + "sequence_" + currentSequence).value), "true")) ? true : false;
    };

    _isValid = (obj) => {
        _setObject(obj);

    };
    

    return {
        isValid: _isValid,
        isRequired: _isRequiredValidation,
        isComplete: _isCompleteForm
    };

}();