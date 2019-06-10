
const typeCheck = new Function("func", "answerType", "choice", "return func(answerType, choice)");

const isMultiChoiceType = (answerType, choice) => {
    return (choice !== null) && (choice !== 'undefined') && (answerType === "multichoice_") && (choice !== undefined);
};

const isDropdownType = (answerType, choice) => {
    return (choice !== null) && (choice !== 'undefined') && (answerType === "dropdown_") && (choice !== undefined);
};

const isOpinionScaleType = (answerType, choice) => {
    return (choice !== null) && (choice !== 'undefined') && (answerType === "opinionscale_") && (choice !== undefined);
};

const isNumberType = (answerType, choice) => {
    return (choice !== null) && (choice !== 'undefined') && (answerType === "number_") && (choice !== undefined);
};

const isRatingType = (answerType, choice) => {
    return (choice !== null) && (choice !== 'undefined') && (answerType === "rating_") && (choice !== undefined);
};

const fillModalByAnswerType = (answerType, focusQuestion) => {
    const KeyupEvent = new Event('keyup');
    const FocusoutEvent = new Event('focus');
    
    const multiChoiceType = function () {
        if (typeCheck(isMultiChoiceType, answerType, focusQuestion["choice"])) {
            let currentId = "";
            let offsetValue = 0;
            if (focusQuestion["choice"] !== undefined) {
                for (let m = 0; m < focusQuestion["choice"].length; ++m) {
                    offsetValue = (m + 1);
                    currentId = "multichoice_input_" + offsetValue;
                    document.getElementById(currentId).value = focusQuestion.choice[m];
                    document.getElementById(currentId).dispatchEvent(KeyupEvent);
                    if (offsetValue < focusQuestion["choice"].length) {
                        addAnother(currentId);
                    }
                }
            }
        }
    };    

    const dropdownType = () => {
        if (typeCheck(isDropdownType, answerType, focusQuestion["dropdown"])) {
            if (focusQuestion["dropdown"] !== undefined) {                
                document.getElementById("dropdown_list").value = focusQuestion["dropdown"].join("\n");                
                document.getElementById("dropdown_list").dispatchEvent(FocusoutEvent);
            }                           
        }
    };

    const opinionScaleType = () => {
        if (typeCheck(isOpinionScaleType, answerType, focusQuestion["opinionscale"])) {
            const setInputs = (() => {
                document.getElementById("myRange").value = focusQuestion.opinionscale.rangeValue;
                document.getElementById("myRange").dispatchEvent(new Event("change"));
                document.getElementById("left_extreme").value = focusQuestion.opinionscale.leftExtreme;
                document.getElementById("right_extreme").value = focusQuestion.opinionscale.rightExtreme;
                document.getElementById("the_middle").value = focusQuestion.opinionscale.theMiddle;
            })();
        }
    };

    const numberType = () => {
        if (typeCheck(isNumberType, answerType, focusQuestion["number_range"])) {
            const setInputs = (() => {
                document.getElementById("fromNum").value = focusQuestion.number_range.fromNum;
                document.getElementById("toNum").value = focusQuestion.number_range.toNum;
            })();
        }
    };

    const ratingType = () => {        
        if (typeCheck(isRatingType, answerType, focusQuestion["rating"])) {
            const setInputs = (() => {                
                document.getElementById("rating_input").value = focusQuestion.rating;                
                document.getElementById("rating_input").dispatchEvent(new Event("change"));
            })();
        }
    };
    
    const Types = {
        "multichoice_": multiChoiceType(),
        "dropdown_": dropdownType(),
        "opinionscale_": opinionScaleType(),
        "number_": numberType(),
        "rating_": ratingType()
    };

    const typeExecutor = (() => {
        Types[answerType];
    })();

};

const fillImgPlaceById = (idName, obj) => {
    let elementShow = null;
    const initImage = function () {
        document.getElementById(idName).remove();
        let img = document.createElement("img");
        img.setAttribute("id", idName);
        img.setAttribute("name", idName);
        return img;
    };

    const isValidData = (dataString) => {
        return !(dataString === "" || dataString === 'undefined' || dataString === undefined);
    };

    const showOrNot = (() => {
        if (isValidData(obj.data)) {    
            elementShow = ((img) => {
                img.setAttribute("src", obj.data);
                img.setAttribute("style", "display: block;margin: 0 auto; width:719px; height: 360px;");
                return img;
            })(initImage());
        }
        else {
            elementShow = ((img) => {
                img.setAttribute("src", "");
                img.setAttribute("class", "hidden_part");
                img.setAttribute("style", "display: none");
                return img;
            })(initImage());
        }
    })();

    const parentElement = document.getElementById("preview_0");
    parentElement.insertBefore(elementShow, parentElement.children[2]);
};


const fillModal = (answerType, focusQuestion, ...dataIdArray) => {
    const questionId = dataIdArray[0];
    let KeyupEvent = new Event('keyup');
    document.getElementById("questionGroup_0_inputQuestion").value = focusQuestion["question"];
    document.getElementById("questionGroup_0_inputQuestion").dispatchEvent(KeyupEvent);
    document.getElementById("questionhelp_text").value = focusQuestion["helpText"];
    document.getElementById("questionhelp_text").dispatchEvent(KeyupEvent);
    document.getElementById("questionId").value = questionId;
//    console.log('focusQuestion["childControls"]');
//    console.log(focusQuestion["childControls"]);
    for (let j in focusQuestion["childControls"]) {
//        console.log(focusQuestion["childControls"][j]["name"] === undefined);
        let donePicture = false;
        if (focusQuestion["childControls"][j] !== null) {
            if (focusQuestion["childControls"][j]["required"] !== null) {

                if (focusQuestion["childControls"][j].required) {
//                    alert("required");
                    document.getElementById("required").checked = true;
                    if (document.getElementById(answerType + "questionGroup_1") !== null){
                        document.getElementById(answerType + "questionGroup_1").setAttribute("required", "true");
                    }                    
                }
            }
            focusQuestion["childControls"][j]["data"] ?
                fillImgPlaceById(PreviewPlace.actual_image, focusQuestion["childControls"][j])
                : fillModalByAnswerType(answerType, focusQuestion["childControls"][j])
            ;
            
            
        }
    }

};

