
const QuestionType = function (FocusQuestionObject, ...arr) {
    this.currentType = FocusQuestionObject["questiontype"];            
    this.sequenceNumber = arr[0];   
    const postfixSequence = "sequence_" + this.sequenceNumber;

    const setVisibilityDatePicker = () => {
        if (!Object.is(typeOf, "date_")) {
            document.getElementsByClassName("datepicker_position")[0].setAttribute("style", "display:none;");
        }
    };

    const setHiddenFields = () => {
        document.getElementById("current_questionId").value = PublishSurvey.getQuestionIds()[parseInt(this.sequenceNumber) - 1];
        document.getElementById("current_question_userId").value = FocusQuestionObject["userid"];
        document.getElementById("current_question_type").value = FocusQuestionObject["questiontype"];        
    };

    _standardParameters = (seq, typeOf) => {
        if (Object.is(FocusQuestionObject["questiontype"], typeOf)) { 
            //setHiddenFields();
            let longtextElement = (() => {
                let longtextElement = null;
                if (document.getElementById(typeOf + "publish_")){
                    longtextElement = document.getElementById(typeOf + "publish_").cloneNode(true);
                    longtextElement.setAttribute("id", typeOf + "publish_" + this.sequenceNumber);
                    longtextElement.className = " sequence_" + this.sequenceNumber;
                    document.getElementById("surveyview").appendChild(longtextElement);
                }                
                return longtextElement;
            })();

            const changeIds = (() => {
                let idsToChange = longtextElement.getElementsByClassName("clonable");
                for (let e = 0; e < idsToChange.length; ++e) {
                    idsToChange[e].setAttribute("id", idsToChange[e].id + postfixSequence);
                }
            })();

            const setValues = (() => {
                    document.getElementById(typeOf + "preview_question_" + postfixSequence).innerHTML = FocusQuestionObject["questiontext"];
                    document.getElementById(typeOf + "helptext_place_" + postfixSequence).value = FocusQuestionObject["helpText"];
                    document.getElementById("is_required_" + postfixSequence).setAttribute("value", FocusQuestionObject['Required']);
                Object.is(FocusQuestionObject['QuestionPicture']["data"], "") ? (() => { })() : (() => {
                    if (document.getElementById(typeOf + "img_place_" + postfixSequence)) {
                        document.getElementById(typeOf + "img_place_" + postfixSequence).setAttribute("src", FocusQuestionObject['QuestionPicture']["data"]);
                        document.getElementById(typeOf + "img_place_" + postfixSequence).setAttribute("alt", FocusQuestionObject['QuestionPicture']["name"]);
                        document.getElementById(typeOf + "img_place_" + postfixSequence).className += " image_overlay img-fluid embed-responsive centerblock";
                        document.getElementById(typeOf + "img_place_" + postfixSequence).parentNode.setAttribute("style", "display:block;");
                    }
                })();
            })();

        }
        else {
            throw new Error("Cuztom: This is not a " + typeOf);
        }

    };

    _setPortletsForCommonChoice = (seq) => {
        const number_of_items = (() => {
            return FocusQuestionObject['MultiChoice']['Allow_Other'] ? FocusQuestionObject['MultiChoice']['Choices'].length + 1 : FocusQuestionObject['MultiChoice']['Choices'].length;
        })();
        for (let j = 1; j <= number_of_items; ++j) {

            const clonePortletsBySequenceId = ((num) => {
                let clonablePortlet = document.getElementById("choice_input_" + 0 + "_col_" + postfixSequence);
                (clonablePortlet.className).replace("choice_input_0_col_", "");
                let portlet = clonablePortlet.cloneNode(true);
                portlet.setAttribute("id", "choice_input_" + num + "_col_" + postfixSequence);
                portlet.setAttribute("style", "display:block;");
                clonablePortlet.parentNode.appendChild(portlet);

                let defaultElements = portlet.getElementsByClassName("clonable");
                for (let d in defaultElements) {
                    if (!isNullUndefinedEmptyString(defaultElements[d])) {
                        const changePortletId = ((theelementId) => {
                            if (!isNullUndefinedEmptyString(theelementId)) {
                                let idArray = (theelementId).split('_');
                                let idPosition = ((idArray) => {
                                    return ((idArr) => {
                                        for (let m in idArr) {
                                            if (Object.is(idArr[m], "0")) { return m; }
                                        }
                                    })(idArray);
                                })(idArray);
                                idArray[idPosition] = num;
                                defaultElements[d].setAttribute("id", idArray.join('_'));
                            }
                        })(defaultElements[d].id);
                    }
                }

            })(j);

            const setAllowOther = ((num) => {
                if (Object.is(num, number_of_items) && FocusQuestionObject['MultiChoice']['Allow_Other']) {
                    let allowOtherPortlet = document.getElementById("choice_input_" + number_of_items + "_col_" + postfixSequence);
                    allowOtherPortlet.setAttribute("style", "display:block;");
                    allowOtherPortlet.getElementsByClassName("othertext")[0].setAttribute("style", "display:none;");                    
                    //document.getElementById("choice_input_" + number_of_items + "_checkbox_" + postfixSequence).checked = true;
                    document.getElementById("choice_input_" + number_of_items + "_checkbox_" + postfixSequence).addEventListener("click", (event) => {
                        //alert();
                        Object.is(document.getElementById("choice_input_" + number_of_items + "_checkbox_" + postfixSequence).checked, true) ? (() => {
                            document.getElementById("portlet_body_" + number_of_items + "_" + postfixSequence).getElementsByClassName("othertext")[0].setAttribute("style", "display:inline-block;");                            
                        })() : (() => {
                                document.getElementById("portlet_body_" + number_of_items + "_" + postfixSequence).getElementsByClassName("othertext")[0].setAttribute("style", "display:none;");
                        })();
                        
                    });
                }                
            })(j);

            const setPortletTitle = ((num) => {
                document.getElementById("choice_input_" + num + "_placing" + "_" + postfixSequence).innerHTML = (Object.is(num, number_of_items)) ? "Other" : FocusQuestionObject['MultiChoice']['Choices'][num - 1]['Choice_Input_Text'];
            })(j);

            const setColumns = ((seqPortlet) => {
                ShowPortlet[FocusQuestionObject['MultiChoice']['Number_Of_Columns']]("choice_input_" + seqPortlet + "_col_" + postfixSequence);
            })(j);

            const userSelected = ((num) => {
                if (!Object.is(num, number_of_items)) {
                    return (FocusQuestionObject['MultiChoice']['Choices'][j - 1]['Type_Selected']).trim();
                }                
            })(j);
            
            const setTypeSelected = ((num) => {

                const setPicture = ((num) => {
                    if (Object.is(userSelected, "Text with Pictures")) {
                        document.getElementById('picture_' + num + '_placing_' + postfixSequence).setAttribute('src', FocusQuestionObject['MultiChoice']['Choices'][num - 1]['Picture_Chosen']['data']);
                        document.getElementById('picture_' + num + '_placing_' + postfixSequence).setAttribute('style', 'display:block;width:auto;');
                        document.getElementById('picture_' + num + '_placing_' + postfixSequence).className = "img-fluid embed-responsive centerblock";
                    }
                })(num);

                const setIcon = ((num) => {
                    if (Object.is(userSelected, "Text with Icons")) {
                        const storedIcon = FocusQuestionObject['MultiChoice']['Choices'][num - 1]['Icon_Selected'];
                        const setToPreview = (() => {
                            document.getElementById("icon_" + num + "_placing_" + postfixSequence).children[0].className = storedIcon;
                        })();
                    }
                })(j);

                const setEmoticon = (() => {
                    if (Object.is(userSelected, "Text with Emoticons")) {
                        const setToInput = (() => {
                            return chosenEmoticon = (() => {
                                let chosenEmoticonSplit = FocusQuestionObject['MultiChoice']['Choices'][num - 1]['Emoticon_Selected'].split('/');
                                return [chosenEmoticonSplit[chosenEmoticonSplit.length - 2], chosenEmoticonSplit[chosenEmoticonSplit.length - 1]];
                            })();
                        })();

                        const setToPreview = (() => {
                            document.getElementById("emoticon_" + num + "_placing_" + postfixSequence).setAttribute("src", "../assets/emoticons/" + setToInput.join('/'));
                            document.getElementById("emoticon_" + num + "_placing_" + postfixSequence).setAttribute("style", "display:block;width:100px;height:100px;");
                            document.getElementById("emoticon_" + num + "_placing_" + postfixSequence).className = "img-fluid embed-responsive centerblock";
                            document.getElementById("emoticon_" + num + "_placing_" + postfixSequence).setAttribute("alt", setToInput[1]);
                        })();
                    }
                })();

                const setCheckboxListener = (() => {
                    $(document).on("click", "#choice_input_" + num + "_checkbox_" + postfixSequence, (e) => {
                        let totalInputs = number_of_items;                        
                        //if ((document.getElementById("other_choice_checkbox").checked)) { ++totalInputs; }
                        if (Object.is(this.currentType, "choice_")) {                            
                            if (e.currentTarget.checked) {                                
                                for (let m = 1; m <= totalInputs; ++m) { 
                                    if (!Object.is(e.currentTarget.id, "choice_input_" + m + "_checkbox_" + postfixSequence)) {
                                        if (document.getElementById("choice_input_" + m + "_checkbox_" + postfixSequence).checked) {
                                            document.getElementById("choice_input_" + m + "_checkbox_" + postfixSequence).click();
                                        }
                                    }
                                }
                            }
                        }

                    });
                })();

            })(j);

        }
    };

    _changeIdById = (theelementId,num) => {
        if (!isNullUndefinedEmptyString(theelementId)) {
            let idArray = (theelementId).split('_');
            let idPosition = ((idArray) => {
                return ((idArr) => {
                    for (let m in idArr) {
                        if (Object.is(idArr[m], "0")) { return m; }
                    }
                })(idArray);
            })(idArray);
            idArray[idPosition] = num;
            document.getElementById(theelementId).setAttribute("id", idArray.join('_'));
        }
    };

    _setPortletsForStatement = (seq) => { //.MultiStatements
        const number_of_items = FocusQuestionObject['MultiStatements']["Total_Statements"];
        for (let m = 1; m <= number_of_items; ++m) {
            const clonePortletBySequenceId = ((num) => {
                let clonablePortlet = document.getElementById("multistatement_input_" + 0 + "_col_" + postfixSequence);
                let portlet = clonablePortlet.cloneNode(true);
                portlet.setAttribute("id", "multistatement_input_" + num + "_col_" + postfixSequence);
                portlet.setAttribute("style", "display:block;");
                clonablePortlet.parentNode.appendChild(portlet);

                let defaultElements = portlet.getElementsByClassName("clonable");
                for (let d in defaultElements) {
                    if (!isNullUndefinedEmptyString(defaultElements[d])) {
                        const changePortletId = ((theelementId) => {
                            if (!isNullUndefinedEmptyString(theelementId)) {
                                let idArray = (theelementId).split('_');
                                let idPosition = ((idArray) => {
                                    return ((idArr) => {
                                        for (let m in idArr) {
                                            if (Object.is(idArr[m], "0")) { return m; }
                                        }
                                    })(idArray);
                                })(idArray);
                                idArray[idPosition] = num;
                                defaultElements[d].setAttribute("id", idArray.join('_'));
                            }
                        })(defaultElements[d].id);
                    }
                }
            })(m);

            const setPorletRadioName = ((num) => {
                let ele = document.getElementById("multistatement_statement_" + num + "_" + postfixSequence);
                ele.setAttribute("name", ele.getAttribute("id"));
            })(m);

            const setPortletSequenceLabel = (() => { document.getElementById("question_number_" + m + "_multistatement_" + postfixSequence).innerHTML = m + ". "; })();

            const setPortletTitle = ((num) => {
                document.getElementById("multistatement_input_" + num + "_placing" + "_" + postfixSequence).innerHTML = FocusQuestionObject['MultiStatements']['AllStatements'][num - 1]['Statement_Text'];
            })(m);

            const setPortletOptions = ((num) => {
                let number_of_options = FocusQuestionObject['MultiStatements']['AllStatements'][num - 1]['Number_Of_Options'];
                let all_options = FocusQuestionObject['MultiStatements']['AllStatements'][num - 1]['Options'];
                const setFirstOptionIdOnly = (() => {
                    let ele = document.getElementById("multistatement_statement_"+num+"_" + postfixSequence);
                    if (!isNullUndefinedEmptyString(ele)) {
                        ele.setAttribute("id", ele.id + "_radio_1");                    
                        ele.setAttribute("value", all_options[0].line);
                    }                    
                })();

                const setLabelFirstOptionOnly = (() => {
                    let ele = document.getElementById("multistatement_" + num + "_" + postfixSequence);
                    if (!isNullUndefinedEmptyString(ele)) {
                        ele.setAttribute("id", ele.id + "_label_1");
                        ele.innerHTML = all_options[0].line;
                    }
                })();

                const setOtherOptionsOnly = (() => {
                    for (let n = 2; n <= number_of_options; ++n) {

                        const setAllIds = (() => {
                            let newOption = document.getElementById("radios_for_statement_" + num + "_" + postfixSequence).children[0].cloneNode(true);
                            let newId = "multistatement_statement_" + num + "_" + postfixSequence + "_radio_" + n;
                            newOption.children[0].setAttribute("id", newId);
                            newOption.children[0].setAttribute("value", all_options[n - 1].line);
                            document.getElementById("radios_for_statement_" + num + "_" + postfixSequence).appendChild(newOption);
                        })();

                        const setAllLabels = (() => {
                            let newRadio = document.getElementById("multistatement_statement_" + num + "_" + postfixSequence + "_radio_" + n);
                            let newLabelId = "multistatement_" + num + "_" + postfixSequence + "_label_" + n;
                            if (!isNullUndefinedEmptyString(newRadio.parentNode.children[1])) {
                                newRadio.parentNode.children[1].setAttribute("id", newLabelId);
                                document.getElementById(newLabelId).innerHTML = all_options[n - 1].line;
                            }
                        })();

                    }
                })();               

            })(m);

            const setPortletPicture = ((num) => {
                const datasrc = FocusQuestionObject['MultiStatements']['AllStatements'][num - 1]['Picture_Chosen']['data'];
                if (!isNullUndefinedEmptyString(datasrc)) {
                    document.getElementById("multistatement_" + num + "_picture_placing_" + postfixSequence).setAttribute("src", datasrc);
                    document.getElementById("multistatement_" + num + "_picture_placing_" + postfixSequence).setAttribute("alt", FocusQuestionObject['MultiStatements']['AllStatements'][num - 1]['Picture_Chosen']['name']);
                    document.getElementById("multistatement_" + num + "_picture_placing_" + postfixSequence).setAttribute("style", "width:100px;height:100px;");
                }
            })(m);

        }

    };

    _setRatingPortlets = () => {
        const num_of_statements = FocusQuestionObject["Rating"]["TotalStatements"];
        for (let n = 1; n <= num_of_statements; ++n) {
            const clonePortletBySequenceId = ((num) => {
                let clonablePortlet = document.getElementById("rating_input_" + 0 + "_col_" + postfixSequence);
                let portlet = clonablePortlet.cloneNode(true);
                portlet.setAttribute("id", "rating_input_" + num + "_col_" + postfixSequence);
                clonablePortlet.parentNode.appendChild(portlet);
                portlet.className = replaceClassNameById("rating_input_" + num + "_col_" + postfixSequence, "hidden_part", "");
                
                let defaultElements = portlet.getElementsByClassName("clonable");
                for (let d in defaultElements) {
                    if (!isNullUndefinedEmptyString(defaultElements[d])) {
                        const changePortletId = ((theelementId) => {
                            if (!isNullUndefinedEmptyString(theelementId)) {
                                let idArray = (theelementId).split('_');
                                let idPosition = ((idArray) => {
                                    return ((idArr) => {
                                        for (let m in idArr) {
                                            if (Object.is(idArr[m], "0")) { return m; }
                                        }
                                    })(idArray);
                                })(idArray);
                                idArray[idPosition] = num;
                                defaultElements[d].setAttribute("id", idArray.join('_'));
                            }
                        })(defaultElements[d].id);
                    }
                }

            })(n);

            const setPortletTitle = ((num) => { 
                document.getElementById("question_number_" + num + "_rating_label_" + postfixSequence).innerHTML = num;
                document.getElementById("rating_input_" + num + "_placing" + "_" + postfixSequence).innerHTML = FocusQuestionObject['Rating']['AllStatements'][num - 1]['the_statement'];
            })(n);

            const setPortletPicture = ((num) => {
                (FocusQuestionObject['Rating']['AllStatements'][num - 1]['the_picture']["data"]) ? (() => {
                    document.getElementById("picture_" + num + "_placing_rating_" + postfixSequence).setAttribute("src", FocusQuestionObject['Rating']['AllStatements'][num - 1]['the_picture']["data"]);
                    document.getElementById("picture_" + num + "_placing_rating_" + postfixSequence).setAttribute("style", "display:block;");
                    document.getElementById("picture_" + num + "_placing_rating_" + postfixSequence).className = "img-fluid embed-responsive centerblock";
                    document.getElementById("picture_" + num + "_placing_rating_" + postfixSequence).setAttribute("alt", FocusQuestionObject['Rating']['AllStatements'][num - 1]['the_picture']["name"]);
                })() : (() => { })();
            })(n);

            const showStars = ((num) => {
                const type_selected = FocusQuestionObject['Rating']['AllStatements'][num - 1]['rating_type']; //
                const machineName_selected = RatingTypeFriendlyNamesTranslator.getMachineLangByType(type_selected) + num;

                const destroyStarsPlacement = (() => {
                    if (document.getElementById(machineName_selected) !== null) {
                        document.getElementById(machineName_selected).remove();
                    }                    
                })();

                let placement = document.createElement("div");
                placement.setAttribute("id", machineName_selected);
                placement.className = machineName_selected + " pull-left hidden_part";
                document.getElementById(RatingTypeFriendlyNamesTranslator.getMachineLangByType(type_selected) + "live_rating_" + num + "_" + postfixSequence).parentNode.appendChild(placement);

                totalStarsSelected = FocusQuestionObject['Rating']['AllStatements'][num - 1]['number_of_stars'];
                setViewForRatingByFriendlyName[type_selected](num, totalStarsSelected, postfixSequence);
                //setRatingForExistingByFriendlyName[type_selected](num, 2.5);
                removeHiddenTypeById[type_selected](num);
                removeHiddenClassForPublishLiveRatingById[type_selected](num, postfixSequence);
                const typeskeys = Object.keys(removeHiddenTypeById);
                for (let r in typeskeys) {
                    if (!Object.is(typeskeys[r], type_selected)) {
                        appendHiddenPartPublishByStarType[typeskeys[r]](num, postfixSequence);
                        appendHiddenPartPublishForLiveRating[typeskeys[r]](num, postfixSequence);
                    }
                }
            })(n);        


        }
    };


    _setItemsToDropdown = (seq) => {
        let targetedId = document.getElementById("selectoptionsdropdown_" + postfixSequence).nextSibling.nextSibling.id;
        document.getElementById("selectoptionsdropdown_" + postfixSequence).setAttribute("list", targetedId);
        document.getElementById("selectoptionsdropdown_" + postfixSequence).nextSibling.nextSibling.innerHTML = "";
        const number_of_items = FocusQuestionObject["Dropdown"]["listing"].length;
        for (let k = 0; k < number_of_items; ++k) {
            let ele = document.createElement("option");
            ele.innerHTML = FocusQuestionObject["Dropdown"]["listing"][k];
            document.getElementById("selectoptionsdropdown_" + postfixSequence).nextSibling.nextSibling.appendChild(ele);
        }
        
    };

    _setOpinionScale = (seq) => {        
        const range = parseInt(FocusQuestionObject["OpinionScale"]["rangeValue"]); 
        const resetScaleByRangeValue = (ranger) => {
            let q = 0;
            let currentElement = null;
            while (q < ranger) { 
                currentElement = (document.getElementById("opinionscale_scalebox_" + q + "_" + postfixSequence));
                currentElement.innerHTML = FocusQuestionObject["OpinionScale"]["customLabels"][q];
                currentElement.parentNode.setAttribute("style", currentElement.parentNode.getAttribute("style") + "display:block;");
                ++q;
            }
            while (q <= 10) {
                currentElement = (document.getElementById("opinionscale_scalebox_" + q + "_" + postfixSequence));
                currentElement.parentNode.setAttribute("style", currentElement.parentNode.getAttribute("style") + "display:none;");
                ++q;
            }
        };

        (Object.is(FocusQuestionObject['OpinionScale']['labelType'], "Labels")) ? (() => {

            resetScaleByRangeValue(range);

        })() : (Object.is(FocusQuestionObject['OpinionScale']['labelType'], "Numbers")) ? (() => {
                const resetNumericLabels = (() => {
                    for (let v = 0; v <= 10; ++v) {
                        document.getElementById("opinionscale_scalebox_" + v + "_" + postfixSequence).innerHTML = ((v * 10) / 100) * range;
                    }
                })();

            })() : (() => {
                    const resetAlphabetsLabels = (() => {
                        let m = 1;
                        while (!isNullUndefinedEmptyString(document.getElementById("opinionscale_scalebox_" + (m-1) + "_" + postfixSequence))) {
                            document.getElementById("opinionscale_scalebox_" + (m - 1) + "_" + postfixSequence).innerHTML = (m + 9).toString(36).toUpperCase();
                            ++m;
                        }
                    })();

            })();                                        

        const setLabels = (() => {
            document.getElementById("opinionscale_labelleft_" + postfixSequence).innerHTML = FocusQuestionObject["OpinionScale"]["leftExtreme"];
            document.getElementById("opinionscale_labelright_" + postfixSequence).innerHTML = FocusQuestionObject["OpinionScale"]["rightExtreme"];
            document.getElementById("opinionscale_labelbottom_" + postfixSequence).innerHTML = FocusQuestionObject["OpinionScale"]["theMiddle"];
        })();
    };

    _setNumberType = (seq) => {
        document.getElementById("number_answerinput_" + postfixSequence).setAttribute("min", FocusQuestionObject["NumberRange"]["fromNum"]);
        document.getElementById("number_answerinput_" + postfixSequence).setAttribute("max", FocusQuestionObject["NumberRange"]["toNum"]);
    };

    _setDatePickerListenerById = (theId) => {
        $(theId).datepicker({
            todayBtn: "linked",
            autoclose: true,
            clearBtn: true,
            todayHighlight: true,
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        });
    };

    _setPictureChoices = () => {
        const totalPictures = FocusQuestionObject["PictureChoices"]["AllPictures"].length;
        for (let t = 1; t <= totalPictures; ++t) {
            const createLIPlaceHolderForPicture = (() => {
                let pictureLi = document.getElementById("picture_0_LI_" + postfixSequence).cloneNode(true);
                let parentUl = document.getElementById("all_pictures_" + postfixSequence);
                pictureLi.setAttribute("id", "picture_" + t + "_LI_" + postfixSequence);
                parentUl.appendChild(pictureLi);
                pictureLi.setAttribute("style", pictureLi.getAttribute("style").split(";")[0] + ";");
            })();

            const updateIds = (() => {
                let currentElement = document.getElementById("picture_" + t + "_LI_" + postfixSequence);
                let currentId = currentElement.children[0].id.split("_");
                currentId[1] = t;
                currentElement.children[0].setAttribute("id", currentId.join("_"));
                currentId = currentElement.children[0].getAttribute("for").split("_");
                currentId[1] = t;
                currentElement.children[0].setAttribute("for", currentId.join("_") + postfixSequence);
                currentId = currentElement.children[0].children[0].id.split("_");
                currentId[1] = t;
                currentElement.children[0].children[0].setAttribute("id", currentId.join("_"));
                currentId = currentElement.children[0].children[2].id.split("_");
                currentId[1] = t;
                currentElement.children[0].children[2].setAttribute("id", currentId.join("_"));
            })();

            const setPictureSource = (() => {
                document.getElementById("picture_" + t + "_img_" + postfixSequence).setAttribute("src", FocusQuestionObject["PictureChoices"]["AllPictures"][t - 1].source);
                document.getElementById("picture_" + t + "_img_" + postfixSequence).setAttribute("alt", FocusQuestionObject["PictureChoices"]["AllPictures"][t - 1].name);
            })();

            const setCheckboxListeners = (() => {
                const isSingleSelection = (() => {
                    return Object.is(FocusQuestionObject["PictureChoices"]["SelectionType"], "Single selection") ? true : false;
                })();
                document.getElementById("picture_" + t + "_checkbox_" + postfixSequence).addEventListener("click", (event) => {
                    if (isSingleSelection) {
                        if (document.getElementById("picture_" + t + "_checkbox_" + postfixSequence).checked) {
                            for (let r = 1; r <= totalPictures; ++r) {
                                if (r !== t) {
                                    if (document.getElementById("picture_" + r + "_checkbox_" + postfixSequence).checked) {
                                        document.getElementById("picture_" + r + "_checkbox_" + postfixSequence).click();
                                    }
                                }
                            }

                        }
                    }
                }, false);
            })();

        }
    };

    _setAgreeButtonsListeners = () => {
        $(document).off("click", ".fa");
        $(document).on("click", "#confirmer_I_Agree_button_" + postfixSequence, (event) => {
            if (Object.is(event.currentTarget.className, "fa fa-square-o")) {
                event.currentTarget.className = "fa fa-check-square-o";
                document.getElementById("agree_buttons_" + postfixSequence).children[1].children[0].children[0].children[0].className = "fa fa-check-square-o";
            }
            else {
                event.currentTarget.className = "fa fa-square-o";
                document.getElementById("agree_buttons_" + postfixSequence).children[1].children[0].children[0].children[0].className = "fa fa-square-o";
            }

            //if (Object.is(event.currentTarget.className, "fa fa-square-o") || Object.is(event.currentTarget.className, "fa fa-square-o clonable")) {
            //    event.currentTarget.className = "fa fa-check-square-o";
            //    document.getElementById("agree_buttons_" + postfixSequence).children[1].children[0].children[0].children[0].className = "fa fa-square-o";
            //}
            //else {
            //    event.currentTarget.className = "fa fa-square-o";
            //}
        });
        $(document).on("click", "#confirmer_I_Disagree_button_" + postfixSequence, (event) => {    
            if (Object.is(event.currentTarget.className, "fa fa-square-o")) {    
                event.currentTarget.className = "fa fa-check-square-o";
                document.getElementById("agree_buttons_" + postfixSequence).children[0].children[0].children[0].children[0].className = "fa fa-check-square-o";
            }
            else {
                event.currentTarget.className = "fa fa-square-o";
                document.getElementById("agree_buttons_" + postfixSequence).children[0].children[0].children[0].children[0].className = "fa fa-square-o";
            }
            //if (Object.is(event.currentTarget.className, "fa fa-square-o") || Object.is(event.currentTarget.className, "fa fa-square-o clonable")) {
            //    event.currentTarget.className = "fa fa-check-square-o";
            //    document.getElementById("agree_buttons_" + postfixSequence).children[0].children[0].children[0].children[0].className = "fa fa-square-o";
            //}
            //else {
            //    event.currentTarget.className = "fa fa-square-o";
            //}
        });
        $(document).on("click", "#I_Agree_button_" + postfixSequence, (event) => {
            if (Object.is(event.currentTarget.children[0].children[0].className, "fa fa-square-o") || Object.is(event.currentTarget.children[0].children[0].className, "fa fa-square-o clonable")) {
                event.currentTarget.children[0].children[0].className = "fa fa-check-square-o";
                document.getElementById("agree_buttons_" + postfixSequence).children[1].children[0].children[0].children[0].className = "fa fa-square-o";
            }
            else {
                event.currentTarget.children[0].children[0].className = "fa fa-square-o";
            }
        });
        $(document).on("click", "#I_Disagree_button_" + postfixSequence, (event) => {
            if (Object.is(event.currentTarget.children[0].children[0].className, "fa fa-square-o") || Object.is(event.currentTarget.children[0].children[0].className, "fa fa-square-o clonable")) {
                event.currentTarget.children[0].children[0].className = "fa fa-check-square-o";
                document.getElementById("agree_buttons_" + postfixSequence).children[0].children[0].children[0].children[0].className = "fa fa-square-o";
            }
            else {
                event.currentTarget.children[0].children[0].className = "fa fa-square-o";
            }
        });
    };


    _longtext = (seq) => {
        _standardParameters(seq, "longtext_");
        
    };

    _shorttext = (seq) => {
        _standardParameters(seq, "shorttext_");
    };


    _multichoice = (seq) => {
        _standardParameters(seq, "multichoice_");
        _setPortletsForCommonChoice(seq);        
    };

    _choice = (seq) => {
        _standardParameters(seq, "choice_");
        _setPortletsForCommonChoice(seq);        
    };

    _multistatement = (seq) => {
        _standardParameters(seq, "multistatement_");
        _setPortletsForStatement(seq);
    };

    _dropdown = (seq) => {
        _standardParameters(seq, "dropdown_");
        _setItemsToDropdown(seq);
    };

    _yesno = (seq) => {
        _standardParameters(seq, "yesno_");        
    };

    _opinionscale = (seq) => {
        _standardParameters(seq, "opinionscale_");        
        _setOpinionScale(seq);
    };

    _number = (seq) => {
        _standardParameters(seq, "number_");                
        _setNumberType(seq);
    };

    _date = (seq) => {
        _standardParameters(seq, "date_");  
        _setDatePickerListenerById('#' + "m_datepicker_3_" + postfixSequence);
    };

    _picture = (seq) => {
        _standardParameters(seq, "picture_");
        _setPictureChoices();
    };

    _agree = () => {
        _standardParameters(this.sequenceNumber, "agree_");
        _setAgreeButtonsListeners();
    };

    _file = () => {
        _standardParameters(this.sequenceNumber, "file_");
        document.getElementById("fileuploader_sequence_" + this.sequenceNumber).addEventListener("change", (event) => {
            (event.currentTarget.files[0].name) ? (() => {
                document.getElementById("filename_fileUploader_sequence_" + this.sequenceNumber).innerHTML = event.currentTarget.files[0].name;
                document.getElementById("info_fileUploader_sequence_" + this.sequenceNumber).setAttribute("style", "display:block;");
            })() : (() => { })();            
        });
    };

    _email = () => {
        _standardParameters(this.sequenceNumber, "email_");
    };

    _rating = () => {
        _standardParameters(this.sequenceNumber, "rating_");
        _setRatingPortlets();
    };

    typeOf = {
        "longtext_": _longtext,
        "shorttext_": _shorttext,
        "multichoice_": _multichoice,
        "choice_": _choice,
        "multistatement_": _multistatement,
        "dropdown_": _dropdown,
        "yesno_": _yesno,
        "opinionscale_": _opinionscale,
        "number_": _number,
        "date_": _date,
        "picture_": _picture,
        "agree_": _agree,
        "file_": _file,
        "email_": _email,
        "rating_": _rating
    };

    this.setElement = () => {
        typeOf[this.currentType](this.sequenceNumber);
        
        if (Object.is(this.sequenceNumber, 1)) {
            if (!isNullUndefinedEmptyString(document.getElementsByClassName("sequence_1")[0])) {
                document.getElementsByClassName("sequence_1")[0].setAttribute("style", "display:inline-block;");
                document.getElementsByClassName("sequence_1")[0].className += " active";
                document.getElementById("current_sequence_number").value = "1";                
                setHiddenFields();
                document.getElementById("previous_button_publish").setAttribute("style", "display:none;");
                SaveAnswer.load();
            }        
        }
        
    };

    return ;
};


