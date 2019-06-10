const setListeners = (() => {
    $(document).on("click", ".btn_remove_picture", removePictureQuestion);
    $(document).on('keyup', "#left_extreme", () => document.getElementById("leftExtreme").innerHTML = document.getElementById("left_extreme").value);
    $(document).on('keyup', "#right_extreme", () => document.getElementById("rightExtreme").innerHTML = document.getElementById("right_extreme").value);
    $(document).on('keyup', "#the_middle", () => document.getElementById("theMiddle").innerHTML = document.getElementById("the_middle").value);
    $(document).on("click", ".btn_add_choice", addChoice); 
    $(document).on("click", ".btn_add_the_choice", addTheChoice);
    $(document).on("click", ".btn_close_designer", hideDesigner);
    $(document).on("click", ".btn_save_question", onSave);
    $(document).on("change", "#file_image", getPicture);
    $(document).on("click", ".open-RatingDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-LongTextDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-ShortTextDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-MultiChoiceDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-ChoiceDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-DropDownDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-YesNoDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-OpinionScaleDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-NumberDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-DateDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-AgreeDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-EmailDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-FileDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-PictureDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-MatrixDialog", getDataIdAndBuildModal);
    $(document).on("click", ".open-MultiStatementDialog", getDataIdAndBuildModal);

    $(document).on("click", ".checkbox_55", (e) => onClickPortlet(e));
    
    $(document).on("change", "#picturechoice_inputs", function () {
        onPictureChoiceInputChange(this.id, this.value);
    });

    $(document).on("click", "#required", function () {
        var checkedValue = null;
        var inputElements = document.getElementsByName('required');
        for (var i = 0; inputElements[i]; ++i) {
            if (inputElements[i].checked && inputElements[i].value === UserInput.required) {
                if (document.getElementById(answerType_ + questionGroupId_) !== null) {
                    document.getElementById(answerType_ + questionGroupId_).setAttribute("required", "true");
                    break;
                }
            }
            else {
                if (document.getElementById(answerType_ + questionGroupId_) !== null) {
                    document.getElementById(answerType_ + questionGroupId_).removeAttribute("required");
                }
            }
        }
    });
    $(document).on("click", "#multiple_selection", () => { document.getElementById("final_selection").innerHTML = document.getElementById("multiple_selection").innerHTML; });
    $(document).on("click", "#single_selection", () => { document.getElementById("final_selection").innerHTML = document.getElementById("single_selection").innerHTML; });
    $(document).on("click", "#other_choice_checkbox", (e) => setOtherPortlet(e));
    $(document).on("click", "#publish_survey_button", (e) => {        
        localStorage.setItem("currentSurveyId", sessionStorage.SurveyID);
    });

    const col_number_listener = (() => {
        for (let k = 1; k <= 4; ++k) {
            $(document).on("click", ".select_Column_" + k, (e) => {
                document.getElementById("col_button_1").innerText = (document.getElementById(e.currentTarget.id).innerText.trim());
                let selectedColSize = document.getElementById("col_button_1").innerText;
                const resetAllPortletToSelectedColSize = (() => {
                    const totalPortlets = document.getElementById("OpinionLabels").children.length - 1;
                    for (let m = 1; m <= totalPortlets + 1; ++m) {
                        if (document.getElementById("choice_input_" + m + "_col")) {
                            ShowPortlet[selectedColSize]("choice_input_" + m + "_col");
                        }                        
                    }
                })();                
            });
        }
    })();

    const OnUsePictureClick = (() => {
        $(document).on("click", ".select_Pictures_1", (e) => {
            SetListener_select_Pictures(1);
        });
    })();

    onKeyUp_multi_statement_input_bySequenceNumber(1);
    onKeyUp_option_input_bySequenceNumber(1, 1);
    onClickAddOptionMultiStatement(1);
    onChangePictureForStatement(1);

    onKeyUp_rating_input_bySequenceNumber(1);
    if (document.getElementById("logic_jump_link")) { document.getElementById("logic_jump_link").addEventListener("click", (event) => LogicJump.link(event)); }
    if (document.getElementById("view_logicJump")) { document.getElementById("view_logicJump").addEventListener("click", (event) => { $("#modallogicjump").modal("show"); }); }
    
    $("#modallogicjump").on("show.bs.modal", (event) => {               
        
    });
    $("#modallogicjump").on('shown.bs.modal', function (event) {
        LogicJump.fillChoicesByQuestionType(GlobalVariables.currentQuestionType);
        const fillOptions = (() => {
            let i = 1;
            while (document.getElementById("select_choice_" + i)) {
                document.getElementById("select_choice_" + i).innerHTML = "";
                GlobalVariables.listOfQuestions.forEach((value, key, map) => {
                    if (document.getElementById("preview_question").innerHTML !== value) {
                        let option = document.createElement("option");
                        option.setAttribute("value", key);
                        document.getElementById("select_choice_" + i).appendChild(option);
                        option.innerHTML = value;
                    }
                });
                ++i;
            }         
        })();
        if (document.getElementById("logic_jump_checkbox").checked) {            
            FillLogicJump(LogicJump.fill, { surveyId: sessionStorage.SurveyID, questionId: parseInt(GlobalVariables.currentQuestionID) });
        }
        
    });

    $('#modallogicjump').on('hidden.bs.modal', function () {
        //document.getElementById("logic_jump_checkbox").checked = document.getElementById("logic_jump_checkbox").checked ? false : true;        
        
    });
    if (document.getElementById("ok_logicJump_button")) {
        document.getElementById("ok_logicJump_button").addEventListener("click", (event) => {
            LogicJump.save(GlobalVariables.currentQuestionID);
        });
    }


})();
