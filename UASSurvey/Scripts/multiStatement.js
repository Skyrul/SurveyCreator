

const onKeyUp_multi_statement_input_bySequenceNumber = (sequenceNumber) => {
    $(document).on("keyup", "#multi_statement_input_" + sequenceNumber, (event) => {        
        if (Object.is(sequenceNumber, 1)) {
            document.getElementById("multi_statement_input_1_col").parentNode.setAttribute("style", "display:inline-block;");
        }
        
        document.getElementById("multi_statement_input_" + sequenceNumber + "_col").className = "col-lg-12 multi_statement_input_" + sequenceNumber+"_col";
        document.getElementById("multi_statement_input_" + sequenceNumber + "_placing").innerHTML = event.currentTarget.value;

        let theElement = document.getElementById("multi_statement_file_" + sequenceNumber);        
        theElement.setAttribute("style", (() => {
            return (theElement.getAttribute("style")).replace("display:none;", "display:block;");
        })());
    });
    
};

const onKeyUp_option_input_bySequenceNumber = (groupNumber, sequenceNumber) => {  //multi_statement_input_group_1_subitem_1
    $(document).on("keyup", "#multi_statement_input_group_" + groupNumber + "_subitem_" + sequenceNumber, (event) => {
        document.getElementById("multi_statement_input_group_" + groupNumber + "_subitem_" + sequenceNumber + "_option_value").innerHTML = event.currentTarget.value;
        document.getElementById("multi_statement_portlet_body_" + groupNumber).className = "m-portlet__body";
    }); 
};


const onClickAddOptionMultiStatement = (statementSequenceNumber) => {
    $(document).on("click", "#multi_statement_input_group_" + statementSequenceNumber + "_add_option", (e) => {

        // add new Input for the option
        // add listener for the option input
        // add to the statement this option for preview
        const currentStatementSequenceNumber = (e.currentTarget.id.split('_')[4]);
        const numberOfOptionsCurrent = document.getElementById("multi_statement_input_group_" + statementSequenceNumber+"_subitem_count").value;
        const nextSequenceNumberForOption = parseInt(numberOfOptionsCurrent) + 1;
        let inputOptionElement = null;

        let addNewInputForTheOption = () => {
            const parentElement = document.getElementById("multi_statement_input_group_" + currentStatementSequenceNumber + "_subs");
            let inputOption = document.getElementById("multi_statement_input_group_0_subs").children[0].cloneNode(true);
            inputOption.children[0].setAttribute("id", "multi_statement_input_group_" + currentStatementSequenceNumber + "_subitem_" + nextSequenceNumberForOption);
            inputOption.children[0].setAttribute("name", "multi_statement_input_group_" + currentStatementSequenceNumber + "_subitem_" + nextSequenceNumberForOption);            
            parentElement.appendChild(inputOption);

            document.getElementById("remove_item_group_0_subitem_0").setAttribute("id", "remove_item_group_" + currentStatementSequenceNumber + "_subitem_" + nextSequenceNumberForOption);
            return inputOption;
        };

        inputOptionElement = addNewInputForTheOption();

        const addRadioToPreviewOption = (() => {
            let radioForStatement = document.getElementById("radio_for_statement_template").cloneNode(true);
            document.getElementById("radios_for_statement_" + currentStatementSequenceNumber).appendChild(radioForStatement);
            document.getElementById("multi_statement_input_group_" + currentStatementSequenceNumber+"_subitem_count").value = nextSequenceNumberForOption;
            radioForStatement.setAttribute("id", "");
            radioForStatement.setAttribute("style", "display:inline-block;");
            //        if (radioForStatement.children[0].id === "multi_statement_input_group_0_subitem_0_option") {
            radioForStatement.children[0]
                .setAttribute("id", "multi_statement_input_group_" + currentStatementSequenceNumber + "_subitem_" + nextSequenceNumberForOption + "_option");
            radioForStatement.children[0]
                .setAttribute("name", "option_radio_for_statement_" + currentStatementSequenceNumber);
            radioForStatement.children[1]
                .setAttribute("id", "multi_statement_input_group_" + currentStatementSequenceNumber + "_subitem_" + nextSequenceNumberForOption + "_option_value");
            //        } multi_statement_input_group_0_subitem_0_option_value        
        })();

        const addListenerForTheOption = (() => {
            $(document).on("keyup", "#" + inputOptionElement.children[0].id, () => {
                document
                    .getElementById("multi_statement_input_group_" + currentStatementSequenceNumber + "_subitem_" + nextSequenceNumberForOption + "_option_value")
                    .innerHTML = inputOptionElement.children[0].value;
            });
        })();

        const addListenerForTheRemoveItemButton = (() => {
            $(document).on(
                "click",
                "#" + "remove_item_group_" + currentStatementSequenceNumber + "_subitem_" + nextSequenceNumberForOption,
                () => {
                    inputOptionElement.remove();
                    document
                        .getElementById("multi_statement_input_group_" + currentStatementSequenceNumber + "_subitem_" + nextSequenceNumberForOption + "_option_value")
                        .parentNode
                        .remove();
                    document.getElementById("multi_statement_input_group_" + currentStatementSequenceNumber + "_subitem_count")
                        .setAttribute("value", numberOfOptionsCurrent);
                }
            );
        })();

    });

};

const onChangePictureForStatement = (sequenceNumber) => {
    $(document).on("change", "#multi_statement_file_input_" + sequenceNumber, function () {
        readURL(this, "#picture_" + sequenceNumber + "_placing_multi_statement");
    });
};

const onClickRemoveStatement = (statement_number) => {
    $(document).on("click", "#remove_statement_" + statement_number, (e) => {
        e.currentTarget.parentNode.parentNode.parentNode.parentNode.remove();
        const updateNumberOfStatementsCounter = (() => document.getElementById("multi_statement_inputs_count").value = parseInt(document.getElementById("multi_statement_inputs_count").value) - 1)();       
        const removeCorrespondingPortlet = (() => document.getElementById("multi_statement_input_" + statement_number + "_col").remove())();        
    });
};

const onClickAddNewStatement = (() => {

    $(document).on("click", "#btn_add_new_statement", () => {
        const totalStatements = document.getElementById("multi_statement_input_1_section").children.length;
        const newStatementSequence = totalStatements + 1;

        const addNewInputGroup = (() => {

            let inputGroup = document.getElementById("multi_statement_group_0").cloneNode(true);
            inputGroup.setAttribute("id", "multi_statement_group_" + newStatementSequence);
            inputGroup.setAttribute("style", "display:block;");
            document.getElementById("multi_statement_input_1_section").appendChild(inputGroup);
            

            document.getElementById("multi_statement_input_0").setAttribute("id", "multi_statement_input_" + newStatementSequence);
            document.getElementById("multi_statement_input_" + newStatementSequence).setAttribute("name", "multi_statement_input_" + newStatementSequence);
            document.getElementById("multi_statement_input_" + newStatementSequence).className = "form-control col-12 border-after-blue-chambray multi_statement_input_" + newStatementSequence;
            document.getElementById("multi_statement_file_0").setAttribute("id", "multi_statement_file_" + newStatementSequence);
            document.getElementById("multi_statement_file_" + newStatementSequence).className = "col-md-12 multi_statement_file_" + newStatementSequence;
            //multi_statement_file_input_1

            const updateStatementNumberLabel = (() => {
                document.getElementById("multi_statement_input_" + newStatementSequence).previousSibling.className = "question_number_" + newStatementSequence + "_multi_statement";
                document.getElementById("multi_statement_input_" + newStatementSequence).previousSibling.setAttribute("id", "question_number_" + newStatementSequence + "_multi_statement");
                //innerHTML will be set in setStatementNumberAndItsAttribute
            })();

            document.getElementById("multi_statement_file_input_0").setAttribute("id", "multi_statement_file_input_" + newStatementSequence);
            document.getElementById("multi_statement_file_input_" + newStatementSequence).setAttribute("name", "multi_statement_file_input_" + newStatementSequence);
            document.getElementById("multi_statement_file_input_" + newStatementSequence).className = "fileinput-button btn-sm btn-brand multi_statement_file_input_" + newStatementSequence;

            document.getElementById("multi_statement_input_group_0_subitems").setAttribute("id", "multi_statement_input_group_" + newStatementSequence + "_subitems");
            document.getElementById("multi_statement_input_group_" + newStatementSequence + "_subitems").setAttribute("name", "multi_statement_input_group_" + newStatementSequence + "_subitems");

            const setAttributesForRemoveStatementButton = (() => {                
                document.getElementById("multi_statement_input_" + newStatementSequence).nextSibling.nextSibling.setAttribute("id", "remove_statement_" + newStatementSequence);
                document.getElementById("multi_statement_input_" + newStatementSequence).nextSibling.nextSibling.className = "btn btn-sm btn-danger remove_statement_" + newStatementSequence;
            })();

            const addOptionButton = (() => {
                document.getElementById("multi_statement_input_group_0_add_option").setAttribute("id", "multi_statement_input_group_" + newStatementSequence + "_add_option");

            })();

            const hiddenOptionCounter = (() => {
                document.getElementById("multi_statement_input_group_0_subitem_count").setAttribute("id", "multi_statement_input_group_" + newStatementSequence + "_subitem_count");
                document.getElementById("multi_statement_input_group_" + newStatementSequence + "_subitem_count").setAttribute("name", "multi_statement_input_group_" + newStatementSequence + "_subitem_count");
            })();

            document.getElementById("multi_statement_input_group_0_subs").setAttribute("id", "multi_statement_input_group_" + newStatementSequence + "_subs");

            document.getElementById("multi_statement_input_group_0_subitem_0").setAttribute("id", "multi_statement_input_group_" + newStatementSequence + "_subitem_1");
            document.getElementById("multi_statement_input_group_" + newStatementSequence + "_subitem_1").setAttribute("name", "multi_statement_input_group_" + newStatementSequence + "_subitem_1");
            document.getElementById("multi_statement_input_group_" + newStatementSequence + "_subitem_1").nextSibling.nextSibling.remove();

            const updateNumberOfStatementsCounter = (() => {
                document.getElementById("multi_statement_inputs_count").value = parseInt(document.getElementById("multi_statement_inputs_count").value) + 1;
            })();
            
        })();

        const addNewPortletForPreview = (() => {
            let portlet = document.getElementById("multi_statement_input_0_col").cloneNode(true);
            portlet.setAttribute("id", "multi_statement_input_" + newStatementSequence + "_col");
            portlet.className = "col-lg-12 hidden_part multi_statement_input_" + newStatementSequence + "_col";
            document.getElementById("multi_statement_portlets").appendChild(portlet);

            const setStatementNumberAndItsAttribute = (() => {
                portlet.children[0].children[0].children[0].children[0].children[0].setAttribute("id", "question_number_" + newStatementSequence + "_multi_statement");
                portlet.children[0].children[0].children[0].children[0].children[0].className = "question_number_" + newStatementSequence + "_multi_statement";
                let questionNumber = document.getElementsByClassName("question_number_" + newStatementSequence + "_multi_statement");
                for (let u in questionNumber) {

                    //let prepend = "th " + "statement";
                    //if (parseInt(newStatementSequence) === 2) { prepend = ((prepend) => { return "nd " + prepend.split(" ")[1]; })(prepend); }
                    //if (parseInt(newStatementSequence) === 3) { prepend = ((prepend) => { return "rd " + prepend.split(" ")[1]; })(prepend); }
                    questionNumber[u].innerHTML = newStatementSequence + ". ";
                }
//                portlet.children[0].children[0].children[0].children[0].children[0].setAttribute("id", "question_number_" + newStatementSequence + "_multi_statement");
//                document.getElementById("question_number_" + newStatementSequence + "_multi_statement").innerHTML = newStatementSequence + ". ";
            })();

            portlet.children[0].children[0].children[0].children[0].children[1].children[0].setAttribute("id", "multi_statement_input_" + newStatementSequence + "_placing");
            //        document.getElementById("multi_statement_input_0_placing").setAttribute("id", "multi_statement_input_" + newStatementSequence + "_placing");
            portlet.children[0].children[1].setAttribute("id", "multi_statement_portlet_body_" + newStatementSequence);
            //        document.getElementById("multi_statement_portlet_body_0").setAttribute("id", "multi_statement_portlet_body_" + newStatementSequence);
            portlet.children[0].children[1].children[0].setAttribute("id", "picture_" + newStatementSequence + "_placing_multi_statement");
            portlet.children[0].children[1].children[1].setAttribute("id", "radios_for_statement_" + newStatementSequence);
            portlet.children[0].children[1].children[1].children[0].children[0].setAttribute("id", "multi_statement_input_group_" + newStatementSequence + "_subitem_1_option");
            portlet.children[0].children[1].children[1].children[0].children[0].setAttribute("name", "option_radio_for_statement_" + newStatementSequence);
            portlet.children[0].children[1].children[1].children[0].children[1].setAttribute("id", "multi_statement_input_group_" + newStatementSequence + "_subitem_1_option_value");

        })();

        const addListenersForInput = (() => {
            onKeyUp_multi_statement_input_bySequenceNumber(newStatementSequence);
            onKeyUp_option_input_bySequenceNumber(newStatementSequence, 1);
            onClickAddOptionMultiStatement(newStatementSequence);
            onChangePictureForStatement(newStatementSequence);
            onClickRemoveStatement(newStatementSequence);
        })();


    });

})();


