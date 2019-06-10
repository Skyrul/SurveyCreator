

const createInputs = () => {
    const cl = document.getElementsByClassName("OpinionLabels")[0];
    const tr = cl.cloneNode(true);
};

function romanize(num) {
    if (!+num)
        return NaN;
    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}


const setVisiblePreviewLabels = (yesNo) => {
    let visibility = yesNo ? "display:block;" : "display:none;";
    document.getElementById("labelleft").setAttribute("style", visibility);
//    document.getElementById("labelbottom").setAttribute("style", visibility);
    document.getElementById("labelright").setAttribute("style", visibility);
};


$(document).on("click", "#select_alphabets", () => {
    createScaleByValue(10);
    document.getElementById("staglabel_button").innerHTML = "Alphabets";
    document.getElementById("labelings_opinionscale").setAttribute("style", "display:block;");
    document.getElementById("rangeSliderGroup").setAttribute("style", "display:none;");
    document.getElementById("labelInputsGroup").setAttribute("style", "display:none;");
    const resetAlphabetsLabels = (() => {
        let m = 1;
        while (!isNullUndefinedEmptyString(document.getElementById("scalebox_" + (m - 1)))) {
            document.getElementById("scalebox_" + (m - 1)).innerHTML = (m + 9).toString(36).toUpperCase();
            ++m;
        }
    })();
    setVisiblePreviewLabels(true);
    //createScaleByValue(parseInt((document.getElementById("indicatorValRange").innerHTML).trim()));

});



$(document).on("click", "#select_labels", () => {
    document.getElementById("staglabel_button").innerHTML = "Labels";
    document.getElementById("labelings_opinionscale").setAttribute("style", "display:none;");
    document.getElementById("rangeSliderGroup").setAttribute("style", "display:block;");
    document.getElementById("labelInputsGroup").setAttribute("style", "display:block;");
    const resetRangeAttributesForLabels = (() => {
        document.getElementById("myRange").setAttribute("min", "2");
        document.getElementById("myRange").setAttribute("max", "10");
        document.getElementById("myRange").setAttribute("step", "1");
        document.getElementById("myRange").setAttribute("value", "3");
        document.getElementById("indicatorValRange").innerHTML = "3";
    })();
    createScaleByValue(2);
    createLabelInputs(3);
    setVisiblePreviewLabels(false);
});

$(document).on("click", "#select_numbers", () => {
    document.getElementById("staglabel_button").innerHTML = "Numbers";
    document.getElementById("labelings_opinionscale").setAttribute("style", "display:block;");
    document.getElementById("rangeSliderGroup").setAttribute("style", "display:block;");
    document.getElementById("labelInputsGroup").setAttribute("style", "display:none;");
    const resetRangeAttributesForNumbers = (() => {
        document.getElementById("myRange").setAttribute("min", "10");
        document.getElementById("myRange").setAttribute("max", "100");
        document.getElementById("myRange").setAttribute("step", "10");
        document.getElementById("myRange").setAttribute("value", "10");
        document.getElementById("indicatorValRange").innerHTML = "10";
    })();

    const resetNumbersLabels = (() => {
        let m = 1;
        while (!isNullUndefinedEmptyString(document.getElementById("scalebox_" + (m - 1)))) {
            document.getElementById("scalebox_" + (m - 1)).innerHTML = (m-1)+"";
            ++m;
        }
    })();    
    createScaleByValue(parseInt((document.getElementById("indicatorValRange").innerHTML).trim()));
    setVisiblePreviewLabels(true);
});


const resetPreviewPicture = (toValue) => {

    var scaleReset = document.getElementById("scale-selector");
    scaleReset.innerHTML = "";
    // recreate
    for (var j = 1; j <= toValue; ++j) {
        if (document.getElementById("sc_" + j) === null) {
            var listmore = document.createElement("li");
            listmore.setAttribute("class", "one-li");

            var a_link = document.createElement("a");
            a_link.setAttribute("id", "sc_" + j);            
            a_link.setAttribute("onclick", "setActiveNum(" + j + ")");
            //a_link.setAttribute("onclick", "setActiveNum(")");
            a_link.innerHTML = "<div style='width:30px;height:30px;'>"+j+"</div>";
            listmore.appendChild(a_link);
            document.getElementById("label_scale_" + j).value = "" + j;

            var scale = document.getElementById("scale-selector");
            scale.appendChild(listmore);
        }
    }

    var iconsReset = document.getElementById("icon-selector");
    iconsReset.innerHTML = "";
    // recreate
    for (var j = 1; j <= toValue; ++j) {
        if (document.getElementById("icon_" + j) === null) {
            var listmore = document.createElement("li");
            listmore.setAttribute("class", "one-li");

            var a_link = document.createElement("a");
            a_link.setAttribute("id", "icon_" + j);
            a_link.setAttribute("onclick", "setActiveNum(" + j + ")");
            a_link.innerHTML = "<img id='picture_"+j+"' src='test1.png' style='width:30px;height:30px;'>";
            listmore.appendChild(a_link);

            iconsReset.appendChild(listmore);
        }
    }


};



/**
Deprecated and replaced by : doOpinionScaleIconic(typeSelector)
**/
const doOpinionScaleIcons = () => {
    var questionGroupId = "questionGroup_1";
    var placeholder = PreviewPlace.answertype;
    var answerType = ElementIDs.opinionscale;
    var maximumVal = 50;
    var minVal = 5;
    var rangeVal = getSliderValue("indicatorValRange");
    var listOfNums = document.createElement("ul");
    let main = document.createElement("div");
    let listOfImgs = document.createElement("ul");

    if (document.getElementById("main") === null) {
        main.setAttribute("id", "main");
        document.getElementById(placeholder).appendChild(main);
    }
    else {
        main.innerHTML = "";
    }

    let line = document.createElement("div");
    line.setAttribute("id", "line_wrap_table");

    let td1 = document.createElement("div");
    line.appendChild(td1);

    if (document.getElementById("icon-selector") === null) {
        let spanmiddle = document.createElement("span");
        spanmiddle.setAttribute("class", "nowrap");
        listOfImgs.setAttribute("id", "icon-selector");
        listOfImgs.setAttribute("class", "slider-range");
        main.appendChild(spanmiddle);
        spanmiddle.appendChild(listOfImgs);
        td1.appendChild(spanmiddle);
    }

    let td2 = document.createElement("div");
    line.appendChild(td2);

    main.appendChild(line);

    if (document.getElementById("scale-selector") === null) {
        let spanmiddle = document.createElement("span");
        spanmiddle.setAttribute("class", "nowrap");
        listOfNums.setAttribute("id", "scale-selector");
        listOfNums.setAttribute("class", "slider-range");
        main.appendChild(spanmiddle);
        spanmiddle.appendChild(listOfNums);
        td2.appendChild(spanmiddle);
    }

    main.appendChild(document.createElement("br"));

    /*
    if (document.getElementById("theMiddle") === null) {
        let theMiddle = document.createElement("label");
        theMiddle.setAttribute("id", "theMiddle");
        theMiddle.setAttribute("style", "position:inherit; padding-left:20%;");
        main.appendChild(theMiddle);
        theMiddle.innerHTML = "This is the middle";
    }
    */

    PreviewScalerByType(TypeSelector["Text with Icons"], rangeVal);

};


const doOpinionScaleIconic = (typeSelector) => {
    var questionGroupId = "questionGroup_1";
    var placeholder = PreviewPlace.answertype;
    var answerType = ElementIDs.opinionscale;
    var maximumVal = 50;
    var minVal = 5;    
    var listOfNums = document.createElement("ul");
    let main = document.createElement("div");
    let listOfImgs = document.createElement("ul");

    if (document.getElementById("main") === null) {
        main.setAttribute("id", "main");
        document.getElementById(placeholder).appendChild(main);
    }
    else {
        main.innerHTML = "";
    }

    let line = document.createElement("div");
    line.setAttribute("id", "line_wrap_table");

    let td1 = document.createElement("div");
    line.appendChild(td1);

    if (document.getElementById("icon-selector") === null) {
        let spanmiddle = document.createElement("span");
        spanmiddle.setAttribute("class", "nowrap");
        listOfImgs.setAttribute("id", "icon-selector");
        listOfImgs.setAttribute("class", "slider-range");
        main.appendChild(spanmiddle);
        spanmiddle.appendChild(listOfImgs);
        td1.appendChild(spanmiddle);
    }

    let td2 = document.createElement("div");
    line.appendChild(td2);

    main.appendChild(line);

    if (document.getElementById("scale-selector") === null) {
        let spanmiddle = document.createElement("span");
        spanmiddle.setAttribute("class", "nowrap");
        listOfNums.setAttribute("id", "scale-selector");
        listOfNums.setAttribute("class", "slider-range");
        main.appendChild(spanmiddle);
        spanmiddle.appendChild(listOfNums);
        td2.appendChild(spanmiddle);
    }

    main.appendChild(document.createElement("br"));    
};



/**
Deprecated and replaced by : doOpinionScaleIconic(typeSelector)
**/
const doOpinionScalePicture = () => {
    var questionGroupId = "questionGroup_1";
    var placeholder = PreviewPlace.answertype;
    var answerType = ElementIDs.opinionscale;
    var maximumVal = 50;
    var minVal = 5;
    var rangeVal = getSliderValue("indicatorValRange");
    var listOfNums = document.createElement("ul");
    let main = document.createElement("div");
    let listOfImgs = document.createElement("ul");

    if (document.getElementById("main") === null) {
        main.setAttribute("id", "main");
        document.getElementById(placeholder).appendChild(main);
    }
    else {
        main.innerHTML = "";
    }

    let line = document.createElement("div");
    line.setAttribute("id", "line_wrap_table");

    let td1 = document.createElement("div");
    line.appendChild(td1);

    if (document.getElementById("icon-selector") === null) {
        let spanmiddle = document.createElement("span");
        spanmiddle.setAttribute("class", "nowrap");
        listOfImgs.setAttribute("id", "icon-selector");
        listOfImgs.setAttribute("class", "slider-range");
        main.appendChild(spanmiddle);
        spanmiddle.appendChild(listOfImgs);
        td1.appendChild(spanmiddle);
    }

    let td2 = document.createElement("div");
    line.appendChild(td2);

    main.appendChild(line);

    if (document.getElementById("scale-selector") === null) {
        let spanmiddle = document.createElement("span");
        spanmiddle.setAttribute("class", "nowrap");
        listOfNums.setAttribute("id", "scale-selector");
        listOfNums.setAttribute("class", "slider-range");
        main.appendChild(spanmiddle);
        spanmiddle.appendChild(listOfNums);
        td2.appendChild(spanmiddle);
    }

    main.appendChild(document.createElement("br"));

    /*
    if (document.getElementById("theMiddle") === null) {
        let theMiddle = document.createElement("label");
        theMiddle.setAttribute("id", "theMiddle");
        theMiddle.setAttribute("style", "position:inherit; padding-left:20%;");
        main.appendChild(theMiddle);
        theMiddle.innerHTML = "This is the middle";
    }
    */

    PreviewScalerByType(TypeSelector["Text with Pictures"], rangeVal);
};



const doOpinionScale = () => {
    var questionGroupId = "questionGroup_1";
    var placeholder = PreviewPlace.answertype;
    var answerType = ElementIDs.opinionscale;
    var maximumVal = 11;
    var minVal = 5;
    var rangeVal = getSliderValue("indicatorValRange");
    var listOfNums = document.createElement("ul");
    let main = document.createElement("nav");
//    if (document.getElementById("horizontalVerticalButton").innerHTML === "Vertical") {
//        console.log("set to vertical");
//    }
    if (document.getElementById("main") === null) {
        main.setAttribute("id", "main");
        main.className = "nav";
        main.setAttribute("role", "navigation");
        document.getElementById(placeholder).appendChild(main);
    }
    else {
        main.innerHTML = "";
    }

    let line = document.createElement("ul");
    line.setAttribute("id", "line_wrap_table");
    line.className = "nav-list";
//    line.setAttribute("style", "border:0");

    main.appendChild(line);
//    let tr1 = document.createElement("tr");
//    line.appendChild(tr1);

    let td1 = document.createElement("li");
    line.appendChild(td1);
    
    let td2 = document.createElement("li");
    td2.setAttribute("style", "-webkit-align-content: center;align-content: center;");
    line.appendChild(td2);

    let td3 = document.createElement("li");
    line.appendChild(td3);    

    if (document.getElementById("leftExtreme") === null) {
        let spanleft = document.createElement("span");
        spanleft.setAttribute("class", "nowrap");
        let leftExtreme = document.createElement("label");
        leftExtreme.setAttribute("id", "leftExtreme");
        //        leftExtreme.setAttribute("class", "nowrap");
        main.appendChild(spanleft);
        spanleft.appendChild(leftExtreme);
        leftExtreme.innerHTML = "";
        td1.appendChild(spanleft);
    }

    if (document.getElementById("scale-selector") === null) {
        let spanmiddle = document.createElement("span");
        spanmiddle.setAttribute("class", "nowrap");
        listOfNums.setAttribute("id", "scale-selector");
        listOfNums.setAttribute("class", "slider-range");
        main.appendChild(spanmiddle);
        spanmiddle.appendChild(listOfNums);
        td2.appendChild(spanmiddle);
    }

    if (document.getElementById("rightExtreme") === null) {
        let spanright = document.createElement("span");
        spanright.setAttribute("class", "nowrap");
        main.appendChild(spanright);
        let rightExtreme = document.createElement("label");
        rightExtreme.setAttribute("id", "rightExtreme");
        //        rightExtreme.setAttribute("style", "position:inherit; padding-left:30%;");
        spanright.appendChild(rightExtreme);
        rightExtreme.innerHTML = "";
        td3.appendChild(spanright);
    }

    main.appendChild(document.createElement("br"));

    if (document.getElementById("theMiddle") === null) {
        let theMiddle = document.createElement("label");
        theMiddle.setAttribute("id", "theMiddle");
//        theMiddle.setAttribute("style", "position:inherit; padding-left:20%;");
        theMiddle.className = "";
        document.getElementById(placeholder).appendChild(theMiddle);
//        main.appendChild(theMiddle);
        theMiddle.innerHTML = "";
    }

//    resetPreviewScale(rangeVal);
    PreviewScalerByType(TypeSelector[currentTypeSelected], rangeVal);
};

const createScaleBoxByNumber = (number, content = "") => {

    let onebox = createLiElement = (() => {
        let onebox = document.createElement("button");
        onebox.className = "btn m-btn--square  btn-outline-info m-btn m-btn--custom scalebox";
        onebox.setAttribute("type", "button");
        onebox.setAttribute("onclick", "setActiveNum(event)");
        onebox.setAttribute("style", "height:50px;margin:8px;width:auto");
        return onebox;
    })();


    //let columnWrapper = (() => {
    //    let colWrapper = document.createElement("div");
    //    colWrapper.className = "col-md-12 col-lg-6 col-xl-3";
    //    return colWrapper;
    //})();

    //columnWrapper.appendChild(mWidgetWrapper);

    //mWidgetWrapper.appendChild(onebox);

    let contentHolder = createAElement = (() => {
        let contentHold = document.createElement("a");
        contentHold.setAttribute("id", "scalebox_" + number);
        contentHold.setAttribute("onclick", "setActiveNum(event)"); 
        contentHold.className = "scalebox";

        //if (Object.is((document.getElementById("staglabel_button").innerHTML).trim(), "Roman numerals")) {
        //    contentHold.innerHTML = romanize(content === "" ? number + "" : content);    
        //}
        //else if (Object.is((document.getElementById("staglabel_button").innerHTML).trim(), "Alphabets")) { //String.fromCharCode(97 + n);
        //    contentHold.innerHTML = content === "" ? String.fromCharCode(64 + number) : content;
        //}
        //else {
        //    contentHold.innerHTML = (content === "" ? number + "" : content);    
        //}

        contentHold.innerHTML = number + "";
        
        return contentHold;
    })();

    onebox.appendChild(contentHolder);

    return onebox;
};


const createBlueprintScale = (value) => {
    for (let y = 0; y <= value; ++y) {
        let abox = createScaleBoxByNumber(y);
        document.getElementById("scalebox_parent").appendChild(abox);
    }
};

const createScaleByValue = (value) => {
    const standardMaxUnit = 10;
    const scaleboxPrefix = "scalebox_";    

    document.getElementById("scalebox_parent").innerHTML = "";
    document.getElementById("scalebox_parent").className = "col-lg-10 slider-range row";

    if (value > standardMaxUnit) {
        createBlueprintScale(standardMaxUnit);
        const updateScaleBoxesByScale = (() => {
            for (let k = 1; k <= standardMaxUnit; ++k) {
                document.getElementById("scalebox_" + k).innerHTML = "" + Math.round((value * ((k * standardMaxUnit) / 100)));
            }
        })();        
    }

    if (value <= standardMaxUnit) {
        createBlueprintScale(value);
    }    
};

const createLabelInputs = (numof) => {
    if (Object.is(document.getElementById("staglabel_button").innerHTML, "Labels")) {
        document.getElementById("labelInputsGroup").setAttribute("style", "display:block;");
        (document.getElementById("labellingInputs")).innerHTML = "";
        for (let k = 1; k <= numof; ++k) {
            const createInputboxes = (() => {
                let group = document.getElementById("labelInputsGroup");
                let theInput = group.children[0];
                let inputClone = theInput.cloneNode(true);
                inputClone.setAttribute("id", inputClone.id + k);
                (document.getElementById("labellingInputs")).appendChild(inputClone);
                inputClone.setAttribute("style", "display:block;");
                let newInput = inputClone.getElementsByClassName("clonable");
                for (let jitem of newInput) {
                    jitem.setAttribute("id", jitem.id + k);
                }
            })();
            document.getElementById("label_" + k).innerHTML = document.getElementById("label_" + k).innerHTML + k;
            const addInputboxesListeners = (() => {
                document.getElementById("labelInput_" + k).addEventListener("keyup", () => {
                    reflect("labelInput_" + k, "scalebox_" + (k - 1));
                    //document.getElementById("scalebox_" + (k - 1)).innerHTML = document.getElementById("labelInput_" + k).value;
                });
            })();
        }
    }
    else {
        document.getElementById("labelInputsGroup").setAttribute("style", "display:none;");
    }
};


const setOpinionScale = (answerType_) => {
    if (answerType_ === "opinionscale_") {
        (document.getElementById("staglabel_input")).setAttribute("style", "display:block;");
        document.getElementById("opinionscale_preview").className = removeHiddenClassById("opinionscale_preview");
        document.getElementById("opinionscale_input").className = "col-lg-12";
        var slider = document.getElementById("myRange");
        var output = document.getElementById("indicatorValRange");
        output.innerHTML = slider.value; // Display the default slider value

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function () {
            output.innerHTML = this.value;
            var currentValue = parseInt(this.value);
//            resetPreviewScale(currentValue);
//            PreviewScalerByType(TypeSelector[currentTypeSelected], currentValue);

            (Object.is(document.getElementById("staglabel_button").innerHTML, "Labels")) ? (() => {                
                createScaleByValue(currentValue - 1);
                createLabelInputs(currentValue);
            })() : (() => { createScaleByValue(currentValue); })();                                        
        }
    }
    else {
        document.getElementById("opinionscale_input").className = "col-lg-12 hidden_part";
//        document.getElementById("staglabel_input").className += " hidden_part";
        document.getElementById("opinionscale_preview").className += " hidden_part";
    }

};


//$(document).on("click", ".scalebox", (e) => {
//    const targetId = e.currentTarget.id;
//    document.getElementById(e.currentTarget.id).className += " active";
    //const totalScaleBox = document.getElementById("scalebox_parent").children.length;
    //for (let q = 0; q < totalScaleBox; ++q) {
    //    if (!Object.is(targetId, "scalebox_" + q)) {
    //        document.getElementById("scalebox_" + q).className = "scalebox";
    //    }        
    //}
//});


//const setActiveNum = (which) => {            
//    for (var j = 0; j <= 10; ++j) {
//        var currentElement = document.getElementById("scalebox_" + j);
//        if (currentElement) {
//            currentElement.className = Object.is(j, which) ? "active" : "";
//        }
//    }
//};


const setActiveNum = (e) => {           
    if (e instanceof Event) {        
        const theElement = e.currentTarget.parentNode;        
        for (let q = 0; q < theElement.children.length; ++q) {
            theElement.children[q].className = theElement.children[q].className.replace(" active", "");
        }
        e.currentTarget.className += " active";
    }
};


const setOpinionScaleListeners = (() => {

    //possibly dead code
    $(document).on("change", "#customornot", (e) => {
        (e.currentTarget.checked) ? $(".scale_custom").show() : $(".scale_custom").hide();        
    });

    //possibly dead code
    $(document).on("click", ".select_Horizontal", (e) => {
        document.getElementById("horizontalVerticalButton").innerHTML = "Horizontal";
        var rangeVal = getSliderValue("indicatorValRange");
        PreviewScalerByType(TypeSelector[currentTypeSelected], rangeVal);
    });

    //possibly dead code
    $(document).on("click", ".select_Vertical", (e) => {
        document.getElementById("horizontalVerticalButton").innerHTML = "Vertical";
        var rangeVal = getSliderValue("indicatorValRange");
        PreviewScalerByType(TypeSelector[currentTypeSelected], rangeVal);
    });
    
    let labelIds = ['leftlabel_opinionscale', 'rightlabel_opinionscale', 'bottomlabel_opinionscale'];
    let destinationLabel = ["labelleft", "labelright", "labelbottom"];
    for (let u in labelIds) {
        $(document).on("keyup", "#" + labelIds[u], (e) => {
            reflect(labelIds[u], destinationLabel[u]);
        });
    }

    const setSizeToPreview = (size) => {
        const ids = {
            arr : {
                "Text only": "",
                "Text with Icons": "icon_",
                "Text with Pictures": "picture_",
                "Text with Emoticons": "emoticon_"
            },
            fnc() {
                return this.arr[currentTypeSelected];
            }
        };
        const Modification = (() => {
            const totalPortlets = document.getElementById("OpinionLabels").children.length - 1;
            size = parseInt(size);
            for (let p = 1; p <= totalPortlets; ++p) {
                (Object.is(ids.fnc(), "icon_")) ? 
                    (size === 100) ? document.getElementById(ids.fnc() + p + "_placing").setAttribute("style", "font-size:x-large;display:inline-block;") :
                        document.getElementById(ids.fnc() + p + "_placing").setAttribute("style", "font-size:xx-large;display:inline-block;")
                    :
                document.getElementById(ids.fnc() + p + "_placing").setAttribute("style", "width:" + size + "px;height:" + size + "px;display:inline-block;");
            }
        })();               
    };

    const setSizerElement = () => {
        document.getElementsByClassName("picture_icon_size_row")[0].className = "row col-12 picture_icon_size_row";
        $(document).on("click", ".select_SmallSize", (e) => {
            document.getElementById("smallBigButton").innerHTML = (e.currentTarget).innerHTML;
            setSizeToPreview(150);
        });
        $(document).on("click", ".select_BigSize", (e) => {
            document.getElementById("smallBigButton").innerHTML = (e.currentTarget).innerHTML;
            setSizeToPreview(300);
        });
    };

    const resetSizer = () => {
        document.getElementById("smallBigButton").innerHTML = "Default   (150 by 150px)";
        setSizeToPreview(150);
    };

    const listenToFirstChoiceTextInput = (() => {
        $(document).on("keyup", "#choice_input_1", () => {
            reflect("choice_input_1", "choice_input_1_placing");
        });
    })();

    const listenToFirstChoiceCheckbox = (() => { 
        SetListener_ChoiceInput(1);
        SetListener_pic_file(1);        
    })();

    const appendOverlayForFirstChoice = (placingType) => {

        let containerOverlay = (() => {
            if (!isNullUndefinedEmptyString(document.getElementById(placingType + 1 + "_placing"))) {
                let parent = document.getElementById(placingType + 1 + "_placing").parentNode;
                const children = document.getElementById(placingType + 1 + "_placing");
                let child = document.createElement("div");
                child.className = "container_overlay";
                child.setAttribute("id", "container_overlay_" + placingType + 1 + "_placing");
                parent.insertBefore(child, children);
                children.className += " image_overlay";
                child.appendChild(children);
                return child;
            }
        })();

        let theOverlay = (() => {
            let mid = document.createElement("div");
            mid.className = "middle_overlay";

            let content = document.createElement("div");
            content.className = "text_overlay";
            mid.appendChild(content);

            let removeButton = document.createElement("div");
            removeButton.className = "btn btn-sm btn-danger btn_remove_this_picture";
            removeButton.setAttribute("id", "remove_container_overlay_" + placingType + 1 + "_placing");
            content.appendChild(removeButton);

            removeButton.appendChild(document.createTextNode("Remove picture"));

            return mid;
        })();
        
        if (!isNullUndefinedEmptyString(containerOverlay)) { containerOverlay.appendChild(theOverlay); }

        const listenToRemovePictureButton = (() => {
            $(document).on("click", "#remove_container_overlay_" + placingType + 1 + "_placing", (e) => {
                e.currentTarget.parentNode.parentNode.previousSibling.setAttribute("style", "display:none;width:auto;");
                e.currentTarget.parentNode.parentNode.previousSibling.setAttribute("src", "");
                e.currentTarget.parentNode.parentNode.previousSibling.setAttribute("alt", "");
                document.getElementById("container_overlay_" + placingType + 1 + "_placing").setAttribute("style", "display:none;");

                const eraseInputByType = {
                    "picture_": () => { document.getElementById("pic_file_" + 1).value = ""; },
                    "icon_": () => { document.getElementsByClassName("dropdownMenuButton_" + 1)[0].innerHTML = "Select Icon"; },
                    "emoticon_": () => { document.getElementsByClassName("emoticon_dropdownMenuButton_"+1)[0].innerHTML = "Select Emoticon"; }
                };

                eraseInputByType[placingType]();

            });
        })();
        
    };

    const placingTypesFirst = ["picture_", "icon_", "emoticon_"];

    for (let z in placingTypesFirst) {
        appendOverlayForFirstChoice(placingTypesFirst[z]);
    }



    // possibly dead code; please test throughly before remove
    //const listenToIconSelected = (() => {
    //    $(document).on('click', '.select_icon', (e) => {
    //        let targeted = (e.currentTarget.children[0].className);            
    //        let pictureTarget = targeted.split(" ")[2];
    //        let itemNumber = pictureTarget.split("_")[1];
            
    //        (document.getElementsByClassName("dropdownMenuButton_" + itemNumber)[0]).innerHTML = "<i class='fa " + targeted.split(" ")[1] + "'></i> "+targeted.split(" ")[1];
    //        (document.getElementById(pictureTarget + "_placing")).children[0].className = targeted;
    //        document.getElementById("icon_" + itemNumber + "_placing").setAttribute("style", "display:centerblock;");
    //         fetch size required on UI, then:..
    //        document.getElementById("icon_" + itemNumber + "_placing").children[0].setAttribute("style","font-size:72px;")
    //        document.getElementById("picture_" + itemNumber + "_placing").setAttribute("style", "display:none;");
    //        document.getElementById("emoticon_" + itemNumber + "_placing").setAttribute("style", "display:none;");            
            
    //    });
    //})(); 

    //const onClickAgreeButton = (id) => {
    //    console.log("agree");
    //    console.log(document.getElementById(id).parentNode.parentNode);
    //    document.getElementById(id).parentNode.parentNode.click();
    //};

    //const onClickDisagreeButton = (id) => {
    //    document.getElementById(id).parentNode.parentNode.click();
    //};
   
    const selectIcon = (event) => {
        if (!(Object.is(event.currentTarget.id, "confirmer_I_agree_button") || Object.is(event.currentTarget.id, "confirmer_I_Disagree_button"))) {            
            let targeted = event.currentTarget.className;
            const iconName = targeted.split(' ')[1];
            const targetInput = document.getElementById("targetIconDropDown").value;
            const itemNumber = (document.getElementById('targetIconDropDown').value).split('_')[1];
            if (document.getElementsByClassName(targetInput)[0]) {
                document.getElementsByClassName(targetInput)[0].innerHTML = "";
            }            
            let iconMake = document.createElement('i');
            iconMake.className = targeted;
            document.getElementsByClassName(targetInput)[0].appendChild(iconMake);
            document.getElementsByClassName(targetInput)[0].appendChild(document.createTextNode(" " + iconName));
            document.getElementById("icon_" + itemNumber + "_placing").children[0].className = targeted;
            document.getElementById("icon_" + itemNumber + "_placing").children[0].setAttribute("style", "font-size:72px;")
            document.getElementById("icon_" + itemNumber + "_placing").setAttribute("style", "display:block;");
            document.getElementById("container_overlay_icon_" + itemNumber + "_placing").setAttribute("style", "display:block;");
            document.getElementById("container_overlay_emoticon_" + itemNumber + "_placing").setAttribute("style", "display:none;");
            document.getElementById("picture_" + itemNumber + "_placing").setAttribute("style", "display:none;");
            document.getElementById("emoticon_" + itemNumber + "_placing").setAttribute("style", "display:none;");
            $("#m_modal_1_2").modal("hide");
        }
    };

    const listenToIconSelected_2 = (() => {
        //document.getElementsByClassName("fa").addEventListener("click", (event)=>selectIcon(event));
        $(document).on('click', '.fa', (event)=>selectIcon(event));
    })();

    const listenToEmoticonSelected = (() => {
        $(document).on('click', '.select_emoticon', (e) => {
            let targeted = (e.currentTarget.children[0].className);
            let actualName = targeted.split(" ")[2];
            const targetButtonClass = (document.getElementById('targetEmoticonDropDown').value + "").split(' ')[0];
            const itemNumber = targetButtonClass.split('_')[2];
            const targetFolderName = (document.getElementById('targetEmoticonDropDown').value + "").split(' ')[1];
            const emoticonSelectedName = targeted.split(" ")[1];
            const imgEle = document.createElement('img');
            imgEle.setAttribute('src', '../assets/emoticons/' + targetFolderName + '/' + actualName);
            imgEle.setAttribute('alt', emoticonSelectedName);
            document.getElementsByClassName(targetButtonClass)[0].innerHTML = "";
            document.getElementsByClassName(targetButtonClass)[0].appendChild(imgEle);
            document.getElementsByClassName(targetButtonClass)[0].appendChild(document.createTextNode(emoticonSelectedName));
            document.getElementById("emoticon_" + itemNumber + "_placing").setAttribute('src', '../assets/emoticons/' + targetFolderName + '/' + actualName);
            document.getElementById("emoticon_" + itemNumber + "_placing").setAttribute('alt', emoticonSelectedName);
            document.getElementById("emoticon_" + itemNumber + "_placing").setAttribute('style', "display:inline-block;width:100px;height:100px;");            
            document.getElementById("emoticon_" + itemNumber + "_placing").className = "img-fluid embed-responsive centerblock";
            document.getElementById("container_overlay_emoticon_" + itemNumber + "_placing").setAttribute("style", "display:inline-block;");
            
            document.getElementById("picture_" + itemNumber + "_placing").setAttribute("style", "display:none;");
            document.getElementById("icon_" + itemNumber + "_placing").setAttribute("style", "display:none;");
            $("#emoticons_modal").modal("hide");
        });
    })(); 

    const listenToWhichEmoticonGroupSelected = (() => {
        $(document).on('change', '#emoticongroupselect', (e) => {
            
            const targetedId = (e.currentTarget.value);            
            clearAllEmoticonsPortlet();
            let classSplits = (document.getElementById('targetEmoticonDropDown').value + "").split(' ');
            document.getElementById('targetEmoticonDropDown').value =
                Object.is(classSplits.length, 2) ?
                classSplits[0] + (' ' + targetedId) : document.getElementById('targetEmoticonDropDown').value + (' ' + targetedId);
            document.getElementById(targetedId).setAttribute('style', 'display:block');
        });
    })();

})();

