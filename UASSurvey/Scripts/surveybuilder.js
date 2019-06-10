(() => {
    window.onload = (() => {
        //if (!isNullUndefinedEmptyString(document.getElementsByClassName("m-datatable__body")[0])) {
        //    if (Object.is(document.getElementsByClassName("m-datatable__body")[0].children[0].innerHTML, "No records found")) {
        //        document.getElementsByClassName("m-datatable__body")[0].children[0].innerHTML = "Wait..";
        //        location.reload();
        //    }
        //}
    });

})();
const PreviewPlace = {
    "question": "preview_question",
    "helptext": "helptext_place",
    "image": "image_place",
    "answertype": "answertype_place",
    "actual_image": "img_place"
};
const UserInput = {
    "question": "questionGroup_0_inputQuestion",
    "help": "questionhelp_text",
    "required": "required"
//    "multichoice_input_1":"multichoice_input_1"
};
const HiddenUserInput = {
    "question": "questionGroup_1_inputQuestion",
    "help": "questionhelp_text_hidden",
    "required": "required_hidden"
};


const SAMPLE_TEXT = "Answer goes here..";
const ElementIDs = {
    "shorttext": "shorttext",
    "longtext": "longtext",
    "multichoice": "multichoice",
    "multichoicecheckboxes": "multichoicecheckboxes",
    "multichoiceradio": "multichoiceradio",
    "multichoicepic": "multichoicepicture",
    "selectoptionsdropdown": "selectoptionsdropdown",
    "fileupload": "fileupload",
    "date": "datetextbox",
    "time": "timetextbox",
    "yesno": "yesno",
    "opinionscale": "opinionscale",
    "number": "number", 
    "matrix": "matrix"
};

const QuestionModel = {
    "question": "",
    "answerType": "",
    "answers": []
};

var totalQuestions = 0;
var answerType_ = "";
let editable = true;
const questionGroupId_ = "questionGroup_1";


const setDropDownModal = (answerType_) => {
    if (answerType_ === "dropdown_") {
        document.getElementById("dropdown_input").className = "col-lg-12";
    }
    else {
        document.getElementById("dropdown_input").className = "col-lg-12 hidden_part";
    }
}

const addToDropdown = () => {    
    document.getElementById("userinput_dropdown_list").innerHTML = "";
    putToDropDown(getUserInputFromTextArea("dropdown_list"), "userinput_dropdown_list");
};

const setYesNoModal = (answerType_) => {
    if (answerType_ === "yesno_") {

    }
}


const hideElementById = (id, otherOptionalClasses) => {
    if (otherOptionalClasses !== null) {        
        if (!Object.is(document.getElementById(id), null)) {
            document.getElementById(id).className = otherOptionalClasses + " hidden_part";
        }
    }
    else { document.getElementById(id).className = "hidden_part"; }
};


const setNumber = (answerType_) => {
    if (answerType_ === "number_") {
        unhideElementById("number_input", "col-lg-12");
        const setListeners = (() => {
            const makeChangeToMin = (e) => {
                document.getElementById('number_questionGroup_1').setAttribute('min', e.currentTarget.value);
                document.getElementById('number_questionGroup_1').setAttribute('style', "width:220px;");
            };
            const makeChangeToMax = (e) => {
                document.getElementById('number_questionGroup_1').setAttribute('max', e.currentTarget.value);
                document.getElementById('number_questionGroup_1').setAttribute('style', "width:220px;");
            };
            $(document).on('change', '#fromNum', makeChangeToMin); 
            $(document).on('keyup', '#fromNum', makeChangeToMin);
            $(document).on('change', '#toNum', makeChangeToMax); 
            $(document).on('keyup', '#toNum', makeChangeToMax);

        })();
    }
    else {
        hideElementById("number_input", "col-lg-12");
//        document.getElementById("opinionscale_input").className = "col-lg-12 hidden";
    }
};

const setDateModal = (answerType_) => {
    if (answerType_ === "date_") {
        unhideElementById("date_input", "col-lg-12");
    }
    else {
        hideElementById("date_input", "col-lg-12");
        //        document.getElementById("opinionscale_input").className = "col-lg-12 hidden";
    }
};


const createMatrixSubitemCheckboxName = (elementLocation, labelValue, inputGroupId) => {
    var checkbox = createCheckbox({
        value: inputGroupId + "_cbx",
        name: inputGroupId + "_checkbox",
        id: inputGroupId + "_checkbox"        
    });
    elementLocation.appendChild(checkbox);
    var label = document.createElement("label");
    label.setAttribute("id", inputGroupId + "_label");
    label.setAttribute("name", inputGroupId + "_label");
    label.innerHTML = " " + labelValue;
    elementLocation.appendChild(label);
};


const createMatrixGroupName = (elementLocation, labelValue, inputGroupId) => {
    var checkbox = createCheckbox({
        value: inputGroupId + "_cbx",
        name: inputGroupId + "_checkbox",
        id: inputGroupId + "_checkbox"
    });
    elementLocation.appendChild(checkbox);    
    var label = document.createElement("label");
    label.setAttribute("id", inputGroupId + "_label");
    label.setAttribute("name", inputGroupId + "_label");
    label.innerHTML = " " + labelValue;
    elementLocation.appendChild(label);
};

const onChoiceGroupChange = (objectId) => {
    var elementValue = document.getElementById(objectId).value;
    var groupTitle = document.getElementById(objectId + "_output");

    if (isAlreadyPlacedName(objectId + "_label")) {
        document.getElementById(objectId + "_label").innerHTML = elementValue;
    }
    else {
        createMatrixGroupName(groupTitle, elementValue, objectId);
    }
    
};



const cloneAndAppendMatrixInputGroup = (clone) => {
    var matrix_input_group_ = document.getElementById(clone.idToClone).cloneNode(true);
    matrix_input_group_.setAttribute("id", clone.newId);    
    matrix_input_group_.setAttribute("name", clone.newId);
    matrix_input_group_.setAttribute("style", clone.style);
    document.getElementById(clone.destinationId).appendChild(matrix_input_group_);
};

const updateMatrixInputTextbox = (next_groupId, newCount) => {
    var next_element = document.getElementsByName("matrix_input_group_1_textbox")[1];
    next_element.setAttribute("id", next_groupId + "_textbox");
    next_element.setAttribute("name", next_groupId + "_textbox");
    next_element.value = "";
    next_element.setAttribute("placeholder", "Group " + newCount);    
};


const getCurrentGroupCount = () => {
    return parseInt(document.getElementById("matrix_inputs_count").value);
};

// createRow({rowId: "", destinationId:""})
const createRow = (ids) => {
    var theRow = document.createElement("div");
    theRow.setAttribute("id", ids.rowId);
    theRow.setAttribute("name", ids.rowId);
    theRow.setAttribute("class", "row");
    document.getElementById(ids.destinationId).appendChild(theRow);
};

const isExistRow = (rowId) => {
    return (document.getElementById("row_" + rowId) !== null);
};

const resetHeader = (prefix, expectedGroupsCount) => {
    document.getElementsByName(prefix + "_" + "1" + "_textbox_output")[1].setAttribute("id", prefix + "_" + expectedGroupsCount + "_textbox_output");
    document.getElementsByName(prefix + "_" + "1" + "_textbox_output")[1].setAttribute("name", prefix + "_" + expectedGroupsCount + "_textbox_output");

    document.getElementsByName(prefix + "_" + "1" + "_textbox_label")[1].setAttribute("id", prefix + "_" + expectedGroupsCount + "_textbox_label");
    document.getElementsByName(prefix + "_" + "1" + "_textbox_label")[1].setAttribute("name", prefix + "_" + expectedGroupsCount + "_textbox_label");

    document.getElementsByName(prefix + "_" + "1" + "_textbox_checkbox")[1].setAttribute("id", prefix + "_" + expectedGroupsCount + "_textbox_checkbox");
    document.getElementsByName(prefix + "_" + "1" + "_textbox_checkbox")[1].setAttribute("name", prefix + "_" + expectedGroupsCount + "_textbox_checkbox");

    document.getElementById(prefix + "_" + expectedGroupsCount + "_textbox_checkbox").value = prefix + "_" + expectedGroupsCount + "_textbox_cbx";
    document.getElementById(prefix + "_" + expectedGroupsCount + "_textbox_label").innerHTML = document.getElementById(prefix + "_" + expectedGroupsCount + "_textbox").value;
};

const resetSubitems = (prefix, expectedGroupsCount) => {
    document.getElementsByName(prefix + "_" + "1" + "_subitemPlace")[1].setAttribute("id", prefix + "_" + expectedGroupsCount + "_subitemPlace");
    document.getElementsByName(prefix + "_" + "1" + "_subitemPlace")[1].setAttribute("name", prefix + "_" + expectedGroupsCount + "_subitemPlace");
    document.getElementsByName(prefix + "_" + "1" + "_subitem_row_1")[1].setAttribute("id", prefix + "_" + expectedGroupsCount + "_subitem_row_1");
    document.getElementsByName(prefix + "_" + "1" + "_subitem_row_1")[1].setAttribute("name", prefix + "_" + expectedGroupsCount + "_subitem_row_1");

    let children = document.getElementById(prefix + "_" + expectedGroupsCount + "_subitem_row_1").children;
    children[0].setAttribute("id", prefix + "_" + expectedGroupsCount + "_subitem_1");
    children[0].setAttribute("name", prefix + "_" + expectedGroupsCount + "_subitem_1");
    children[1].setAttribute("id", prefix + "_" + expectedGroupsCount + "_subitem_2");
    children[1].setAttribute("name", prefix + "_" + expectedGroupsCount + "_subitem_2");

    document.getElementsByName(prefix + "_" + "1" + "_subitem_1_output")[1].setAttribute("id", prefix + "_" + expectedGroupsCount + "_subitem_1_output");
    document.getElementsByName(prefix + "_" + "1" + "_subitem_1_output")[1].setAttribute("name", prefix + "_" + expectedGroupsCount + "_subitem_1_output");

    document.getElementsByName(prefix + "_" + "1" + "_subitem_1_checkbox")[1].setAttribute("id", prefix + "_" + expectedGroupsCount + "_subitem_1_checkbox");
    document.getElementsByName(prefix + "_" + "1" + "_subitem_1_checkbox")[1].setAttribute("name", prefix + "_" + expectedGroupsCount + "_subitem_1_checkbox");
    document.getElementById(prefix + "_" + expectedGroupsCount + "_subitem_1_checkbox").value = prefix + "_" + expectedGroupsCount + "_subitem_1_cbx";

    document.getElementsByName(prefix + "_" + "1" + "_subitem_1_label")[1].setAttribute("id", prefix + "_" + expectedGroupsCount + "_subitem_1_label");
    document.getElementsByName(prefix + "_" + "1" + "_subitem_1_label")[1].setAttribute("name", prefix + "_" + expectedGroupsCount + "_subitem_1_label");
    //matrix_input_group_2_subitemPlace
    document.getElementById(prefix + "_" + expectedGroupsCount + "_subitemPlace").innerHTML = "";
};


const prepareRowPreview = () => {
    
    var currentGroupsCount = getCurrentGroupCount();
    var expectedGroupsCount = currentGroupsCount + 1;
    var expectedNumberOfRows = Math.ceil(expectedGroupsCount / 2.);
    var rowConcerned = "row_" + expectedNumberOfRows;
    if (isExistRow(rowConcerned)) {
//        alert(rowConcerned + " present");
    }
    else {
        var prefix = "matrix_input_group";
        //        alert("row " + expectedNumberOfRows + " NOT present");
        
        createRow({
            rowId: rowConcerned,
            destinationId: PreviewPlace.answertype
        });
        
        //        alert("row created");
        cloneAndAppendMatrixInputGroup({
            idToClone: "matrix_input_group_1_textbox_col",
            destinationId: rowConcerned,
            newId: "matrix_input_group_" + expectedGroupsCount + "_textbox_col",
            style: "display:inline-block;border-style: double;"
        });

        resetHeader(prefix, expectedGroupsCount);
        resetSubitems(prefix, expectedGroupsCount);

    }

};


const addAnotherStatement = () => {



};


const addAnotherMatrixGroup = () => {

    // get current count;    
    // determine if another row is needed, 
    //      from the number of count you can determine if another row is needed. 
    // if row does not exist create row and then create col
    // if row exist, determine if col id exist
    //      create col if col does not exist
    //      create span element 
    //      create checkbox and group title append them to span
   
    var matrix_inputs_count = parseInt(document.getElementById("matrix_inputs_count").value);
    var matrix_inputs_count_added = matrix_inputs_count + 1;
    var next_groupId = "matrix_input_group_" + (matrix_inputs_count_added);

    cloneAndAppendMatrixInputGroup({
        idToClone: "matrix_input_group_1_",
        destinationId: "matrix_inputs",
        newId: next_groupId,
        style: "display:inline-block;"
    });
    updateMatrixInputTextbox(next_groupId, matrix_inputs_count_added);
    prepareRowPreview();

    var next_subitems = document.getElementsByName("matrix_input_group_1_subitems")[1];
    next_subitems.setAttribute("id", "matrix_input_group_" + matrix_inputs_count_added + "_subitems");
    next_subitems.setAttribute("name", "matrix_input_group_" + matrix_inputs_count_added + "_subitems");

    var matrix_input_group_subitem_count = document.getElementsByName("matrix_input_group_1_subitem_count")[1];
    matrix_input_group_subitem_count.setAttribute("id", "matrix_input_group_" + matrix_inputs_count_added + "_subitem_count");
    matrix_input_group_subitem_count.setAttribute("name", "matrix_input_group_" + matrix_inputs_count_added + "_subitem_count");

    var matrix_input_group_subs = document.getElementsByName("matrix_input_group_1_subs")[1];
    matrix_input_group_subs.setAttribute("name", "matrix_input_group_" + matrix_inputs_count_added + "_subs");

    var matrix_input_group_subitem = document.getElementsByName("matrix_input_group_1_subitem_1")[1];
    matrix_input_group_subitem.setAttribute("id", "matrix_input_group_" + matrix_inputs_count_added + "_subitem_1");
    matrix_input_group_subitem.setAttribute("name", "matrix_input_group_" + matrix_inputs_count_added + "_subitem_1");

    document.getElementById("matrix_inputs_count").setAttribute("value", matrix_inputs_count_added);    
};

const setMatrixModal = (answerType_) => {
    if (answerType_ === "matrix_") {
        
        unhideElementById("matrix_group","col-lg-12");
    }
    else {
        hideElementById("matrix_group", "col-lg-12");
    }
};

const setMultiStatementsModal = (answerType_) => {    
    if (answerType_ === "multistatement_") {        
        unhideElementById("multi_statement", "col-lg-12");
    }
    else {
        hideElementById("multi_statement", "col-lg-12");
    }
};


const setRatingModal = (answerType_) => {
    if (answerType_ === "rating_") {
        unhideElementById("rating_inputs", "row");
        unhideElementById("rating_preview", "col-lg-12");         
    }
    else {        
        hideElementById("rating_inputs", null);
        hideElementById("rating_preview", "col-lg-12"); 
        hideElementById("rating_input_1_col", null);
    }
};

const isEditableModal = (dataIdArray) => {
    return dataIdArray.length === 4;
};

const setModalConfiguration = (answerType_) => {   
    const setIdentifier = (() => {
        document.getElementById("type_identifier").innerHTML = setTypeFriendlyName(answerType_);
    })();
    setMultiChoiceModal(answerType_);
    setDropDownModal(answerType_);
    setOpinionScale(answerType_);
    setNumber(answerType_);
    setDateModal(answerType_);
    setAgreeModal(answerType_);
    setPictureModal(answerType_);
    setMatrixModal(answerType_);
    setRatingModal(answerType_);
    setChoiceModal(answerType_);
    setMultiStatementsModal(answerType_);
    setLogicJumpInput(answerType_);
};

const getDataIdArray = (dataString) => {
    return dataString.split(' ');
};



function getDataIdAndBuildModal() {
    QuestionType.close();
    clearAll();
    let dataIdArray = getDataIdArray($(this).data('id'));    
    answerType_ = dataIdArray[0];    
    GlobalVariables.currentQuestionType = answerType_;
    setModalConfiguration(answerType_);
    if (isEditableModal(dataIdArray)) {
        editable = true;
//        alert("This modal is editable");
        let questionIdFocus = dataIdArray[3];
        let designerAllQuestions = JSON.parse(localStorage.getItem("DesignerAllQuestions"))["questions"];
        for (let j in designerAllQuestions) {
            if (designerAllQuestions[j]["questionId"] === questionIdFocus) {
                let focusQuestion = designerAllQuestions[j];
                let answerType = designerAllQuestions[j]["controlType"];
                fillModal(answerType, focusQuestion, questionIdFocus);                
            }
        }
        
    }
    else { editable = false; }
    
    $("#divoutline").hide();
    $("#divdesigner").show();

}

const setLogicJumpInput = (answerType_) => {
    if (answerType_ === "yesno_" || answerType_ === "agree_") {
        document.getElementById("logic_jump_input").setAttribute("style", "display:block;");
    }
    else {
        document.getElementById("logic_jump_input").setAttribute("style", "display:none;");
    }
};

const setAgreeModal = (answerType_) => {
    
    if (answerType_ === "agree_") {
        document.getElementById("question_label").innerHTML = "Intro text";
        document.getElementById("help_label").innerHTML = "Agreement text";        
    }
    else {
        document.getElementById("question_label").innerHTML = "Question: ";
        document.getElementById("help_label").innerHTML = "Question Help / Description Text (optional)";        
    }
};

// deprecated
//function setMultiChoiceModal(answerType_) {
//    if (answerType_ === "multichoice_") {
//        document.getElementById("multichoice_inputs").className = "col-lg-12";
//    }
//    else {
//        document.getElementById("multichoice_inputs").className = "col-lg-12 hidden_part";
//    }
//}

const setMultiChoiceModal = (answerType_) => {

    if (answerType_ === "multichoice_" || answerType_ === "choice_") {
        document.getElementById("emoticon_select_1").setAttribute('style', "display:none;width:auto;");
        const setChoicesInput = (() => (document.getElementById("choices_inputs")).className = "col-lg-12")();
        const placeholder = document.getElementById(PreviewPlace.answertype);

        //const OnUsePictureClick = (() => {
        //    $(document).on("click", ".select_Pictures_1", (e) => {
        //        SetListener_select_Pictures(1);
        //    });
        //})();

        const OnUseEmoticonClick = (() => {
            $(document).on("click", ".select_Emoticons_1", (e) => {
                SetListener_select_Emoticons(1);
            });
        })();

        const OnUseIconsClick = (() => {
            $(document).on("click", ".select_Icons_1", (e) => {
                SetListener_select_Icons(1);
            });
        })();

        // we have a new ui!
        const setupPlaceholder = (() => {
            document.getElementById("m_sortable_portlets").setAttribute("style", "display: none;");
        })();

        if (placeholder !== null) {
            const setListenerForFirstChoice = (() => {
                $(document).on('keyup', '.choice_input_1', () => {
                    document.getElementById("m_sortable_portlets").setAttribute("style", "");
                });
            })();
        }
        else {
            throw new Error("Placeholder not found!");
        }
    }
    else {
        (document.getElementById("choices_inputs")).className = "col-lg-12 hidden_part";
    }
};


const setPictureModal = (answerType_) => {
    if (answerType_ === "picture_") { 
        document.getElementById("picturechoice_inputs").className = "col-lg-12";
    } else {
        document.getElementById("picturechoice_inputs").className = "col-lg-12 hidden_part";
    }
};

/*
$(document).on("click", "#filepic", function () {
    document.getElementById(PreviewPlace.image).className = "box effect1";
    var tempPicture = document.createElement("h3");
    tempPicture.appendChild(document.createTextNode("Picture here"));
    document.getElementById(PreviewPlace.image).appendChild(tempPicture);

});
*/

function readURL(input, target = '#img_place') {
    if (input.files && input.files[0]) {
        var reader = new FileReader();        
        reader.onload = function (e) {
            if (target === null || target === undefined || target === 'undefined' || target === "") { target = '#img_place'; }
            //            else { alert(target); }
            $(target)
                .attr('src', e.target.result)
                .attr('alt', input.files[0].name)
                .attr('class', "image_overlay img-fluid embed-responsive centerblock")
                .attr('style', "display:inline-block;width:auto;");
            
        };
        reader.readAsDataURL(input.files[0]);
    }
}

    $(document).on("change", "#filepic", function () {
        readURL(this);
        document.getElementById("container_overlay_question_picture").setAttribute("style", "display:block;");
    });


    $('.file-tab').bind('contentchanged', function () {
        // do something after the div content has changed
        const fileTab = document.getElementsByClassName("file-tab");
    });


    const createLiElement_PictureChoice = (li_Id, destination) => {
        var li_ = document.createElement("li");
        li_.setAttribute("id", li_Id);
        li_.setAttribute("name", li_Id);
        li_.setAttribute("class", "pic-multi");
        li_.setAttribute("style", "text-align:center;");
        document.getElementById(destination).appendChild(li_);
    };

    const createUL_PictureChoice = (listName, destination) => {
        let unorderedListElement = document.createElement("ul");
        unorderedListElement.setAttribute("id", listName);
        unorderedListElement.setAttribute("name", listName);
        unorderedListElement.setAttribute("class", "pic-multi");
        document.getElementById(destination).appendChild(unorderedListElement);
    };

    const createCheckbox_PictureChoice = (id_checkbox, destination_Id) => {
        document.getElementById(destination_Id).appendChild(document.createElement("br"));
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", id_checkbox);
        checkbox.setAttribute("style", "margin-top: 5px;");
        document.getElementById(destination_Id).appendChild(checkbox);
    };


    const putImage_PictureChoice = (imgElement, destination) => {
        imgElement.setAttribute("style", "width:auto;");        
        document.getElementById(destination).appendChild(imgElement);
    };


    const createLabelForPicture_PictureChoice = (forId_checkbox, id_destination, idName_label) => {
        var labelcb = document.createElement("label");
        labelcb.setAttribute("id", idName_label);
        labelcb.setAttribute("name", idName_label);
        labelcb.setAttribute("for", forId_checkbox);
        labelcb.setAttribute("class", "pic-multi");
        document.getElementById(id_destination).appendChild(labelcb);
    };

    const isSingleSelection_PictureChoice = () => {
        return Object.is((document.getElementById("final_selection").children[1].innerHTML).trim(), "Single selection");
    };

    const onClick_PictureChoice = (e) => {    
        if (isSingleSelection_PictureChoice()) {
            const totalInputs = document.getElementById("all_pictures").children.length;
            let tmpId = "", checkboxId = "";
            if (e.currentTarget.checked) {

                for (let m = 0; m < totalInputs; ++m) {
                    tmpId = document.getElementById("all_pictures").children[m].id;
                    console.log(tmpId);
                    tmpIdParts = tmpId.split('_');
                    for (let j = 0; j < tmpIdParts.length - 1; ++j) {
                        checkboxId += (tmpIdParts[j] + "_");
                    }
                    checkboxId += "checkbox";
                    if (!Object.is(e.currentTarget.id, checkboxId) && document.getElementById(checkboxId).checked) {
                        document.getElementById(checkboxId).click();
                    }

                    tmpId = "";
                    checkboxId = "";            
                }
            }
        }
    };


    const uponGetPicture = (picsCount, imgElement) => {
        const placeholder = PreviewPlace.answertype;
        const answerType = ElementIDs.multichoicepic;    
        //    let sequenceNumber = picsCount;
        let salt = Math.floor((Math.random() * 99999) + 1);
        const pictureId = "picture_" + salt;
        const id_LI = pictureId + "_LI";
        const id_checkbox = pictureId + "_checkbox";
        const idName_Label = pictureId + "_Label";
        const unorderedListIdName = "all_pictures";    
        if (!isAlreadyPlacedName(unorderedListIdName)) {
            createUL_PictureChoice(unorderedListIdName, placeholder);
        }
        createLiElement_PictureChoice(id_LI, unorderedListIdName);
        createLabelForPicture_PictureChoice(id_checkbox, id_LI, idName_Label);
        putImage_PictureChoice(imgElement, idName_Label);    
        createCheckbox_PictureChoice(id_checkbox, idName_Label);
        $(document).on("click", "#" + id_checkbox, (e)=>onClick_PictureChoice(e));
        document.getElementById("pictures_count").innerHTML = picsCount;
        document.getElementById("removeImageButton_ImageUpload").click();
        document.getElementById("removeUrlImageButton_ImageUpload").click();
    };


    const getPicture = () => {

        let timing = 1;
        const maxTime = 99;

        let the = setInterval(function () {
            let fileTab = document.getElementsByClassName("file-tab")[0];
            //console.log(fileTab.children);
        
            if (fileTab.children.length === 3) {
                if (fileTab.children[0].nodeName === "IMG") {
                    const imgElement = fileTab.children[0];
                    //console.log("imgElement");
                    //console.log(imgElement);
                    const setImageName = ((theElement, fileInputValue) => {
                        theElement.setAttribute("alt", ((elementImg) => {
                            const fileSrcArr = fileInputValue.split("\\");
                            return fileSrcArr[fileSrcArr.length - 1];
                        })(theElement)
                        );
                    })(imgElement, fileTab.children[1].children[1].value);

                    const dataString = imgElement.getAttribute("src");  
                    let picturesCount = parseInt(document.getElementById("pictures_count").innerHTML);
                    ++picturesCount;
                    uponGetPicture(picturesCount, imgElement);                
                    

                    clearInterval(the);
                    //onPictureChoiceInputChange("picture_" + picturesCount, dataString);           
                }
                clearInterval(the);
            }
            else {
                ++timing;
                if (timing === maxTime) { clearInterval(the); }
            }
        }, 1);    

    };


    const getUrlPicture = () => {
        let timing = 1;
        const maxTime = 99;
        let the = setInterval(function () {
            let fileTab = document.getElementsByClassName("url-tab")[0];
            if (fileTab.children.length === 4) {
                if (fileTab.children[1].nodeName === "IMG") {
                    const imgElement = fileTab.children[1];
                    let picturesCount = parseInt(document.getElementById("pictures_count").innerHTML);
                    ++picturesCount;
                    uponGetPicture(picturesCount, imgElement);

                    const setImageName = ((theElement) => {
                        theElement.setAttribute("alt", ((elementImg) => {
                            const fileSrcArr = elementImg.getAttribute("src").split("/");
                            return fileSrcArr[fileSrcArr.length-1];                            
                            })(theElement)
                        );
                    })(imgElement);

                    clearInterval(the);
                }
                clearInterval(the);
            }
            else {
                ++timing;
                if (timing === maxTime) { clearInterval(the); }
            }
        }, 1);    

    };


    const hideDesigner = () => {        
        $("#divoutline").show();
        resetQuestionNumber();
        $("#divdesigner").hide();        
    };


    const addChoice = () => {
        const focusElement = $('.btn_add_choice')[0];
        const thepreviousid = focusElement.getAttribute('data-id');
        //    console.log(thepreviousid.getAttribute('data-id'));
    
        var nextId = parseInt(thepreviousid.split('_')[2]) + 1;
        var newInputRow = document.createElement("span");
        newInputRow.setAttribute("style", "display:inline-block");
        newInputRow.setAttribute("id", "multichoice_input_" + nextId + "_section");

        var leftSpan = document.createElement("span");
        leftSpan.setAttribute("style", "float:left");

        var multichoiceInput = document.createElement("input");
        multichoiceInput.setAttribute("id", "multichoice_input_" + nextId);
        multichoiceInput.setAttribute("name", "multichoice_input_" + nextId);
        multichoiceInput.setAttribute("class", "form-control");
        multichoiceInput.setAttribute("onkeyup", "onChoiceInputChange(this.id)");

        var rightSpan = document.createElement("span");
        rightSpan.setAttribute("style", "float:right;");

        var intoRightSpan = focusElement;
        intoRightSpan.setAttribute("data-id", "multichoice_input_" + nextId);    

        const removeButton = (() => {
            const btn_id_class = "multichoice_remove_button_" + nextId;
            let rb = document.createElement("a");
            rb.setAttribute("class", "btn btn-sm btn-danger " + btn_id_class);
            rb.innerHTML = "Remove Choice";
            const setButtonListener = (() => { 
                $(document).on("click", "." + btn_id_class, function () {
                    this.parentElement.parentElement.remove();
                    const ele = document.getElementById("multichoice_input_" + nextId + "_button");
                    ele !== null ? ele.remove() : (() => {})();                
                });
            })();
            return rb;
        })();

        rightSpan.appendChild(removeButton);
        leftSpan.appendChild(multichoiceInput);
        newInputRow.appendChild(leftSpan);
        newInputRow.appendChild(rightSpan);
        document.getElementById("multichoice_inputs").appendChild(newInputRow);
    
    };


    const removePictureQuestion = () => {
        document.getElementById('filepic').value = "";
        document.getElementById('img_place').setAttribute("src", "");
        document.getElementById('img_place').setAttribute("name", "");
        document.getElementById('img_place').setAttribute("alt", "");
        document.getElementById('img_place').setAttribute("style", "display:none;");
        document.getElementById("container_overlay_question_picture").setAttribute("style", "display:none;");
    };


    const getMatrixPosition = (theId) => {
        let names = theId.split("_");
        return names[3];
    };

    const splitIntoArray = (theId) => {
        return theId.split("_");
    };

    // createColumn ({colId: "", destinationId: ""})
    const createColumn = (col) => {
        var theCol = document.createElement("div");
        theCol.setAttribute("id", col.colId);
        theCol.setAttribute("name", col.colId);
        theCol.setAttribute("class", "col-sm-6");
        document.getElementById(col.destinationId).appendChild(theCol);

    };

    const onMatrixSubitemInputChange = (idName) => {
        const source = idName;
        const destination = idName + "_label";
        const groupNumber = getMatrixPosition(idName);
        const subItemSequence = (function () { var a = splitIntoArray(idName); return a[a.length - 1]; }());
        const idArr = splitIntoArray(idName);
        const subItemNumber = idArr[idArr.length - 1];
        let row = (function (subItemNumber) {
            let row = subItemNumber % 2;
            if (row !== 0) {
                row = Math.floor(subItemNumber / 2.0) + 1;
            }
            else { row = subItemNumber / 2; }        
            return row;
        }(subItemNumber));
        if (document.getElementById("matrix_input_group_" + groupNumber + "_subitem_row_" + row) === null) {
            createRow({
                rowId: "matrix_input_group_" + groupNumber + "_subitem_row_" + row,
                destinationId: "matrix_input_group_" + groupNumber + "_subitemPlace"
            });
        }
        const focusedRowElement = document.getElementById("matrix_input_group_" + groupNumber + "_subitem_row_" + row);
        const colOdd = "matrix_input_group_" + groupNumber + "_subitem_1";
        const colEven = "matrix_input_group_" + groupNumber + "_subitem_2";
        let validPart = "";
        let numPart = 1;
        if (subItemNumber % 2 !== 0) {
            validPart = colOdd;
            numPart = 0;
        }
        else { validPart = colEven; numPart = 1;}
        if (isNothing(document.getElementById(destination))) {
            const destId = (function () {
                return validPart;
            }());
            if (isNothing(focusedRowElement.children[numPart])) {
                createColumn({
                    colId: destId,
                    destinationId: "matrix_input_group_" + groupNumber + "_subitem_row_" + row
                });
            }
            createMatrixSubitemCheckboxName(focusedRowElement.children[numPart], "", source);
        }
        reflect(idName, idName +"_label");
    };


    const getSubitemPosition = (theId) => {
        let names = theId.split("_");
        return names[5];
    };


    const removeSubitem = (ele) => {
        let focusedElement = ele.previousSibling.previousSibling;
        let focusedSubitemId = getSubitemPosition(ele.previousSibling.previousSibling.id);
        let focusedGroupId = getMatrixPosition(ele.previousSibling.previousSibling.id);
        if (focusedSubitemId > 1) {
            focusedElement.parentElement.remove();
            document.getElementById("matrix_input_group_1_subitem_" + focusedSubitemId).remove();
        }
        
    };

    const addAnotherItemToGroup = (ele) => {

        let subItemInputText = document.getElementById("matrix_input_group_1_subitem_1").parentElement.cloneNode(true);
        let focusedGroupId = getMatrixPosition(ele.previousSibling.id);
        let numberOfSubItems = parseInt(document.getElementById("matrix_input_group_" + focusedGroupId + "_subitem_count").value);
        let nextSubItemNumber = numberOfSubItems + 1;
    
        //matrix_input_group_1_subs
        subItemInputText.children[0].setAttribute("id", "matrix_input_group_" + focusedGroupId + "_subitem_" + nextSubItemNumber);
        subItemInputText.children[0].setAttribute("name", "matrix_input_group_" + focusedGroupId + "_subitem_" + nextSubItemNumber);
        subItemInputText.children[0].setAttribute("placeholder", "Subitem " + nextSubItemNumber);
    
        (document.getElementsByName("matrix_input_group_" + focusedGroupId + "_subs")[0]).appendChild(subItemInputText);       
        document.getElementById("matrix_input_group_" + focusedGroupId + "_subitem_" + nextSubItemNumber).value = "";
        document.getElementById("matrix_input_group_" + focusedGroupId + "_subitem_count").value = nextSubItemNumber;
    
    };

    function onChoiceInputChange(idname) {
        doMultiChoice(idname);
        try {
            if (document.getElementById(idname) !== null && document.getElementById(idname + "_buttonText") !== null) {
                reflect(idname, idname + "_buttonText");
            }        
        }
        catch(err){
            console.error(err);
        }
    
    }


    const onPictureChoiceInputChange = (idname, itemvalue) => {
        // update picture on the preview
        //    doPictureChoice(idname, itemvalue);
    };




    function isAlreadyPlacedName(name) {
        if (document.getElementsByName(name).length > 0) { return true; }
        else { return false; }
    }

    function checkuncheck(onoff, buttonid, confirmerid) {
        
        if (onoff === 1) {
            document.getElementById(confirmerid).className = "fa fa-check-square-o";
            //  document.getElementById(confirmerid).setAttribute("style", "font-size:26px;");
            document.getElementById(buttonid).setAttribute("onclick", "checkuncheck(0," + "'" + buttonid + "'" + "," + "'" + confirmerid + "'" + ")");
            // document.getElementById(buttonid).className = "btn btn-lg btn-success ";
            if (Object.is(confirmerid, "confirmer_I_Disagree_button")) {
                if (Object.is(document.getElementById("confirmer_I_agree_button").className, "fa fa-check-square-o")) {
                    document.getElementById("confirmer_I_agree_button").className = "fa fa-square-o";
                }
            }
            else {
                if (Object.is(document.getElementById("confirmer_I_Disagree_button").className, "fa fa-check-square-o")) {
                    document.getElementById("confirmer_I_Disagree_button").className = "fa fa-square-o";
                }
            }
        }
        else {
            document.getElementById(confirmerid).className = "fa fa-square-o";
            // document.getElementById(confirmerid).setAttribute("style", "font-size:26px;");
            document.getElementById(buttonid).setAttribute("onclick", "checkuncheck(1," + "'" + buttonid + "'" + "," + "'" + confirmerid + "'" + ")");
            // document.getElementById(buttonid).className = "btn btn-danger  "; 
        }
    }

    const doPictureChoice = (theid, itemvalue) => {
        var questionGroupId = "questionGroup_1";
        var placeholder = PreviewPlace.answertype;
        var answerType = ElementIDs.multichoicepic;
        var multichoiceinputs = [theid];
        var multichoicetext = document.getElementById(multichoiceinputs[0]).value;
        var picturesGroupId = questionGroupId + "_" + answerType;
        var picturePreviewId = picturesGroupId + "_" + theid;
        if (!isAlreadyPlacedName(picturesGroupId)) {
            //        alert("ul is not there creating..");
            var unorderedList = document.createElement("ul");
            unorderedList.setAttribute("id", picturesGroupId);
            unorderedList.setAttribute("name", picturesGroupId);
            unorderedList.setAttribute("class", "pic-multi");
            document.getElementById(placeholder).appendChild(unorderedList);

        }

        if (!isAlreadyPlacedName(picturePreviewId)) {
            //        alert("li not there");
            var checkbox_id = "cb_" + picturePreviewId;
            var li_ = document.createElement("li");
            li_.setAttribute("id", picturePreviewId);
            li_.setAttribute("name", picturePreviewId); 
            li_.setAttribute("class", "pic-multi");
            document.getElementById(picturesGroupId).appendChild(li_);

            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", checkbox_id);
            li_.appendChild(checkbox);

            var labelcb = document.createElement("label");
            labelcb.setAttribute("for", checkbox_id);
            labelcb.setAttribute("class", "pic-multi");
            li_.appendChild(labelcb);

            var image_element = document.createElement("img");
            image_element.setAttribute("src", "test.png");
            image_element.setAttribute("id", "img_" + picturePreviewId);
            labelcb.appendChild(image_element);
        }
        else {

            var checkbox_id = "cb_" + picturePreviewId;
            var li_ = document.createElement("li");
            li_.setAttribute("id", picturePreviewId);
            li_.setAttribute("name", picturePreviewId);
            document.getElementById(picturesGroupId).appendChild(li_);

            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", checkbox_id);
            li_.appendChild(checkbox);

            var labelcb = document.createElement("label");
            labelcb.setAttribute("for", checkbox_id);
            li_.appendChild(labelcb);

            var image_element = document.createElement("img");
            image_element.setAttribute("src", "test.png");
            //        image_element.setAttribute("style", "width: 100px; height: 100px");
            //        image_element.setAttribute("alt", "Image preview");
            image_element.setAttribute("id", "img_" + picturePreviewId);
            labelcb.appendChild(image_element);
        }

    

    };

    const isNothing = (var1) => {
        return var1 === "" || var1 === null || typeof var1 == "undefined";
    };


    const createCheckbox = (cbx) => {
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("value", cbx.value);
        checkbox.setAttribute("name", cbx.name);
        checkbox.setAttribute("id", cbx.id);
        //    checkbox.setAttribute("style", cbx.style);
        return checkbox;
    };

    const createSubItemsPlacementPreview = (destinationElement) => {
        let defaultPrefix = "matrix_input_group_1";
        let defaultPrefixSubItems = "matrix_input_group_1_subitem";
        let place = document.createElement("div");
        place.setAttribute("id", defaultPrefix + "_subitemPlace");
        place.setAttribute("name", defaultPrefix + "_subitemPlace");
        destinationElement.appendChild(place);

        let row = document.createElement("div");
        row.setAttribute("class", "row");
        row.setAttribute("id", defaultPrefix + "_subitem_row_" + "1");
        row.setAttribute("name", defaultPrefix + "_subitem_row_" + "1");
        place.appendChild(row);

        let col = document.createElement("div");
        col.setAttribute("class", "col-sm-6");
        col.setAttribute("id", defaultPrefix+"_subitem_1");
        col.setAttribute("name", defaultPrefix + "_subitem_1");
        row.appendChild(col);

        var groupTitle = document.createElement("span");
        groupTitle.setAttribute("id", defaultPrefixSubItems + "_1"+ "_output");
        groupTitle.setAttribute("name", defaultPrefixSubItems + "_1" + "_output");
        var inputGroupId = defaultPrefixSubItems + "_1";
        var inputGroupValue = document.getElementById(defaultPrefixSubItems + "_1").value;
        if (!isNothing(inputGroupValue)) {
            // make checkbox and put the value
            createMatrixSubitemCheckboxName(groupTitle, inputGroupValue, inputGroupId);
        }
        else {
            createMatrixSubitemCheckboxName(groupTitle, "", defaultPrefixSubItems + "_1");
        }
        col.appendChild(groupTitle);    

        let col2 = document.createElement("div");
        col2.setAttribute("class", "col-sm-6");
        col2.setAttribute("id", defaultPrefixSubItems + "_2");
        col2.setAttribute("name", defaultPrefixSubItems + "_2");
        row.appendChild(col2);

    };

    const doMatrixPreview = () => {
        var questionGroupId = "questionGroup_1";
        var placeholder = PreviewPlace.answertype;
        var answerType = ElementIDs.matrix;
        var hiddenId = "_" + questionGroupId + "_" + answerType + "_counter";

        if (!isAlreadyPlacedName(hiddenId)) {

            var hiddenCountBox = InsertHiddenCounter(questionGroupId, answerType, 1);
            document.getElementById(placeholder).appendChild(hiddenCountBox);

            // prepare and create large box and innerbox to fill
            var space = document.createElement("div");
            space.setAttribute("class", "row");
            space.setAttribute("id", "row_" + hiddenCountBox.value);
            document.getElementById(placeholder).appendChild(space);

            var col1 = document.createElement("div");
            col1.setAttribute("class", "col-sm-6");
            col1.setAttribute("id", "matrix_input_group_1_textbox"+"_col");
            col1.setAttribute("style", "border-style: double;");
            space.appendChild(col1);

            var groupTitle = document.createElement("span");
            groupTitle.setAttribute("id", "matrix_input_group_1_textbox_output");
            groupTitle.setAttribute("name", "matrix_input_group_1_textbox_output");
            var inputGroupId = "matrix_input_group_1_textbox";
            var inputGroupValue = document.getElementById("matrix_input_group_1_textbox").value;
            if (!isNothing(inputGroupValue)) {
                // make checkbox and put the value
                createMatrixGroupName(groupTitle, inputGroupValue, inputGroupId);
            }
            col1.appendChild(groupTitle);    
            createSubItemsPlacementPreview(col1);
        }


        
    };


    function doMultiChoice(theid) {  
        var questionGroupId = "questionGroup_1";
        var placeholder = PreviewPlace.answertype;
        var answerType = ElementIDs.multichoice;
        var multichoiceinputs = [theid]; 
        var multichoicetext = document.getElementById(multichoiceinputs[0]).value;
        var buttonid = multichoiceinputs[0] + "_" + "button";
        var confirmerid = "confirmer_" + multichoiceinputs[0];
        if (!isAlreadyPlacedName(multichoiceinputs[0] + "_" + "button")) {
            var multichoiceButton = document.createElement("button");
            multichoiceButton.setAttribute("id", buttonid);
            multichoiceButton.setAttribute("name", buttonid);
            multichoiceButton.setAttribute("type", "button");
            multichoiceButton.setAttribute("onclick", "checkuncheck(1," + "'" + buttonid + "'" + "," + "'" + confirmerid + "'" + ")");
            multichoiceButton.setAttribute("class", "btn btn-danger btn-md wrong");

            var confirmer = document.createElement("span");
            confirmer.setAttribute("class", "fa fa-square-o");
            confirmer.setAttribute("id", confirmerid);

            var thetext = document.createElement("span");
            thetext.setAttribute("id", multichoiceinputs[0] + "_buttonText"); //
            thetext.innerHTML = multichoicetext;

            multichoiceButton.appendChild(confirmer);
            multichoiceButton.appendChild(thetext);
            document.getElementById(placeholder).appendChild(multichoiceButton);
        }

    }

    const doYesNo = () => {    
        const radioButtons = document.createElement("div");
        const radioList = document.createElement("div");
        const setRadioLabel = () => {
            const radioLabel = document.createElement("label");
            radioLabel.className = "m-radio m-radio--bold";
            return radioLabel;
        };
        const nodeLabels = ["Yes", "No"];
        const [yesLabel, noLabel] = nodeLabels;        
        const createInputLabel = (textLabel) => {
            return document.createTextNode(textLabel);    
        };
        const createEmptySpan = () => {
            return document.createElement("span");
        };
        const createInputRadio = (inputValue) => {       
            const inputRadio = document.createElement("input");
            inputRadio.setAttribute("id", inputValue + "_" + inputValue);
            inputRadio.setAttribute("type", "radio");
            inputRadio.setAttribute("name", "yesnocommon");
            inputRadio.setAttribute("value", inputValue);
            return inputRadio;               
        };
        const setInputRadio = (labelText) => {
            const containerLabel = setRadioLabel();
            containerLabel.appendChild(createInputRadio(labelText));
            containerLabel.appendChild(createInputLabel(labelText));
            containerLabel.appendChild(createEmptySpan());
            return containerLabel;
        };


        const setPlaceHolderForAllButtons = (() => {
            const placeholder = PreviewPlace.answertype;
            document.getElementById(placeholder).appendChild(radioButtons);
            radioButtons.className = "m-form__group form-group";
        })();

        const setListOfRadios = (() => {        
            radioButtons.appendChild(radioList);
            radioList.className = "m-radio-list";        
        })();

        if (!isAlreadyPlacedName("yesnocommon")) {
            radioList.appendChild(setInputRadio(yesLabel));
            radioList.appendChild(setInputRadio(noLabel));
        }
    };

    //const doYesNo = () => {
    //    var questionGroupId = "questionGroup_1";
    //    var placeholder = PreviewPlace.answertype;
    //    var answerType = ElementIDs.yesno;
    //    var innerTexts = ["Yes", "No"];
    //    var buttonIds = [innerTexts[0] + "_" + "button", innerTexts[1] + "_" + "button"];
    //    var confirmerIds = ["confirmer_" + innerTexts[0], "confirmer_" + innerTexts[1]];
    //    for (var a = 0; a < buttonIds.length; ++a) {
    //        if (!isAlreadyPlacedName(buttonIds[a])) {
    //            var multichoiceButton = document.createElement("button");
    //            multichoiceButton.setAttribute("id", buttonIds[a]);
    //            multichoiceButton.setAttribute("name", buttonIds[a]);
    //            multichoiceButton.setAttribute("type", "button");
    //            multichoiceButton.setAttribute("onclick", "checkuncheck(1," + "'" + buttonIds[a] + "'" + "," + "'" + confirmerIds[a] + "'" + ")");
    //            multichoiceButton.setAttribute("class", "btn btn-danger btn-md wrong");

    //            var confirmer = document.createElement("span");
    //            confirmer.setAttribute("class", "fa fa-square-o");
    //            confirmer.setAttribute("id", confirmerIds[a]);

    //            var thetext = document.createElement("span");
    //            thetext.setAttribute("id", innerTexts[a] + "_buttonText"); 
    //            thetext.innerHTML = innerTexts[a];

    //            multichoiceButton.appendChild(confirmer);
    //            multichoiceButton.appendChild(thetext);
    //            document.getElementById(placeholder).appendChild(multichoiceButton);        
    //        }
    //    }
    //};


    const doAgreement = () => {
        document.getElementById("divAgreeButtons").setAttribute("style", "display:block;");
        /*
        var questionGroupId = "questionGroup_1";
        var placeholder = PreviewPlace.answertype;
        var answerType = ElementIDs.yesno;
        var innerTexts = ["       I agree", "       I Disagree"];
        var buttonIds = [innerTexts[0] + "_" + "button", innerTexts[1] + "_" + "button"];
        var confirmerIds = ["confirmer_" + innerTexts[0], "confirmer_" + innerTexts[1]];
        for (var a = 0; a < buttonIds.length; ++a) {
            if (!isAlreadyPlacedName(buttonIds[a])) {
                var multichoiceButton = document.createElement("button");
                multichoiceButton.setAttribute("id", buttonIds[a]);
                multichoiceButton.setAttribute("name", buttonIds[a]);
                multichoiceButton.setAttribute("type", "button");
                multichoiceButton.setAttribute("onclick", "checkuncheck(1," + "'" + buttonIds[a] + "'" + "," + "'" + confirmerIds[a] + "'" + ")");
                multichoiceButton.setAttribute("class", "btn btn-danger btn-md wrong");
    
                var confirmer = document.createElement("span");
                confirmer.setAttribute("class", "fa fa-square-o ");
                confirmer.setAttribute("style", "font-size:22px ");
                confirmer.setAttribute("id", confirmerIds[a]);
    
                var thetext = document.createElement("span");
                thetext.setAttribute("id", innerTexts[a] + "_buttonText");
                thetext.innerHTML = innerTexts[a];
    
                multichoiceButton.appendChild(confirmer);
                multichoiceButton.appendChild(thetext);
                document.getElementById(placeholder).appendChild(multichoiceButton);
    //            document.getElementById(placeholder).appendChild(document.createTextNode("   "));
            }
        }
        */
    };


    const doEmail = () => {
        var questionGroupId = "questionGroup_1";
        var placeholder = PreviewPlace.answertype;
        var answerType = ElementIDs.shorttext;
        if (!isAlreadyPlacedName(answerType + "_" + questionGroupId)) {
            // make the selected element appear
            var shortTextbox = document.createElement("input");
            shortTextbox.setAttribute("id", answerType + "_" + questionGroupId);
            shortTextbox.setAttribute("name", answerType + "_" + questionGroupId);
            shortTextbox.setAttribute("value", "");
            shortTextbox.setAttribute("type", "email");
            shortTextbox.setAttribute("placeholder", "john@doe.com");
            shortTextbox.setAttribute("class", "form-control");
            //    shortTextbox.setAttribute("disabled", "");
            document.getElementById(placeholder).appendChild(shortTextbox);
        }

    };

    const doFile = () => {
        var questionGroupId = "questionGroup_1";
        var placeholder = PreviewPlace.answertype;
        var answerType = ElementIDs.fileupload;
        if (!isAlreadyPlacedName(answerType + "_" + questionGroupId)) {
            // make the selected element appear
            var shortTextbox = document.createElement("input");
            shortTextbox.setAttribute("id", answerType + "_" + questionGroupId);
            shortTextbox.setAttribute("name", answerType + "_" + questionGroupId);
            shortTextbox.setAttribute("type", "file");
            shortTextbox.setAttribute("class", "form-control");
            //    shortTextbox.setAttribute("disabled", "");
            document.getElementById(placeholder).appendChild(shortTextbox);
        }

    };

    const getSliderValue = (id) => {
        return parseInt(document.getElementById(id).innerHTML);
    };


    function doShortText() {
        var questionGroupId = "questionGroup_1";
        var placeholder = PreviewPlace.answertype;
        var answerType = ElementIDs.shorttext;
        if (!isAlreadyPlacedName(answerType + "_" + questionGroupId)) {
            // make the selected element appear
            var shortTextbox = document.createElement("input");
            shortTextbox.setAttribute("id", answerType + "_" + questionGroupId);
            shortTextbox.setAttribute("name", answerType + "_" + questionGroupId);
            shortTextbox.setAttribute("value", SAMPLE_TEXT);
            shortTextbox.setAttribute("class", "form-control");
            //    shortTextbox.setAttribute("disabled", "");
            document.getElementById(placeholder).appendChild(shortTextbox);
        }
    }

    const doNumber = () => {
        var questionGroupId = "questionGroup_1";
        var placeholder = PreviewPlace.answertype;
        var answerType = ElementIDs.number;
        if (!isAlreadyPlacedName(answerType + "_" + questionGroupId)) {
            var fromNum = document.getElementById("fromNum").value;
            var toNum = document.getElementById("toNum").value;
            var labelRange = document.createElement("label");
            labelRange.innerHTML = "Range of values";            
            // make the selected element appear
            var shortTextbox = document.createElement("input");
            shortTextbox.setAttribute("id", answerType + "_" + questionGroupId);
            shortTextbox.setAttribute("name", answerType + "_" + questionGroupId);
            shortTextbox.setAttribute("value", toNum+"");
            shortTextbox.setAttribute("type", "number");
            shortTextbox.setAttribute("min", fromNum + "");
            shortTextbox.setAttribute("max", toNum + "");
            shortTextbox.setAttribute("class", "form-control");        
            document.getElementById(placeholder).appendChild(shortTextbox);

        }
    };

    function InsertHiddenCounter(questionGroupId, typename, count) {
        var inputBox = document.createElement("input");
        inputBox.setAttribute("id", "_" + questionGroupId + "_" + typename + "_counter");
        inputBox.setAttribute("name", "_" + questionGroupId + "_" + typename + "_counter");
        inputBox.setAttribute("value", "" + count);
        inputBox.setAttribute("style", "display:none;");
        return inputBox;
    }

    // get list from user input dropdown
    const getUserInputFromTextArea = (theid) => {
        return (document.getElementById(theid).value).split('\n');
    };

    const putToDropDown = (dateArray, destinationId) => {
        const appendOption = (item) => {
            var option = document.createElement("option");
            option.setAttribute("value", "" + item);
            document.getElementById(destinationId).appendChild(option);
        };
        appendOption("enter your own or select item..");
        for (var k in dateArray) {
            appendOption(dateArray[k]);
        }               
    }

    const doDropDown = () => {
        var questionGroupId = "questionGroup_1";
        var placeholder = PreviewPlace.answertype;
        var answerType = ElementIDs.selectoptionsdropdown;
        var dropdownId = ElementIDs.selectoptionsdropdown + "_" + questionGroupId + "_" + "select";
        if (!isAlreadyPlacedName(dropdownId)) {  
            var selectElement = document.createElement("input");
            selectElement.setAttribute("id", dropdownId);
            selectElement.setAttribute("name", dropdownId);
            selectElement.setAttribute("list", "userinput_dropdown_list");
            selectElement.className = "m-dropdown m-dropdown--open";
            document.getElementById(placeholder).appendChild(selectElement);
            selectElement.value = "enter or select item..";
            selectElement.addEventListener("click", (event) => {
                selectElement.value = "";
            });

            var dataList = document.createElement("datalist");
            dataList.setAttribute("id", "userinput_dropdown_list");
            document.getElementById(placeholder).appendChild(dataList);
        
            putToDropDown(getUserInputFromTextArea("dropdown_list"), "userinput_dropdown_list");

            var counterDropdown = InsertHiddenCounter(questionGroupId, "dropdown", 0);
            document.getElementById(placeholder).appendChild(counterDropdown);
        }
    };




    function doLongText() {
        var questionGroupId = "questionGroup_1";
        var placeholder = PreviewPlace.answertype;
        var answerType = ElementIDs.longtext;
        if (!isAlreadyPlacedName(answerType + "_" + questionGroupId)) {
            // make the selected element appear
            var longTextArea = document.createElement("textarea");
            longTextArea.setAttribute("id", answerType + "_" + questionGroupId);
            longTextArea.setAttribute("name", answerType + "_" + questionGroupId);
            longTextArea.innerHTML = SAMPLE_TEXT;
            //    longTextArea.setAttribute("disabled", "");
            longTextArea.setAttribute("class", "form-control");
            document.getElementById(placeholder).appendChild(longTextArea);
        }
    }


    function reflect(source, destination) {
        try {
            document.getElementById(destination).innerHTML = document.getElementById(source).value;
        }
        catch (Err) {
            throw(Err);
        }
    
    }


    function isEmpty(id) {
        if (document.getElementById(id).value === "") {
            return true;
        }
    }


const setTypeFriendlyName = (type) => {
    return {
        "longtext_": "Long text",
        "shorttext_": "Short text",
        "dropdown_": "Drop down",
        "yesno_": "Yes or No",
        "opinionscale_": "Opinion scale",
        "choice_": "Choice",
        "multichoice_": "Multi-choice",
        "number_": "Number",
        "multistatement_": "Multi-statement",
        "date_": "Date",
        "agree_": "Agree",
        "email_": "Email",
        "file_": "File",
        "matrix_": "Question matrix",
        "picture_": "Picture choice",
        "rating_": "Rating"
    }[type];
};


    function setInputListeners() {
        //if (!isEmpty("multichoice_input_1")) {
        // make the choices           
        //    doMultiChoice();
        //}

        if (answerType_ === "longtext_") {
            doLongText();
        }
        else if (answerType_ === "shorttext_") {
            doShortText();
        }
        else if (answerType_ === "dropdown_") {
            doDropDown();
        }
        else if (answerType_ === "yesno_") {
            doYesNo();
        } // opinionscale_
        else if (answerType_ === "opinionscale_") {
            doOpinionScale();
        }
        else if (answerType_ === "choice_") {
            //        doOpinionScale();
        }
        else if (answerType_ === "number_") {
            doNumber();
        }
        else if (answerType_ === "date_") {
            doDate();
        }
        else if (answerType_ === "agree_") {
            doAgreement();
        }
        else if (answerType_ === "email_") {
            doEmail();
        }
        else if (answerType_ === "file_") {
            doFile();
        }
        else if (answerType_ === "matrix_") {
            doMatrixPreview();
        }


    }


    // deprecated: replaced by input listener addChoice()
    function addAnother(thepreviousid) {
        var nextId = parseInt(thepreviousid.split('_')[2])+1;    
        var newInputRow = document.createElement("span");
        newInputRow.setAttribute("style", "display:inline-block");
        newInputRow.setAttribute("id", "multichoice_input_" + nextId + "_section");

        var leftSpan = document.createElement("span");
        leftSpan.setAttribute("style", "float:left");

        var multichoiceInput = document.createElement("input");
        multichoiceInput.setAttribute("id", "multichoice_input_" + nextId);
        multichoiceInput.setAttribute("name", "multichoice_input_" + nextId);
        multichoiceInput.setAttribute("class", "form-control"); 
        multichoiceInput.setAttribute("onkeyup", "onChoiceInputChange(this.id)");

        var rightSpan = document.createElement("span");
        rightSpan.setAttribute("style", "float:right; font-size:large");

        var intoRightSpan = document.createElement("a");
        intoRightSpan.setAttribute("onclick", "addAnother('multichoice_input_" + nextId + "')");
        intoRightSpan.appendChild(document.createTextNode("+"));

        rightSpan.appendChild(intoRightSpan);
        leftSpan.appendChild(multichoiceInput);
        newInputRow.appendChild(leftSpan);
        newInputRow.appendChild(rightSpan);
        document.getElementById("multichoice_inputs").appendChild(newInputRow);
    }

    function onKeyUpQuestion() {
        var placeholder = PreviewPlace.question;
        var userInputPlace = UserInput.question; 
        document.getElementById(HiddenUserInput.question).setAttribute("value", document.getElementById(UserInput.question).value);
        //    document.getElementById("select_questionGroup_1").setAttribute("value", document.getElementById(UserInput.question).value);
        reflect(userInputPlace, placeholder);
        setInputListeners();
    }

    function onKeyUpHelperText() {
        var placeholder = PreviewPlace.helptext;
        var userInputPlace = UserInput.help;
        reflect(userInputPlace, placeholder);
    }

    const isEmptyArray = (arr) => {
        if (arr.length === 0) { return true; }
        else {
            return false;
        }
    };

    const updateSurveyId = () => {
        const _DesignerAllQuestions = JSON.parse(localStorage.getItem("DesignerAllQuestions"));
        document.getElementById("hiddensurveyid").value = _DesignerAllQuestions.surveyId;
        document.getElementsByClassName("modal-title")[0].innerHTML = "Question Maker " + _DesignerAllQuestions.surveyId;
    };

    $(document).ready(function () {
        let allQuestionsTmp = AllQuestions;
        if ((localStorage.getItem("DesignerAllQuestions") !== "") && (localStorage.getItem("DesignerAllQuestions") !== null) && (localStorage.getItem("DesignerAllQuestions") !== 'undefined')){
            AllQuestions = JSON.parse(localStorage.getItem("DesignerAllQuestions"));
        }
    

        OutlineTable = getOutlineTableFromLocalStorage();    
        if (!isEmptyArray(OutlineTable)) {
            updateSurveyId();
            totalQuestions = OutlineTable.length;
        }
        var json = OutlineTable;
        //    $('#columns').columns({ data: json, schema: OutlineSchema });
    });
