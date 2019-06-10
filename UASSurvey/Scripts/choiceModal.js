

const PreviewScalerByType = new Function("scaleTypeFunction", "rangeValue", "scaleTypeFunction(rangeValue)");
let currentTypeSelected = "Text only";

$(document).on('click', ".emoticon_dropdownMenuButton_" + 1, (e) => {
    clearAllEmoticonsPortlet();
    const targetEmoticonDropdown = ((e.currentTarget.className + "").split(' '))[2];
    document.getElementById('targetEmoticonDropDown').value = targetEmoticonDropdown;
    document.getElementById('emoticongroupselect').value = "";
});

$(document).on('click', ".dropdownMenuButton_" + 1, (e) => {    
    const targetIconDropdown = ((e.currentTarget.className + "").split(' '))[4];
    document.getElementById('targetIconDropDown').value = targetIconDropdown;    
});

const resetPreviewScale = (toValue) => {
    /*
    SetPortletBodyVisible(false);
    let scaleReset;
    let verticalLayout = false;
    if (document.getElementById("horizontalVerticalButton") !== null) {
        verticalLayout = (document.getElementById("horizontalVerticalButton").innerHTML === "Vertical") ? true : false;
    }    

    if (document.getElementById("scale-selector") !== null) {
        scaleReset = document.getElementById("scale-selector");
        scaleReset.innerHTML = "";
        scaleReset.className = verticalLayout ? "vertical-range" : "slider-range";
    }

    // recreate
    for (var j = 1; j <= toValue; ++j) {
        if (document.getElementById("sc_" + j) === null) {
            var listmore = document.createElement("li");
            listmore.className = verticalLayout ? "two-li" : "one-li";

            const a_link = (() => {
                var a_link = document.createElement("a");
                listmore.appendChild(a_link);
                a_link.setAttribute("id", "sc_" + j);
                a_link.setAttribute("onclick", "setActiveNum(" + j + ")");
                a_link.setAttribute("style", "width:100px;");
                return a_link;
            })();

            const CreateCheckbox = (() => {
                let checkboxLabel = document.createElement("label");
                a_link.appendChild(checkboxLabel);
                checkboxLabel.className = "m-checkbox m-checkbox--solid m-checkbox--single m-checkbox--brand";
                let checkboxer = document.createElement("input");
                checkboxLabel.appendChild(checkboxer);
                checkboxer.setAttribute("id", "checkbox_for_" + j);
                checkboxer.setAttribute("type", "checkbox");
                let spanner = document.createElement("span");
                checkboxLabel.appendChild(spanner);
                if (!verticalLayout) { a_link.appendChild(document.createElement("br")); }
            })();

            const setLabelling = (() => {
                let labelling = document.createElement("label");
                a_link.appendChild(labelling);
                labelling.setAttribute("id", "sc_label_" + j);
                labelling.className = "label_sc";
                labelling.innerHTML = "" + j;

            })();

            var scale = document.getElementById("scale-selector");
            scale.appendChild(listmore);
        }
    }
    */
};



const resetPreviewIconScale = (toValue) => {

    SetPortletBodyVisible(true);

    var scaleReset = (() => document.getElementById("scale-selector").innerHTML = "")();
    let verticalLayout = (document.getElementById("horizontalVerticalButton").innerHTML === "Vertical") ? true : false;

    createInputs();

    if (document.getElementById("scale-selector") !== null) {
        scaleReset = document.getElementById("scale-selector");
        scaleReset.innerHTML = "";
        scaleReset.className = verticalLayout ? "vertical-range" : "slider-range";
    }

    // recreate
    const currentSliderValue = parseInt(document.getElementById("indicatorValRange").innerHTML);
    for (var j = 1; j <= currentSliderValue; ++j) {
        if (document.getElementById("sc_" + j) === null) {
            var listmore = document.createElement("li");
            var scale = document.getElementById("scale-selector");
            scale.appendChild(listmore);

            listmore.className = verticalLayout ? "two-li" : "one-li";

            const a_link = (() => {
                var a_link = document.createElement("a");
                listmore.appendChild(a_link);
                a_link.setAttribute("id", "sc_" + j);
                a_link.setAttribute("onclick", "setActiveNum(" + j + ")");
                a_link.setAttribute("style", "width:100px; font-size:30px;");
                return a_link;
            })();

            const CreateCheckbox = () => {
                let checkboxLabel = document.createElement("label");
                a_link.appendChild(checkboxLabel);
                checkboxLabel.className = "m-checkbox m-checkbox--solid m-checkbox--single m-checkbox--brand";
                let checkboxer = document.createElement("input");
                checkboxLabel.appendChild(checkboxer);
                checkboxer.setAttribute("id", "checkbox_for_" + j);
                checkboxer.setAttribute("type", "checkbox");
                let spanner = document.createElement("span");
                checkboxLabel.appendChild(spanner);
            };

            const SetLabelling = () => {
                let labelling = document.createElement("label");
                a_link.appendChild(labelling);
                labelling.setAttribute("id", "sc_label_" + j);
                labelling.className = "label_sc";
                labelling.innerHTML = "" + j;
            };

            const PutIcon = () => {
                let picture_this = document.createElement("i");
                picture_this.setAttribute("class", "fa fa-cog");
                picture_this.setAttribute("id", "icon_" + j);
                picture_this.setAttribute("style", "width:50px;height:50px;");
                a_link.appendChild(picture_this);
            };

            if (verticalLayout) {
                PutIcon();
                CreateCheckbox();
                SetLabelling();
            }
            else {
                CreateCheckbox();
                a_link.appendChild(document.createElement("br"));
                SetLabelling();
                a_link.appendChild(document.createElement("br"));
                PutIcon();
            }
            //            document.getElementById("label_scale_" + j).value = "" + j;            
        }
    }

};




const resetPreviewPictureScale = (toValue) => {
    SetPortletBodyVisible(true);
    var scaleReset = (() => document.getElementById("scale-selector").innerHTML = "")();
    let verticalLayout = (document.getElementById("horizontalVerticalButton").innerHTML === "Vertical") ? true : false;

    createInputs();

    if (document.getElementById("scale-selector") !== null) {
        scaleReset = document.getElementById("scale-selector");
        scaleReset.innerHTML = "";
        scaleReset.className = verticalLayout ? "vertical-range" : "slider-range";
    }

    // recreate
    const currentSliderValue = parseInt(document.getElementById("indicatorValRange").innerHTML);
    for (var j = 1; j <= currentSliderValue; ++j) {
        if (document.getElementById("sc_" + j) === null) {
            var listmore = document.createElement("li");
            var scale = document.getElementById("scale-selector");
            scale.appendChild(listmore);

            listmore.className = verticalLayout ? "two-li" : "one-li";

            const a_link = (() => {
                var a_link = document.createElement("a");
                listmore.appendChild(a_link);
                a_link.setAttribute("id", "sc_" + j);
                a_link.setAttribute("onclick", "setActiveNum(" + j + ")");
                a_link.setAttribute("style", "width:100px;");
                return a_link;
            })();

            const CreateCheckbox = () => {
                let checkboxLabel = document.createElement("label");
                a_link.appendChild(checkboxLabel);
                checkboxLabel.className = "m-checkbox m-checkbox--solid m-checkbox--single m-checkbox--brand";
                let checkboxer = document.createElement("input");
                checkboxLabel.appendChild(checkboxer);
                checkboxer.setAttribute("id", "checkbox_for_" + j);
                checkboxer.setAttribute("type", "checkbox");
                let spanner = document.createElement("span");
                checkboxLabel.appendChild(spanner);
            };

            const SetLabelling = () => {
                let labelling = document.createElement("label");
                a_link.appendChild(labelling);
                labelling.setAttribute("id", "sc_label_" + j);
                labelling.className = "label_sc";
                labelling.innerHTML = "" + j;
            };

            const PutImage = () => {
                let picture_this = document.createElement("img");
                a_link.appendChild(picture_this);
                picture_this.setAttribute("src", "");
                if (currentTypeSelected === "Text with Pictures") {
                    picture_this.setAttribute("id", "picture_" + j);
                }
                else if (currentTypeSelected === "Text with Emoticons") {
                    picture_this.setAttribute("id", "emoticon_" + j);
                }
                picture_this.setAttribute("style", "width:50px;height:50px;");
            };

            if (verticalLayout) {
                PutImage();
                CreateCheckbox();
                SetLabelling();
            }
            else {
                CreateCheckbox();
                a_link.appendChild(document.createElement("br"));
                SetLabelling();
                a_link.appendChild(document.createElement("br"));
                PutImage();
            }
        }
    }
};

const Typers = {
    text:"Text only",
    icons:"Text with Icons",
    pics:"Text with Pictures",
    emos:"Text with Emoticons"
};


const TypeSelector = {
    "Text only": resetPreviewScale,
    "Text with Icons": resetPreviewIconScale,
    "Text with Pictures": resetPreviewPictureScale,
    "Text with Emoticons": resetPreviewPictureScale
};


const setActiveNumChoices = (which) => {
    alert("choice");
};


const ShowPortlet = {
    "1 Column": (colId) => {
        document.getElementById(colId).className = "col-md-12";
    },
    "2 Column": (colId) => {
        document.getElementById(colId).className = "col-md-6";
    },
    "3 Column": (colId) => {
        document.getElementById(colId).className = "col-md-4";
    },
    "4 Column": (colId) => {
        document.getElementById(colId).className = "col-md-3";
    }
};



const setChoiceModal = (answerType_) => {
    if (answerType_ === "multichoice_" || answerType_ === "choice_") {
        document.getElementById("emoticon_select_1").setAttribute('style', "display:none;width:auto;");
        const setChoicesInput = (() => (document.getElementById("choices_inputs")).className = "col-lg-12")();        
        const placeholder = document.getElementById(PreviewPlace.answertype);

        const OnUsePictureClick = (() => {
                SetListener_select_Pictures(1);
        })();

        const OnUseEmoticonClick = (() => {
                SetListener_select_Emoticons(1);
        })();

        const OnUseIconsClick = (() => {
                SetListener_select_Icons(1);
        })();
        
        if (placeholder !== null) {
            const setListenerForFirstChoice = (() => {
                $(document).on('keyup', '.choice_input_1', () => {                    
                    document.getElementById("m_sortable_portlets").setAttribute("style", ""); //choice_input_1_col
                    const col_size_name = document.getElementById("col_button_1").innerHTML.trim();
                    let colId = "choice_input_1_col";
                    ShowPortlet[col_size_name](colId);
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

    if (answerType_ === "choice_") {
        
    }

};


const Create_Portlet = (nextId) => {
    let portlet = (document.getElementById("choice_input_0_col")).cloneNode(true);
    document.getElementById("m_sortable_portlets").appendChild(portlet);
    portlet.setAttribute("id", "choice_input_" + nextId + "_col");
    portlet.className = "col-lg-12";
    //portlet_body_help_text_0
    (portlet.children[0].children[0].children[0].children[0].children[0].children[0]).setAttribute("id", "choice_input_" + nextId + "_checkbox");

    (portlet.children[0].children[0].children[0].children[0].children[0].children[0]).className = "m-checkbox checkbox_"+55;

    (portlet.children[0].children[0].children[0].children[0].children[0].children[1]).setAttribute("id", "choice_input_" + nextId + "_placing");
    (portlet.children[0].children[1].children[0]).setAttribute("id", "portlet_body_help_text_" + nextId);
    (portlet.children[0].children[1].children[0]).setAttribute("id", "picture_" + nextId + "_placing");
    (portlet.children[0].children[1]).setAttribute("id", "portlet_body_" + nextId);
    (portlet.children[0].children[1].children[1]).setAttribute("id", "icon_" + nextId + "_placing");
    (portlet.children[0].children[1].children[2]).setAttribute("id", "emoticon_" + nextId + "_placing");
//    (portlet.children[0].children[1].children[2]).setAttribute("id", "other_" + nextId + "_placing");
};



    const SetListener_ChoiceInput = (nextId) => {
        $(document).on("keyup", "#choice_input_" + nextId, () => {
            reflect("choice_input_" + nextId, "choice_input_" + nextId + "_placing");
        });
    };

    const SetListener_pic_file = (nextId) => {
        $(document).on("change", "#pic_file_" + nextId, (e) => {     
            
            document.getElementById("m_sortable_portlets").setAttribute("style", "");
            SetPortletBodyVisible();
            if (document.getElementById("pic_file_" + nextId).files && document.getElementById("pic_file_" + nextId).files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById("picture_" + nextId + "_placing").setAttribute("src", e.target.result);
                    // set size accordingly
                    document.getElementById("picture_" + nextId + "_placing").setAttribute("style", "display:inline-block;width:auto;");
                    document.getElementById("picture_" + nextId + "_placing").className = "image_overlay img-fluid embed-responsive centerblock";
                    document.getElementById("container_overlay_" + "picture_" + nextId + "_placing").setAttribute("style", "display:block;");                    
                    document.getElementById("container_overlay_" + "emoticon_" + nextId + "_placing").setAttribute("style", "display:none;");
                    document.getElementById("container_overlay_" + "icon_" + nextId + "_placing").setAttribute("style", "display:none;");
                    document.getElementById("emoticon_" + nextId + "_placing").setAttribute("style", "display:none;");
                    document.getElementById("icon_" + nextId + "_placing").setAttribute("style", "display:none;");
                    //portlet_body_help_text_0
//                    document.getElementById("portlet_body_help_text_" + nextId).innerHTML = "";
                };
                reader.readAsDataURL(document.getElementById("pic_file_" + nextId).files[0]);
            }
        });
    };


    const SetListener_select_Pictures = (nextId) => {        
        $(document).on("click", ".select_Pictures_" + nextId, (e) => {
            currentTypeSelected = Typers.pics;
            document.getElementById("type_button_" + nextId).innerHTML = Typers.pics;
            let selectIconEle = document.getElementById("icon_select_" + nextId);
            let fileChooserEle = document.getElementById("file_chooser_" + nextId);
            let emoticonEle = document.getElementById("emoticon_select_" + nextId);
            //            let labelEle = document.getElementsByClassName("form_label"); 
//            let emoticonEle = document.getElementsByClassName("emoticon_select");
//            let sizerEle = (() => setSizerElement())();
            //            var rangeVal = getSliderValue("indicatorValRange");
            fileChooserEle.className = "col-4 col-form-label file_chooser_" + nextId;            
            selectIconEle.className = "col-4 col-form-label hidden_part icon_select_" + nextId;
            emoticonEle.className = "col-4 col-form-label hidden_part emoticon_select_" + nextId;

            //todo: fetch the size from the UI input, then: 
            fileChooserEle.setAttribute("style", "display:inline-block;width:auto;");
            selectIconEle.setAttribute("style", "display:none;");
            emoticonEle.setAttribute("style", "display:none;");

            /*
            for (let i in selectIconEle) {
                selectIconEle[i].className = "col-4 col-form-label icon_select hidden_part";
                
                labelEle[i].className = "col-4 col-form-label form_label";
                emoticonEle[i].className = "col-4 col-form-label emoticon_select hidden_part";                
            }
            */
            //            doOpinionScaleIconic();
//            resetSizer();
//            PreviewScalerByType(TypeSelector["Text with Pictures"], rangeVal);
        });

    };

const SetListener_select_Icons = (nextId) => {
    $(document).on("click", ".select_Icons_" + nextId, (e) => {
        currentTypeSelected = Typers.icons;
        document.getElementById("type_button_" + nextId).innerHTML = Typers.icons;
        let selectIconEle = document.getElementById("icon_select_" + nextId);
        let fileChooserEle = document.getElementById("file_chooser_" + nextId);
        let emoticonEle = document.getElementById("emoticon_select_" + nextId);
        let portletEle = document.getElementById("portlet_body_" + nextId);
        fileChooserEle.className = "col-4 col-form-label hidden_part file_chooser_" + nextId;
        fileChooserEle.setAttribute("style", "display:none");
        selectIconEle.className = "col-4 col-form-label icon_select_" + nextId;
        selectIconEle.setAttribute("style", "display:inline-block;");
        emoticonEle.className = "col-4 col-form-label hidden_part emoticon_select_" + nextId;
        emoticonEle.setAttribute("style", "display:none");
        portletEle.className = "m-portlet__body";
        document.getElementById("picture_" + nextId + "_placing").setAttribute("style", "display:none");
    });
};


const SetListener_select_Emoticons= (nextId) => {
    $(document).on("click", ".select_Emoticons_" + nextId, (e) => {
        SetPortletBodyVisible();
        currentTypeSelected = Typers.emos;
        document.getElementById("type_button_" + nextId).innerHTML = Typers.emos;
        let selectIconEle = document.getElementById("icon_select_" + nextId);
        let fileChooserEle = document.getElementById("file_chooser_" + nextId);
        let emoticonEle = document.getElementById("emoticon_select_" + nextId);
        let portletEle = document.getElementById("portlet_body_"+nextId);
        fileChooserEle.className = "col-4 col-form-label hidden_part file_chooser_" + nextId;
        selectIconEle.className = "col-4 col-form-label hidden_part icon_select_" + nextId;
        emoticonEle.className = "col-4 col-form-label emoticon_select_" + nextId;
        emoticonEle.setAttribute("style", "display:inline-block;width:auto;");
        selectIconEle.setAttribute("style", "display:none;");
        fileChooserEle.setAttribute("style", "display:none;");
        portletEle.className = "m-portlet__body";
    });
};


const SetAllInputListenersByNextId = (nextId) => {

    SetListener_ChoiceInput(nextId);
    SetListener_pic_file(nextId);
    SetListener_select_Pictures(nextId);
    SetListener_select_Icons(nextId);
    SetListener_select_Emoticons(nextId);

};


const SetPortletBodyVisible = (on) => {
    const classes = ["m-portlet__body hidden_part", "m-portlet__body"];
    const [hide_it, show_it] = classes;
    const { text, icons, pics, emos } = Typers;
    const totalPortlets = document.getElementById("OpinionLabels").children.length - 1;
    (Object.is(currentTypeSelected, text)) ? (() => {        
//        alert("test hide");
        for (let k = 1; k <= totalPortlets; ++k) {
            document.getElementById("portlet_body_" + k).className = hide_it;
        }
    })()
        : (() => {   
//            alert("test show");
        for (let k = 1; k <= totalPortlets; ++k) {
            document.getElementById("portlet_body_" + k).className = show_it;
        }

    })();   
};



const replaceClassNameByClass = (classTarget, replaceTargetClass, withThisClassName, replaceTargetIndex=0) => {
    let classElementTarget = document.getElementsByClassName(replaceTargetClass);
    if (!Object.is(classElementTarget, undefined)) {
        let previousClassName = document.getElementsByClassName(replaceTargetClass)[replaceTargetIndex].className + "";
        let foundClass = findClassName(document.getElementsByClassName(replaceTargetClass)[replaceTargetIndex].className + "", classTarget);
        let finalClass = "";
        if (isClassFound(foundClass)) {
            finalClass = assembleClassStringExcept(foundClass, previousClassName);
            finalClass += withThisClassName;
        }
        document.getElementsByClassName(replaceTargetClass)[replaceTargetIndex].className = finalClass;
    }
};



const removeOtherPortlet = () => {
    if (document.getElementById("othertext") !== undefined) {
        if (document.getElementById("othertext") !== null) {
            document.getElementById("othertext").parentNode.parentNode.parentNode.remove();
        }        
    }
};



var addTheChoice = () => {
    const setNew = () => {

    SetPortletBodyVisible();
    const focusElement = $('.btn_add_the_choice')[0];
//    const thepreviousid = focusElement.getAttribute('data-id');
    const nextId = parseInt(document.getElementById("OpinionLabels").children.length);

    let newSection = document.getElementById("choice_input_0_section").cloneNode(true);
    newSection.className = newSection.className.replace(/\bhidden_part\b/g, "");
    newSection.setAttribute("style", "display:inline-block;");

    document.getElementById("OpinionLabels").appendChild(newSection);
    focusElement.setAttribute('data-id', "choice_input_" + nextId);

    Create_Portlet(nextId);
    
    const SetToNextId_ChoiceInput = (() => {
        newSection.setAttribute("id", "choice_input_" + nextId + "_section");
        const col_size_name = document.getElementById("col_button_1").innerHTML.trim();
        let colId = "choice_input_" + nextId + "_col";
        ShowPortlet[col_size_name](colId);

        (newSection.children[0].children[0].children[0]).setAttribute("id", "choice_input_" + nextId);
        (newSection.children[0].children[0].children[0]).setAttribute("name", "choice_input_" + nextId);
        let tempClass = ((newSection.children[0].children[0].children[0]).className).split(' ');
        (newSection.children[0].children[0].children[0]).className = tempClass[0] + ' ' + "choice_input_" + nextId;
        (newSection.children[0].children[0].children[0]).setAttribute("value", "");
        (newSection.children[0].children[0].children[0]).setAttribute("placeholder", "enter text here");
    })();
        
    const SetToNextId_dropdownMenuButtonClass = (() => {
        let dropdownMenuButtonClass = ((newSection.children[0].children[1].children[0].children[0].children[0].className) + "");
        try {
            let dropdownMenuButtonSplit = dropdownMenuButtonClass.split(" ");
            const finalIndex = dropdownMenuButtonSplit.length - 1;
            if (Object.is(dropdownMenuButtonSplit[finalIndex], "dropdownMenuButton_0")) {
                ((newSection.children[0].children[1].children[0].children[0].children[0].className)) = "";
                for (let y = 0; y <= finalIndex - 1; ++y) {
                    ((newSection.children[0].children[1].children[0].children[0].children[0].className)) += dropdownMenuButtonSplit[y] + ' ';
                }
                ((newSection.children[0].children[1].children[0].children[0].children[0].className)) += "dropdownMenuButton_" + nextId;
            }
            else { throw new Error(); }
        }
        catch (e) {
            throw new Error("Drop down button class is bad: " + e);
        }
    })();   

    //const SetToNextId_icon_ = (() => {
    //    const partTest = (((newSection.children[0].children[1].children[0].children[0]).getElementsByTagName("ul")[0]).getElementsByTagName("li"));
    //    for (let u in partTest) {
    //        if (typeof (partTest[u]) === 'object') {
    //            if (((partTest[u]).getElementsByClassName("icon_0").length) === 1) {
    //                let arrIconClass = ((partTest[u]).getElementsByClassName("icon_0")[0].className + "").split(" ");
    //                (partTest[u]).getElementsByClassName("icon_0")[0].className = arrIconClass[0] + ' ' + arrIconClass[1] + ' ' + 'icon_' + nextId;
    //            }
    //        }
    //    }
    //})();   

    //const SetToNextId_emoticon_ = (() => {
    //    const partTest = (((newSection.children[0].children[2].children[0].children[0]).getElementsByTagName("ul")[0]).getElementsByTagName("li"));
    //    for (let u in partTest) {
    //        if (typeof (partTest[u]) === 'object') {
    //            if (((partTest[u]).getElementsByClassName("emoticon_0").length) === 1) {
    //                let arrIconClass = ((partTest[u]).getElementsByClassName("emoticon_0")[0].className + "").split(" ");
    //                (partTest[u]).getElementsByClassName("emoticon_0")[0].className = 'emoticon_' + nextId + ' ' + arrIconClass[1];
                    
    //            }
    //        }
    //    }
    //})();   

    const SetToNextId_dropdownMenuButtonClass_Emoticon = (() => {        
        try {
            let dropdownMenuButtonClass = ((newSection.children[0].children[2].children[0].children[0].children[0].className) + "");
            let dropdownMenuButtonSplit = dropdownMenuButtonClass.split(" ");
            const finalIndex = dropdownMenuButtonSplit.length - 1;
            if (dropdownMenuButtonSplit[finalIndex] === "emoticon_dropdownMenuButton_0") {
                (newSection.children[0].children[2].children[0].children[0].children[0].className) = "";
                for (let y = 0; y <= finalIndex - 1; ++y) {
                    (newSection.children[0].children[2].children[0].children[0].children[0].className) += dropdownMenuButtonSplit[y] + ' ';
                }
                (newSection.children[0].children[2].children[0].children[0].children[0].className) += "emoticon_dropdownMenuButton_"+nextId;
            }
            else { throw new Error(); }
        }
        catch (e) {
            throw new Error("Drop down button class is bad: " + e);
        }
    })();   

    const SetListener_dropdownMenuButtonClass_Emoticon = (() => {        
        $(document).on('click', ".emoticon_dropdownMenuButton_" + nextId, (e) => {
            const targetEmoticonDropdown = ((e.currentTarget.className + "").split(' '))[2];
            clearAllEmoticonsPortlet();
            document.getElementById('emoticongroupselect').value = "";
            document.getElementById('targetEmoticonDropDown').value = targetEmoticonDropdown;
        });
    })();


    const SetListener_dropdownMenuButtonClass_Icon = (() => {
        $(document).on('click', ".dropdownMenuButton_" + nextId, (e) => {
            const targetIconDropdown = ((e.currentTarget.className + "").split(' '))[4];
            document.getElementById('targetIconDropDown').value = targetIconDropdown;
        });
    })();

    const SetToNextId_pic_file_ = (() => {
        newSection.children[0].children[3].children[0].setAttribute("name", "pic_file_" + nextId);
        let tmpClass = (newSection.children[0].children[3].children[0].className + "").split(" ");
        newSection.children[0].children[3].children[0].className = tmpClass[0] + " " + tmpClass[1] + " pic_file_" + nextId;
        newSection.children[0].children[3].children[0].setAttribute("id", "pic_file_" + nextId);
    })();

    const SetToNextId_type_button_ = (() => {
        document.getElementsByClassName("type_button_0")[1].setAttribute("id", "type_button_" + nextId);
        replaceClassNameById("type_button_" + nextId, "type_button_0", "type_button_" + nextId);
    })();

    const SetToNextId_file_chooser_ = (() => {
        document.getElementsByClassName("file_chooser_0")[1].setAttribute("id", "file_chooser_" + nextId);
        replaceClassNameById("file_chooser_" + nextId, "file_chooser_0", "file_chooser_" + nextId);
    })();
    

    const SetToNextId_icon_select_ = (() => {       
        let len = document.getElementsByClassName("icon_select_0").length;
        let modify_index = len - 1;
        let tmpClass = document.getElementsByClassName("icon_select_0")[modify_index];
        let tmpClassName = document.getElementsByClassName("icon_select_0")[modify_index].className;
        tmpClass.setAttribute("id", "icon_select_" + nextId);
        let foundClass = findClassName(tmpClassName, "icon_select_0");
        let finalClass = "";
        if (isClassFound(foundClass)) {
            finalClass = assembleClassStringExcept(foundClass, tmpClassName);
            finalClass += "icon_select_" + nextId;
        }
        document.getElementById("icon_select_" + nextId).className = finalClass;
    })();

    const SetToNextId_emoticon_select_ = (() => {        
        let len = document.getElementsByClassName("emoticon_select_0").length;
        let modify_index = len - 1;
        let tmpClass = document.getElementsByClassName("emoticon_select_0")[modify_index];
        let tmpClassName = document.getElementsByClassName("emoticon_select_0")[modify_index].className;
        tmpClass.setAttribute("id", "emoticon_select_" + nextId);
        let foundClass = findClassName(tmpClassName, "emoticon_select_0");
        let finalClass = "";
        if (isClassFound(foundClass)) {
            finalClass = assembleClassStringExcept(foundClass, tmpClassName);
            finalClass += "emoticon_select_" + nextId;
        }
        document.getElementById("emoticon_select_" + nextId).className = finalClass;
    })();

    const SetToNextId_typeopinion_select_ = (() => {
        let len = document.getElementsByClassName("typeopinion_select_0").length;
        let modify_index = len - 2;
        document.getElementsByClassName("typeopinion_select_0")[modify_index].setAttribute("id", "typeopinion_select_" + nextId);
        replaceClassNameById("typeopinion_select_" + nextId, "typeopinion_select_0", "typeopinion_select_" + nextId);
        replaceClassNameById("type_button_" + nextId, "typeopinion_select_0", "typeopinion_select_" + nextId);
    })();
    
    const SetToNextId_select_Pictures_ = (() => {
        let len = document.getElementsByClassName("select_Pictures_0").length;
        let modify_index = len - 1;
        document.getElementsByClassName("select_Pictures_0")[modify_index].setAttribute("id", "select_Pictures_" + nextId);
        replaceClassNameById("select_Pictures_" + nextId, "select_Pictures_0", "select_Pictures_" + nextId);
    })();

//

    const SetToNextId_select_Icons_ = (() => {
        let len = document.getElementsByClassName("select_Icons_0").length;
        let modify_index = len - 1;
        document.getElementsByClassName("select_Icons_0")[modify_index].setAttribute("id", "select_Icons_" + nextId);
        replaceClassNameById("select_Icons_" + nextId, "select_Icons_0", "select_Icons_" + nextId);
    })();

    const SetToNextId_select_Emoticons_ = (() => {
        let len = document.getElementsByClassName("select_Emoticons_0").length;
        let modify_index = len - 1;
        document.getElementsByClassName("select_Emoticons_0")[modify_index].setAttribute("id", "select_Emoticons_" + nextId);
        replaceClassNameById("select_Emoticons_" + nextId, "select_Emoticons_0", "select_Emoticons_" + nextId);
    })();

    SetAllInputListenersByNextId(nextId);

    const removeButton = (() => {
        const btn_id_class = "choice_remove_button_" + nextId;
        let rb = document.createElement("a");
        rb.setAttribute("class", "btn btn-sm btn-danger " + btn_id_class);
        rb.innerHTML = "Remove Choice";
        const setButtonListener = (() => {
            $(document).on("click", "." + btn_id_class, function () {
                this.parentElement.parentElement.remove();
                const ele = document.getElementById("choice_input_" + nextId + "_button");
                ele !== null ? ele.remove() : (() => { })();
            });
        })();
        return rb;
    })();    

    const AppendOverlay = (placingType) => {
        let containerOverlay = (() => {
            let parent = document.getElementById(placingType + nextId + "_placing").parentNode;
            const children = document.getElementById(placingType + nextId + "_placing");
            let child = document.createElement("div");
            child.className = "container_overlay";
            child.setAttribute("id", "container_overlay_" + placingType + nextId + "_placing");
            child.setAttribute("style", "display:none;");
            parent.insertBefore(child, children);
            children.className += " image_overlay";
            child.appendChild(children);
            return child;
        })();

        let theOverlay = (() => {
            let mid = document.createElement("div");
            mid.className = "middle_overlay";

            let content = document.createElement("div");
            content.className = "text_overlay";
            mid.appendChild(content);

            let removeButton = document.createElement("div");
            removeButton.className = "btn btn-sm btn-danger btn_remove_this_picture";
            removeButton.setAttribute("id", "remove_container_overlay_" + placingType + nextId + "_placing");
            content.appendChild(removeButton);

            removeButton.appendChild(document.createTextNode("Remove picture"));

            return mid;
        })();

        containerOverlay.appendChild(theOverlay);

        const listenToRemovePictureButton = (() => {
            $(document).on("click", "#remove_container_overlay_" + placingType + nextId + "_placing", (e) => {
                e.currentTarget.parentNode.parentNode.previousSibling.setAttribute("style", "display:none;width:auto;");
                e.currentTarget.parentNode.parentNode.previousSibling.setAttribute("src", "");
                e.currentTarget.parentNode.parentNode.previousSibling.setAttribute("alt", "");
                document.getElementById("container_overlay_" + placingType + nextId + "_placing").setAttribute("style", "display:none;");

                const eraseInputByType = {
                    "picture_": () => { document.getElementById("pic_file_" + nextId).value = ""; },
                    "icon_": () => { document.getElementsByClassName("dropdownMenuButton_" + nextId)[0].innerHTML = "Select Icon"; },
                    "emoticon_": () => { document.getElementsByClassName("emoticon_dropdownMenuButton_" + nextId)[0].innerHTML = "Select Emoticon"; }
                };

                eraseInputByType[placingType]();

            });
        })();

    };

    const placingTypes = ["picture_", "icon_", "emoticon_"];

    for (let z in placingTypes) {
        AppendOverlay(placingTypes[z]);
    }
    

    };

    (document.getElementById("other_choice_checkbox").checked) ? (() => {
        removeOtherPortlet();
        setNew();
        setNewOtherPortlet();
    })()
        : (() => {
            setNew();
        })();





};

const onClickPortlet = (e) => {
    let totalInputs = document.getElementById("OpinionLabels").children.length;    
    if ((document.getElementById("other_choice_checkbox").checked)) { ++totalInputs; }
    if (Object.is(answerType_, "choice_")){
        if (e.currentTarget.checked) {
            for (let m = 1; m < totalInputs; ++m) {
                    if (!Object.is(e.currentTarget.id, "choice_input_" + m + "_checkbox")) {
                        if (document.getElementById("choice_input_" + m + "_checkbox").checked) {
                            document.getElementById("choice_input_" + m + "_checkbox").click();
                        }
                    }
                }
        }
    }
    
};


const setNewOtherPortlet = () => {
    const totalInputs = document.getElementById("OpinionLabels").children.length;
    const largeId = totalInputs;
    Create_Portlet(largeId);
    document.getElementById("portlet_body_" + largeId).className = "m-portlet__body";
    const createTextAreaForOther = () => {
        let ta = document.createElement("textarea");
        ta.setAttribute("id", "othertext");
        ta.setAttribute("rows", "5");
        ta.setAttribute("cols", "12");
        ta.setAttribute("placeholder", "enter other text here");
        ta.className = "text text-dark";
        return ta;
    };
    document.getElementById("portlet_body_" + largeId).appendChild(createTextAreaForOther());
    document.getElementById("choice_input_" + largeId + "_placing").innerHTML = "Other";
};

const setOtherPortlet = (e) => {
    (e.currentTarget.checked) ?
        setNewOtherPortlet()
    :
    removeOtherPortlet();
    
};
