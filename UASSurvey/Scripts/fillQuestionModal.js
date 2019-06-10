
const typeCheck = new Function("func", "answerType", "return func(answerType)");

const isMultiChoiceType = (answerType) => {
    return Object.is(answerType, "multichoice_") || Object.is(answerType, "choice_");
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


const FillModalViewByType = new Function("fillModa", "answertype", "focusquestion", "return fillModa(answertype, focusquestion)");
const FillLogicJump = new Function("fillLogicJumpFunction", "obj", "return fillLogicJumpFunction(obj)");


const fillModalAs = (answertype, focusquestion) => {

    const fillPictureOnly = () => {
        const pictureSource = focusquestion['QuestionPicture']['data'];
        const pictureName = focusquestion['QuestionPicture']['name'];
        document.getElementById('img_place').setAttribute('src', pictureSource);
        document.getElementById('img_place').setAttribute('alt', pictureName);
        document.getElementById('img_place').className = 'img-fluid embed-responsive centerblock image_overlay';
        document.getElementById('img_place').setAttribute('style', 'display:block;width:auto;');

    };

    const fillMultiChoice = () => {
        if (typeCheck(isMultiChoiceType, answertype)) {
            const setNumberOfColumnDropdown = (() => {
                document.getElementById('col_button_1').innerHTML = focusquestion['MultiChoice']['Number_Of_Columns'];
            })();

            const number_of_items = (() => {
                return focusquestion['MultiChoice']['Choices'].length;
            })();

            for (let j = 1; j <= number_of_items; ++j) {
                const setNumberOfChoiceInput = ((num) => {
                    const currentId = "choice_input_" + num;
                    document.getElementById(currentId).value = focusquestion['MultiChoice']['Choices'][num - 1]['Choice_Input_Text'];
                    document.getElementById("m_sortable_portlets").setAttribute("style", "");
                    $('#' + currentId).keyup();

                })(j);

                const setTypeSelected = ((num) => {
                    const currentId = 'type_button_' + num;
                    const ele = document.getElementById(currentId);
                    const userSelected = (focusquestion['MultiChoice']['Choices'][num - 1]['Type_Selected']).trim();
                    const childSelections = document.getElementById('type_button_' + (j)).nextSibling.nextSibling.children;
                    for (let z in childSelections) {
                        if (Object.is(((childSelections[z]).innerHTML), userSelected)) {
                            childSelections[z].click();

                            const setPicture = (() => {
                                if (Object.is(userSelected, "Text with Pictures")) {
                                    if (!Object.is(document.getElementById("portlet_body_2"), null)) {
                                        document.getElementById("portlet_body_2").className = updateClassName("portlet_body_2", { oldClassName: "hidden_part", newClassName: "" });
                                    }                                    
                                    document.getElementById('picture_' + num + '_placing').setAttribute('src', focusquestion['MultiChoice']['Choices'][num - 1]['Picture_Chosen']['data']);
                                    document.getElementById('picture_' + num + '_placing').setAttribute('style', 'display:inline-block;width:auto;');
                                    document.getElementById('picture_' + num + '_placing').className = "image_overlay img-fluid embed-responsive centerblock";                                    
                                    document.getElementById("container_overlay_" + "picture_" + num + "_placing").setAttribute("style", "display:inline-block;");
                                    document.getElementById("container_overlay_" + "icon_" + num + "_placing").setAttribute("style", "display:none;");
                                    document.getElementById("container_overlay_" + "emoticon_" + num + "_placing").setAttribute("style", "display:none;");
                                }
                            })();

                            const setIcon = (() => {
                                if (Object.is(userSelected, "Text with Icons")) {
                                    const storedIcon = focusquestion['MultiChoice']['Choices'][num - 1]['Icon_Selected'];
                                    const setToInput = (() => {
                                        let chosenIcon = (() => {
                                            let theIcon = document.createElement("i");
                                            theIcon.className = storedIcon;
                                            document.getElementsByClassName("dropdownMenuButton_" + num)[0].innerHTML = "";
                                            document.getElementsByClassName("dropdownMenuButton_" + num)[0].appendChild(theIcon);
                                            document.getElementsByClassName("dropdownMenuButton_" + num)[0].appendChild(document.createTextNode(storedIcon.split(' ')[1]));
                                        })();
                                    })();
                                    const setToPreview = (() => {
                                        document.getElementById("icon_" + num + "_placing").children[0].className = storedIcon;
                                        document.getElementById("container_overlay_icon_" + num + "_placing").setAttribute("style", "display:inline-block;");
                                    })();
                                }
                            })();

                            const setEmoticon = (() => {
                                if (Object.is(userSelected, "Text with Emoticons")) {
                                    const setToInput = (() => {
                                        let chosenEmoticon = (() => {
                                            let chosenEmoticonSplit = focusquestion['MultiChoice']['Choices'][num - 1]['Emoticon_Selected'].split('/');
                                            return [chosenEmoticonSplit[chosenEmoticonSplit.length - 2], chosenEmoticonSplit[chosenEmoticonSplit.length - 1]];
                                        })();

                                        const createImagePlaceholderForEmoticon = (() => {
                                            let emoticonEle = document.createElement("img");
                                            emoticonEle.setAttribute("src", "../assets/emoticons/" + chosenEmoticon.join('/'));
                                            emoticonEle.setAttribute("alt", chosenEmoticon[1]);
                                            return emoticonEle;
                                        })();

                                        document.getElementsByClassName("emoticon_dropdownMenuButton_" + num)[0].innerHTML = "";
                                        document.getElementsByClassName("emoticon_dropdownMenuButton_" + num)[0].appendChild(createImagePlaceholderForEmoticon);
                                        document.getElementsByClassName("emoticon_dropdownMenuButton_" + num)[0].appendChild(document.createTextNode(chosenEmoticon[1]));
                                        return chosenEmoticon;
                                    })();

                                    const setToPreview = (() => {
                                        document.getElementById("emoticon_" + num + "_placing").setAttribute("src", "../assets/emoticons/" + setToInput.join('/'));
                                        document.getElementById("emoticon_" + num + "_placing").setAttribute("style", "display:inline-block;width:100px;height:100px;");
                                        document.getElementById("emoticon_" + num + "_placing").className = "img-fluid embed-responsive centerblock";
                                        document.getElementById("emoticon_" + num + "_placing").setAttribute("alt", setToInput[1]);
                                        document.getElementById("container_overlay_emoticon_" + num + "_placing").setAttribute("style", "display:inline-block;");                                        
                                    })();
                                }
                            })();

                        }
                    }
                })(j);

                const setAllowOther = (() => {
                    document.getElementById('other_choice_checkbox').checked = (focusquestion['MultiChoice']['Allow_Other']);
                })();

                if (!Object.is(j, number_of_items)) {
                    document.getElementsByClassName('btn_add_the_choice')[0].click();
                }
            }

        }
    };

    const fillMultiStatement = () => {
        const number_of_statements = focusquestion['MultiStatements']['AllStatements'].length;        
        const prepareStatementsInput = (() => {
            if (number_of_statements > 1) {
                for (let q = 1; q < number_of_statements; ++q) {
                    document.getElementById('btn_add_new_statement').click();
                }
            }
        })();

        const setStatements = (() => {
            for (let num = 0; num < number_of_statements; ++num) {
                document.getElementById('multi_statement_input_' + (num + 1)).value = focusquestion['MultiStatements']['AllStatements'][num]['Statement_Text'];
                $('#multi_statement_input_' + (num + 1)).keyup();

                const setPicture = (() => {
                    if (!Object.is(focusquestion['MultiStatements']['AllStatements'][num]['Picture_Chosen']['data'], "")
                        && !Object.is(focusquestion['MultiStatements']['AllStatements'][num]['Picture_Chosen']['name'], "")) {
                        document.getElementById('picture_' + (num + 1) + '_placing_multi_statement').setAttribute("src", focusquestion['MultiStatements']['AllStatements'][num]['Picture_Chosen']['data']);
                        document.getElementById('picture_' + (num + 1) + '_placing_multi_statement').setAttribute("alt", focusquestion['MultiStatements']['AllStatements'][num]['Picture_Chosen']['name']);
                        document.getElementById('picture_' + (num + 1) + '_placing_multi_statement').setAttribute('style', 'display:inline-block;width:auto;');
                        document.getElementById('picture_' + (num + 1) + '_placing_multi_statement').className = 'img-fluid embed-responsive centerblock';
                        document.getElementById('picture_' + (num + 1) + '_placing_multi_statement').parentNode.className = updateClassName('multi_statement_portlet_body_' + (num + 1), { oldClassName: "hidden_part", newClassName: "" });
                    }
                })();

                const setOptions = (() => { 
                    const num_of_options = focusquestion['MultiStatements']['AllStatements'][num]['Options'].length;
                    for (let q = 1; q < num_of_options; ++q) {
                        document.getElementById('multi_statement_input_group_'+(num+1)+'_add_option').click();
                    }
                    for (let a = 1; a <= num_of_options; ++a) {                        
                        if (document.getElementById('multi_statement_input_group_' + (num + 1) + '_subitem_' + a) !== null) {
                            document.getElementById('multi_statement_input_group_' + (num + 1) + '_subitem_' + a).value = focusquestion['MultiStatements']['AllStatements'][num]['Options'][a - 1]['line'];
                            $('#multi_statement_input_group_' + (num + 1) + '_subitem_' + a).keyup();
                        }
                        
                    }
                                        
                })();

            }            
        })();

        
    };
    //console.log("answertype:" + answertype);

    const fillDropdown = () => {
        const pictureSource = focusquestion['QuestionPicture']['data'];
        const pictureName = focusquestion['QuestionPicture']['name'];
        const dropdownList = focusquestion['Dropdown']['listing'];
        document.getElementById('img_place').setAttribute('src', pictureSource);
        document.getElementById('img_place').setAttribute('alt', pictureName);        
        document.getElementById('img_place').className = 'img-fluid embed-responsive centerblock image_overlay';
        document.getElementById('img_place').setAttribute('style', 'display:inline-block;width:auto;');
        document.getElementById('dropdown_list').value = dropdownList.join('\n');
        document.getElementById('dropdown_list').value += '\n';                
        $('#dropdown_list').focus();
        $('#dropdown_list').keyup();
        document.getElementById("dropdown_list").dispatchEvent(new Event('focus'));
    };

    const fillYesNo = () => {
        fillPictureOnly();
    };

    const fillOpinionScale = () => {
        const fillLabels = () => {
            document.getElementById("leftlabel_opinionscale").value = focusquestion['OpinionScale']['leftExtreme'];
            $("#leftlabel_opinionscale").keyup();
            document.getElementById("rightlabel_opinionscale").value = focusquestion['OpinionScale']['rightExtreme'];
            $("#rightlabel_opinionscale").keyup();
            document.getElementById('bottomlabel_opinionscale').value = focusquestion['OpinionScale']['theMiddle'];
            $('#bottomlabel_opinionscale').keyup();
        };

        const fillRangeValue = () => {
            document.getElementById('myRange').value = focusquestion['OpinionScale']['rangeValue'];
            $('#myRange').change();
            var output = document.getElementById("indicatorValRange");
            output.innerHTML = focusquestion['OpinionScale']['rangeValue'];
        };

        let ExeLabelType = {
            "Labels": () => {
                (document.getElementById("select_labels")).click();
                fillRangeValue(); 
                createScaleByValue(parseInt(focusquestion['OpinionScale']['rangeValue']) - 1);
                const fillCustomLabels = (() => {
                    let v = 0;
                    while (focusquestion['OpinionScale']['customLabels'][v]) {
                        document.getElementById("labelInput_" + (v + 1)).value = focusquestion['OpinionScale']['customLabels'][v];
                        document.getElementById("scalebox_" + v).innerHTML = focusquestion['OpinionScale']['customLabels'][v];
                        ++v;
                    }
                })();
            },
            "Numbers": () => {
                (document.getElementById("select_numbers")).click();
                fillRangeValue();
                fillLabels();
                createScaleByValue(parseInt(focusquestion['OpinionScale']['rangeValue']));
            },
            "Alphabets": () => {
                (document.getElementById("select_alphabets")).click();
                fillLabels();
                createScaleByValue(parseInt(focusquestion['OpinionScale']['rangeValue']));
            }
        };

        ExeLabelType[focusquestion['OpinionScale']['labelType']]();        
        fillPictureOnly();
        document.getElementById("staglabel_button").innerHTML = focusquestion['OpinionScale']['labelType'];
        
    };

    const fillNumber = () => {
        fillPictureOnly();
        document.getElementById('fromNum').value = focusquestion['NumberRange']['fromNum'];
        $('#fromNum').keyup();
        document.getElementById('toNum').value = focusquestion['NumberRange']['toNum'];
        $('#toNum').keyup();
    };

    const fillDate = () => {
        fillPictureOnly();
        document.getElementById('date_format_builder').value = focusquestion['Date']['dateFormat']; 
        $('#date_format_builder').change();
        document.getElementById('separator_format').value = focusquestion['Date']['separatorFormat'];
        $('#separator_format').change();
    };

    const fillPictureChoice = () => {
        fillPictureOnly();
        let innerHtmlSelections = {
            "Multiple selection": document.getElementById('multiple_selection').innerHTML,
            "Single selection": document.getElementById('single_selection').innerHTML
        };
        let selectionType = focusquestion['PictureChoices']['SelectionType'];
        document.getElementById('final_selection').innerHTML = innerHtmlSelections[selectionType];
        const setChoices = (() => {
            const numberOfChoices = focusquestion['PictureChoices']['AllPictures'].length;
            document.getElementById("pictures_count").innerHTML = numberOfChoices;
            for (let c = 0; c < numberOfChoices; ++c) {
                let dataString = focusquestion['PictureChoices']['AllPictures'][c]['source']; 
                let imgElement = document.createElement('img');
                imgElement.setAttribute('src', dataString);
                imgElement.setAttribute('alt', focusquestion['PictureChoices']['AllPictures'][c]['name']);
                imgElement.setAttribute('style', "width:auto;");
                imgElement.className = 'thumbnail';
                uponGetPicture((c + 1), imgElement);
                onPictureChoiceInputChange("picture_" + (c + 1), dataString);
            }
        })();

    };

    const fillAgree = () => {
        fillPictureOnly();
    };

    const fillFile = () => { fillPictureOnly(); };

    const fillEmail = () => { fillPictureOnly(); };

    const fillRating = () => {
        fillPictureOnly();
        const totalStatements = focusquestion['Rating']['AllStatements'].length;

        const addNewStatements = (() => {
            for (let n = 2; n <= totalStatements; ++n) {
                document.getElementById('btn_add_new_statement').click();
            }
        })();

        for (let b = 0; b < totalStatements; ++b) {

            const insertStatements = ((b) => {
                let currentElementId = 'rating_input_' + (b + 1);
                document.getElementById(currentElementId).value = focusquestion['Rating']['AllStatements'][b]['the_statement'];
                $('#' + currentElementId).keyup();
            })(b);
                
            const insertPictures = ((b) => {
                let currentElementId = 'picture_' + (b + 1) + '_placing_rating';
                document.getElementById(currentElementId).setAttribute('style', 'display:inline-block;width:auto;');
                document.getElementById(currentElementId).className = 'img-fluid embed-responsive centerblock'; 
                document.getElementById(currentElementId).setAttribute('src', focusquestion['Rating']['AllStatements'][b]['the_picture']['data']);
                document.getElementById(currentElementId).setAttribute('alt', focusquestion['Rating']['AllStatements'][b]['the_picture']['name']);
            })(b);

            const selectNumberOfStars = ((b) => {
                let currentElementId = 'number_of_stars_select_' + (b + 1); 
                document.getElementById(currentElementId).value = focusquestion['Rating']['AllStatements'][b]['number_of_stars'];
                $('#' + currentElementId).change();
            })(b);            

            const selectRatingType = ((b) => {
                let currentElementId = 'ratingtype_select_' + (b + 1); 
                document.getElementById(currentElementId).value = focusquestion['Rating']['AllStatements'][b]['rating_type'];
                $('#' + currentElementId).change();
            })(b);
                
        }
    };

    let fillIt = {
        "longtext_": () => { },
        "shorttext_": () => { },
        "yesno_": fillYesNo,
        "multichoice_": fillMultiChoice,
        "choice_": fillMultiChoice,
        'multistatement_': fillMultiStatement,
        "dropdown_": fillDropdown,
        "opinionscale_": fillOpinionScale,
        "number_": fillNumber,
        "date_": fillDate,
        "picture_": fillPictureChoice,
        "agree_": fillAgree,
        "file_": fillFile,
        "email_": fillEmail,
        "rating_": fillRating
    };

    fillIt[answertype]();
};

const fillModalView = (answerType, focusQuestion, ...dataIdArray) => {    
    const questionId = dataIdArray[0];
    const questionNumber = dataIdArray[1];
    let KeyupEvent = new Event('keyup');
    document.getElementById("questionGroup_0_inputQuestion").value = focusQuestion["questiontext"];
    document.getElementById("questionGroup_0_inputQuestion").dispatchEvent(KeyupEvent);
    document.getElementById("questionhelp_text").value = focusQuestion["helpText"];
    document.getElementById("questionhelp_text").dispatchEvent(KeyupEvent);
    document.getElementById("questionId").value = questionId;
    document.getElementById("question_no").innerHTML = questionNumber + "";
    document.getElementById("required").checked = focusQuestion["Required"];
    const pictureInfo = focusQuestion['QuestionPicture'];
    document.getElementById("img_place").setAttribute("src", pictureInfo.data);
    document.getElementById("img_place").className = "image_overlay img-fluid embed-responsive centerblock";
    document.getElementById("img_place").parentNode.setAttribute("style", "display:inline-block;");
    //document.getElementById("image_place").setAttribute("style", "display:none;");
    const logicJumpPart = (() => {
        document.getElementById("logic_jump_checkbox").checked = focusQuestion["LogicJumpChecked"] ? (() => {
            document.getElementById("view_logicJump").setAttribute("style", "display:inline-block;");
            return true;
        })() : (() => {
            document.getElementById("view_logicJump").setAttribute("style", "display:none;");
            return false;
        })();                
    })();

    console.log("focusQuestion");
    console.log(focusQuestion);
    //debugger;
    
    FillModalViewByType(fillModalAs, focusQuestion["questiontype"], focusQuestion);

};


const fillModalByAnswerType = (answerType, focusQuestion) => {
    const KeyupEvent = new Event('keyup');
    const FocusoutEvent = new Event('focus');
    
    const multiChoiceType = function () {
        if (typeCheck(isMultiChoiceType, answerType, focusQuestion["choice"])) {
            document.getElementById("choice_input_" + 1).value = focusQuestion['MultiChoice']['Choices'][1 - 1]['Choice_Input_Text'];
            $('#' + "choice_input_" + 1).keyup();
            //(document.getElementById("choice_input_" + 1)).dispatchEvent(KeyupEvent);
            alert('multiChoice type')
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
