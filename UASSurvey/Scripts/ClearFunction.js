// not used anymore 
//const clearMultiChoicesInput = () => {
//    let itemNumber = 2;
//    let elemen = document.getElementById("multichoice_input_" + itemNumber + "_section");
//    while ((elemen !== null) && (elemen !== 'undefined')) {
//        elemen.remove();
//        ++itemNumber;
//        elemen = document.getElementById("multichoice_input_" + itemNumber + "_section");
//    }
//};


const resetQuestionNumber = () => {
    document.getElementById("question_no").innerHTML = "";    
};


const clearMultiChoicesInput = () => {
    const clearInputs = (() => {
        document.getElementById('questionGroup_0_inputQuestion').value = '';
        document.getElementById('questionhelp_text').value = '';
        document.getElementById('col_button_1').innerHTML = '1 Column'; 
        document.getElementById('type_button_1').innerHTML = 'Text Only';
        document.getElementById('other_choice_checkbox').checked = false;
        document.getElementById('required').removeAttribute('checked');
    })();
    const totalInputs = document.getElementById("OpinionLabels").children.length;    
    for (let j = 2; j < totalInputs; ++j) {
        document.getElementById("choice_input_" + j + "_section").remove();
        document.getElementById("choice_input_" + j + "_col").remove();                
    }
    document.getElementById("choice_input_1").value = "";
    document.getElementById("choice_input_" + 1 + "_placing").innerHTML = "";
};

const clearMultiStatementInputs = () => {
    const num_of_statements = document.getElementById('multi_statement_input_1_section').length;
    for (let w = 2; w <= num_of_statements; ++w) {
        document.getElementById('multi_statement_group_' + w).remove();
    }
};

function clearUserInput() {
    document.getElementById(UserInput["required"]).checked = false;
    for (var k in UserInput) {
        document.getElementById(UserInput[k]).value = "";
    }
    if (answerType_ === "multichoice_" || Object.is(answerType_,"choice_")) {
        clearMultiChoicesInput();
    }
    clearMultiStatementInputs();
    document.getElementById('filepic').value = "";
    const clearOpinionScaleInput = (() => {
        (document.getElementById("staglabel_input")).setAttribute("style", "display:none;");
    })();
    
}

function clearPreview() {

    //document.getElementById(PreviewPlace.image).className = "box effect1 hidden_part";
    document.getElementById(PreviewPlace.actual_image).setAttribute("src", "");
    document.getElementById(PreviewPlace.actual_image).setAttribute("style", "");
    document.getElementById(PreviewPlace.actual_image).className = "hidden_part";
    document.getElementById("question_date_preview").setAttribute("style", "display:none;");
    document.getElementById('divAgreeButtons').setAttribute('style', 'display:none;');
    document.getElementById("questionId").value = "";

    const clearMultiChoicePreview = (() => {
        document.getElementById('m_sortable_portlets').setAttribute('style', 'display:none;');
        document.getElementById('picture_1_placing').setAttribute('src', '');
        document.getElementById('picture_1_placing').setAttribute('style', 'display:none;');
    })();

    const clearMultiStatementsPreview = (() => {
        document.getElementById('multi_statement_portlets').setAttribute('style', 'display:none;');
    })();

    for (var k in PreviewPlace) {
        if (document.getElementById(PreviewPlace[k])) {
            document.getElementById(PreviewPlace[k]).innerHTML = "";
        }        
    }

    document.getElementById("rating_portlets").setAttribute("style", "display:none;");
}

function clearAll() {
    clearUserInput();
    clearPreview();
}


const clearAllEmoticonsPortlet = () => {
    const emoticonGroups = document.getElementById('all_emoticons_portlet').children;
    const numberOfGroups = emoticonGroups.length;
    for (let z = 0; z < numberOfGroups; ++z) {
        emoticonGroups[z].setAttribute('style', 'display:none;');
    }
};