
const onKeyUp_rating_input_bySequenceNumber = (sequenceNumber) => {
    $(document).on("keyup", "#rating_input_" + sequenceNumber, (event) => {
        if (Object.is(sequenceNumber, 1)) { document.getElementById("rating_input_1_col").parentNode.setAttribute("style", "display:inline-block;"); }
        //console.log(event.currentTarget.value);
        document.getElementById("rating_input_" + sequenceNumber + "_col").className = "col-lg-12 rating_input_" + sequenceNumber + "_col";
        document.getElementById("rating_input_" + sequenceNumber + "_placing").innerHTML = event.currentTarget.value;
    });

};



const RatingTypes = {
    "Basic stars": "basic_stars",
    "Rounded stars": "rounded_stars",
    "Gradient stars": "gradient_stars",
    "Full stars": "full_stars"
    //"Feel Rating": "example-movie_head",
    //"Square Rating": "example-square_head",
    //"Pill Rating": "example-pill_head",
    //"Reversed Rating": "example-reversed_head",
    //"Horizontal Rating": "example-horizontal_head",
    //"Font Awesome Rating": "example-fontawesome_head",
    //"CSS Stars Rating": "example-css_head",
    //"Bootstrap Rating":"example-bootstrap_head"
};

const RatingClass = {
    "Basic stars": "basic_stars",
    "Rounded stars": "rounded_stars",
    "Gradient stars": "gradient_stars",
    "Full stars": "full_stars"
    //"Feel Rating": "box box-blue box-example-movie",
    //"Square Rating": "box box-blue box-example-square",
    //"Pill Rating": "box box-green box-example-pill",
    //"Reversed Rating": "box box-green box-large box-example-reversed",
    //"Horizontal Rating": "box box-orange box-large box-example-horizontal",
    //"Font Awesome Rating": "box box-green box-large",
    //"CSS Stars Rating": "box box-green box-example-pill",
    //"Bootstrap Rating": "box box-blue box-example-movie"
};


const setSelectedRatingValue = (obj = { "type": liveRatingType, "which": whichOne, "sequence": postfixSequence, "ratingId": id, "currentRating": currentRating}) => {
    //let liveRatePlace = (obj.sequence) ? obj.type + obj.which + "_" + obj.sequence :
    //    obj.type + obj.which;
    localStorage.setItem("rating_id_" + obj.which, JSON.stringify({
        "id": obj.ratingId,
        "currentRating": obj.currentRating,
        "live": (obj.sequence) ? obj.type + obj.which + "_" + obj.sequence : obj.type + obj.which
    }));
};


// note the underscore for the properties is absolutely necessary, else you have to change code somewhere. 
const setViewFor = {
    "basic_stars_": (id, totalStarsSelected = 5, postfixSequence, initialRate=0) => {
        let idSplit = id.split('_');
                    $("#" + id).starRating({
                        initialRating: initialRate,
                        totalStars: totalStarsSelected,
                        starShape: '',
                        starSize: 25,
                        disableAfterRate: false,
                        onHover: function (currentIndex, currentRating, $el) {
                            postfixSequence ? 
                            $('#basic_stars_live_rating_' + idSplit[idSplit.length - 1] + "_" + postfixSequence).text(currentIndex) :
                            $('.basic_stars_live_rating_' + idSplit[idSplit.length - 1]).text(currentIndex);
                        },
                        onLeave: function (currentIndex, currentRating, $el) {
                            postfixSequence ? 
                            $('#basic_stars_live_rating_' + idSplit[idSplit.length - 1] + "_" + postfixSequence).text(currentRating) :
                            $('.basic_stars_live_rating_' + idSplit[idSplit.length - 1]).text(currentRating);
                        },
                        callback: function (currentRating, $el) {                            
                            //setSelectedRatingValue({
                            //    "type": "basic_stars_live_rating_",
                            //    "which": idSplit[idSplit.length - 1],
                            //    "sequence": postfixSequence,
                            //    "ratingId": id,
                            //    "currentRating": currentRating
                            //});
                            //console.info("currentRating");
                            //console.log(currentRating);
                            //console.log('DOM element ', $el);
                        }
                    });
    },

    "rounded_stars_": (id, totalStarsSelected = 5, postfixSequence, initialRate=0) => {
        let idSplit = id.split('_');        
        $("#" + id).starRating({
            initialRating: initialRate,
            totalStars: totalStarsSelected,            
            starShape: 'rounded',
            starSize: 40,
            emptyColor: 'lightgray',
            hoverColor: 'salmon',
            activeColor: 'crimson',
            useGradient: false,
            disableAfterRate: false,
            onHover: function (currentIndex, currentRating, $el) { 
                postfixSequence ? 
                $('#rounded_stars_live_rating_' + idSplit[idSplit.length - 1] + "_" + postfixSequence).text(currentIndex) :
                $('.rounded_stars_live_rating_' + idSplit[idSplit.length - 1]).text(currentIndex);
            },
            onLeave: function (currentIndex, currentRating, $el) {
                postfixSequence ? 
                $('#rounded_stars_live_rating_' + idSplit[idSplit.length - 1] + "_" + postfixSequence).text(currentRating) :
                $('.rounded_stars_live_rating_' + idSplit[idSplit.length - 1]).text(currentRating);
            },
            callback: function (currentRating, $el) {
                setSelectedRatingValue({
                    "type": "rounded_stars_live_rating_",
                    "which": idSplit[idSplit.length - 1],
                    "sequence": postfixSequence,
                    "ratingId": id,
                    "currentRating": currentRating
                });
                //localStorage.setItem("rating_id_" + idSplit[idSplit.length - 1], JSON.stringify({ "id": id, "currentRating": currentRating }));
            }

        });
    }, 

    "gradient_stars_": (id, totalStarsSelected = 5, postfixSequence, initialRate=0) => {
        let idSplit = id.split('_');
        $("#" + id).starRating({
            initialRating: initialRate,
            totalStars: totalStarsSelected,
            starSize: 40,
            strokeWidth: 9,
            strokeColor: 'black',
            initialRating: 0,
            starGradient: {
                start: '#93BFE2',
                end: '#105694'
            },
            disableAfterRate: false,
            onHover: function (currentIndex, currentRating, $el) {
                postfixSequence ? 
                $('#gradient_stars_live_rating_' + idSplit[idSplit.length - 1] + "_" + postfixSequence).text(currentIndex) :
                $('.gradient_stars_live_rating_' + idSplit[idSplit.length - 1]).text(currentIndex);
            },
            onLeave: function (currentIndex, currentRating, $el) {
                postfixSequence ? 
                $('#gradient_stars_live_rating_' + idSplit[idSplit.length - 1] + "_" + postfixSequence).text(currentRating) :
                $('.gradient_stars_live_rating_' + idSplit[idSplit.length - 1]).text(currentRating);
            },
            callback: function (currentRating, $el) {
                setSelectedRatingValue({
                    "type": "gradient_stars_live_rating_",
                    "which": idSplit[idSplit.length - 1],
                    "sequence": postfixSequence,
                    "ratingId": id,
                    "currentRating": currentRating
                });
            }


        });
    }, 

    "full_stars_": (id, totalStarsSelected = 5, postfixSequence, initialRate=0) => {
        let idSplit = id.split('_');
        $("#" + id).starRating({
            initialRating: initialRate,
            totalStars: totalStarsSelected,
            useFullStars: true,
            disableAfterRate: false,
            onHover: function (currentIndex, currentRating, $el) {
                postfixSequence ? 
                $('#full_stars_live_rating_' + idSplit[idSplit.length - 1] + "_" + postfixSequence).text(currentIndex) : 
                $('.full_stars_live_rating_' + idSplit[idSplit.length - 1]).text(currentIndex);
            },
            onLeave: function (currentIndex, currentRating, $el) {
                postfixSequence ? 
                $('#full_stars_live_rating_' + idSplit[idSplit.length - 1] + "_" + postfixSequence).text(currentRating) :
                $('.full_stars_live_rating_' + idSplit[idSplit.length - 1]).text(currentRating);
            },
            callback: function (currentRating, $el) {
                setSelectedRatingValue({
                    "type": "full_stars_live_rating_",
                    "which": idSplit[idSplit.length - 1],
                    "sequence": postfixSequence,
                    "ratingId": id,
                    "currentRating": currentRating
                });
            }


        });

    }

};

const setViewForRatingByFriendlyName = {
    "Basic stars": (theSeqNum, totalStarsSelected = 5, postfixSequence, initialRate) => setViewFor["basic_stars_"]("basic_stars_" + theSeqNum, totalStarsSelected, postfixSequence, initialRate),
    "Rounded stars": (theSeqNum, totalStarsSelected = 5, postfixSequence, initialRate) => setViewFor["rounded_stars_"]("rounded_stars_" + theSeqNum, totalStarsSelected, postfixSequence, initialRate),
    "Gradient stars": (theSeqNum, totalStarsSelected = 5, postfixSequence, initialRate) => setViewFor["gradient_stars_"]("gradient_stars_" + theSeqNum, totalStarsSelected, postfixSequence, initialRate),
    "Full stars": (theSeqNum, totalStarsSelected = 5, postfixSequence, initialRate) => setViewFor["full_stars_"]("full_stars_" + theSeqNum, totalStarsSelected, postfixSequence, initialRate)
};



const setRatingForExisting = (id, theRating) => {
    $("#" + id).starRating('setRating', parseFloat(theRating));    
    document.getElementById(id).parentNode.children[1].innerHTML = theRating;        
};

const setRatingForExistingByFriendlyName = {
    "Basic stars": (theSeqNum, initialRate) => setRatingForExisting("basic_stars_" + theSeqNum, initialRate),
    "Rounded stars": (theSeqNum, initialRate) => setRatingForExisting("rounded_stars_" + theSeqNum, initialRate),
    "Gradient stars": (theSeqNum, initialRate) => setRatingForExisting("gradient_stars_" + theSeqNum, initialRate),
    "Full stars": (theSeqNum, initialRate) => setRatingForExisting("full_stars_" + theSeqNum, initialRate)
};




const removeHiddenClassById = (id) => {        
        var element = document.getElementById(id);
        element.className = element.className.replace(/\bhidden_part\b/g, "");
};


const removeActiveClassById = (id) => {
    var element = document.getElementById(id);
    element.className = element.className.replace(/\bactive\b/g, "");
};

const removeHiddenTypeById = {
    "Basic stars": (newStatementSequence) => {
        removeHiddenClassById("basic_stars_" + newStatementSequence);
    },
    "Rounded stars": (newStatementSequence) => {
        removeHiddenClassById("rounded_stars_" + newStatementSequence);
    },
    "Gradient stars": (newStatementSequence) => {
        removeHiddenClassById("gradient_stars_" + newStatementSequence);
    },
    "Full stars": (newStatementSequence) => {
        removeHiddenClassById("full_stars_" + newStatementSequence);
    }
};

const removeHiddenClassForLiveRatingById = {
    "Basic stars": (newStatementSequence) => {
        removeHiddenClassById("basic_stars_live_rating_" + newStatementSequence);
    },
    "Rounded stars": (newStatementSequence) => {
        removeHiddenClassById("rounded_stars_live_rating_" + newStatementSequence);
    },
    "Gradient stars": (newStatementSequence) => {
        removeHiddenClassById("gradient_stars_live_rating_" + newStatementSequence);
    },
    "Full stars": (newStatementSequence) => {
        removeHiddenClassById("full_stars_live_rating_" + newStatementSequence);
    }
};

const removeHiddenClassForPublishLiveRatingById = {
    "Basic stars": (newStatementSequence, questionNumber) => {
        removeHiddenClassById("basic_stars_live_rating_" + newStatementSequence + "_" + questionNumber);
    },
    "Rounded stars": (newStatementSequence, questionNumber) => {
        removeHiddenClassById("rounded_stars_live_rating_" + newStatementSequence + "_" + questionNumber);
    },
    "Gradient stars": (newStatementSequence, questionNumber) => {
        removeHiddenClassById("gradient_stars_live_rating_" + newStatementSequence + "_" + questionNumber);
    },
    "Full stars": (newStatementSequence, questionNumber) => {
        removeHiddenClassById("full_stars_live_rating_" + newStatementSequence + "_" + questionNumber);
    }
};


const appendHiddenPartByStarType = {
    "Basic stars": (newStatementSequence) => {
        document.getElementById("basic_stars_" + newStatementSequence).className += " hidden_part";        
    },
    "Rounded stars": (newStatementSequence) => {
        document.getElementById("rounded_stars_" + newStatementSequence).className += " hidden_part";        
    },
    "Gradient stars": (newStatementSequence) => {
        document.getElementById("gradient_stars_" + newStatementSequence).className += " hidden_part";        
    },
    "Full stars": (newStatementSequence) => {
        document.getElementById("full_stars_" + newStatementSequence).className += " hidden_part";        
    }

};

const appendHiddenPartPublishByStarType = {
    "Basic stars": (newStatementSequence, questionNumber) => {
        document.getElementById("basic_stars_" + newStatementSequence + "_" + questionNumber).className += " hidden_part";
    },
    "Rounded stars": (newStatementSequence, questionNumber) => {
        document.getElementById("rounded_stars_" + newStatementSequence + "_" + questionNumber).className += " hidden_part";
    },
    "Gradient stars": (newStatementSequence, questionNumber) => {
        document.getElementById("gradient_stars_" + newStatementSequence + "_" + questionNumber).className += " hidden_part";
    },
    "Full stars": (newStatementSequence, questionNumber) => {
        document.getElementById("full_stars_" + newStatementSequence + "_" + questionNumber).className += " hidden_part";
    }

};



const appendHiddenPartForLiveRating = {
    "Basic stars": (newStatementSequence) => {
        document.getElementById("basic_stars_live_rating_" + newStatementSequence).className += "  hidden_part";
    },
    "Rounded stars": (newStatementSequence) => {
        document.getElementById("rounded_stars_live_rating_" + newStatementSequence).className += "  hidden_part";
    },
    "Gradient stars": (newStatementSequence) => {
        document.getElementById("gradient_stars_live_rating_" + newStatementSequence).className += "  hidden_part";
    },
    "Full stars": (newStatementSequence) => {
        document.getElementById("full_stars_live_rating_" + newStatementSequence).className += "  hidden_part";
    }

};

const appendHiddenPartPublishForLiveRating = {
    "Basic stars": (newStatementSequence, questionNumber) => {
        document.getElementById("basic_stars_live_rating_" + newStatementSequence + "_" + questionNumber).className += "  hidden_part";
    },
    "Rounded stars": (newStatementSequence, questionNumber) => {
        document.getElementById("rounded_stars_live_rating_" + newStatementSequence + "_" + questionNumber).className += "  hidden_part";
    },
    "Gradient stars": (newStatementSequence, questionNumber) => {
        document.getElementById("gradient_stars_live_rating_" + newStatementSequence + "_" + questionNumber).className += "  hidden_part";
    },
    "Full stars": (newStatementSequence, questionNumber) => {
        document.getElementById("full_stars_live_rating_" + newStatementSequence + "_" + questionNumber).className += "  hidden_part";
    }

};


const onSelectNumberOfStars = (newStatementSequence) => {
    $(document).on("change", "#" + "number_of_stars_select_" + newStatementSequence, (e) => {
        totalStarsSelected = parseInt(e.currentTarget.value);
        let theViews = Object.keys(setViewFor);
        
//        for (let j in theViews) {
            //console.log(theViews[j]);
            //console.log(theViews[j] + newStatementSequence);
//            setViewFor[theViews[j]](theViews[j] + newStatementSequence);
//        }
        


    });
};
onSelectNumberOfStars(1);


const RatingTypeFriendlyNamesTranslator = {
    arrTypes: [],
    getTypes: () => {
        const totalTypes = document.getElementById("ratingtype_select_0").children.length - 1;
        this.arrTypes = [];
        for (let y = 1; y <= totalTypes; ++y) {
            arrTypes[y-1].push((document.getElementById("ratingtype_select_0").children[y].innerHTML).trim());
        }
    },
    getMachineLangByType: (friendlyName) => {       
            let tmp = friendlyName.replace(' ', '_');
            tmp = tmp.toLowerCase();            
            tmp += "_";
            return tmp;
    }
};


const onSelectRatingType = (newStatementSequence) => {
    $(document).on("change", "#" + "ratingtype_select_" + newStatementSequence, (e) => {
        const showStars = (() => {
            const type_selected = (e.currentTarget.value);
            removeHiddenClassById("rating_portlet_body_" + newStatementSequence);
            const machineName_selected = RatingTypeFriendlyNamesTranslator.getMachineLangByType(type_selected) + newStatementSequence;

            const destroyStarsPlacement = (() => {
                if (document.getElementById(machineName_selected) !== null) {
                    document.getElementById(machineName_selected).remove();
                }
                //else { alert("basic_stars_1 is null"); }
            })();

            let placement = document.createElement("div");
            placement.setAttribute("id", machineName_selected);
            placement.className = machineName_selected+" pull-left hidden_part";
            document.getElementById(RatingTypeFriendlyNamesTranslator.getMachineLangByType(type_selected) + "live_rating_" + newStatementSequence).parentNode.appendChild(placement);

            totalStarsSelected = parseInt(document.getElementById("number_of_stars_select_" + newStatementSequence).value);
            //$("#" + machineName_selected).starRating(((totalStarsSelected) => {
            //    return {
            //        totalStars: totalStarsSelected,
            //        starSize: 25,
            //        callback: function (currentRating, $el) {
            //            //make a server call here
            //        },
            //        disableAfterRate: false,
            //        onHover: function (currentIndex, currentRating, $el) {
            //            $('.' + RatingTypeFriendlyNamesTranslator.getMachineLangByType(type_selected) + 'live_rating_' + newStatementSequence).text(currentIndex);
            //        },
            //        onLeave: function (currentIndex, currentRating, $el) {
            //            $('.' + RatingTypeFriendlyNamesTranslator.getMachineLangByType(type_selected) + 'live_rating_' + newStatementSequence).text(currentRating);
            //        }

            //    }
            //})(totalStarsSelected));
            setViewForRatingByFriendlyName[type_selected](newStatementSequence, totalStarsSelected);
            removeHiddenTypeById[type_selected](newStatementSequence);
            removeHiddenClassForLiveRatingById[type_selected](newStatementSequence);
            const typeskeys = Object.keys(removeHiddenTypeById);
            for (let r in typeskeys) {
                if (!Object.is(typeskeys[r], type_selected)) {
                    appendHiddenPartByStarType[typeskeys[r]](newStatementSequence);
                    appendHiddenPartForLiveRating[typeskeys[r]](newStatementSequence);
                }
            }
        })();        

    });
};
onSelectRatingType(1);


const onClickRemoveStatement_Rating = (statement_number) => {
    $(document).on("click", "#remove_statement_" + statement_number, (e) => {
        e.currentTarget.parentNode.parentNode.parentNode.parentNode.remove();
        const updateNumberOfStatementsCounter = (() => document.getElementById("rating_inputs_count").value = parseInt(document.getElementById("rating_inputs_count").value) - 1)();
        const removeCorrespondingPortlet = (() => document.getElementById("rating_input_" + statement_number + "_col") ? document.getElementById("rating_input_" + statement_number + "_col").remove() : (() => { })())();
    });
};

const hideEverythingExcept = (id, otherOptionalClasses) => {
    var keyNames = Object.keys(RatingClass);
    for (var i in keyNames) {        
        if (RatingTypes[keyNames[i]] === id) {
            unhideElementById(RatingTypes[keyNames[i]], otherOptionalClasses);
        }
        else {            
            hideElementById(RatingTypes[keyNames[i]], otherOptionalClasses);
        }        
    }
};

const rating = (obj) => {
    if (obj.value !== null && obj.value !== "" && obj.value !== "undefined") {
        hideEverythingExcept(RatingTypes[obj.value], RatingClass[obj.value]);
    }
};


//const updateClassName = (idFocus, transitionClassName = { oldClassName: "", newClassName: "" }) => {
//    let theClassName = "";
//    if (!Object.is(document.getElementById(idFocus), null)) {
//        theClassName = document.getElementById(idFocus).className + "";
//    }    
//    const theClasses = theClassName.split(' ');
//    let finalClassName = "";
//    for (let x in theClasses) {
//        (!Object.is(transitionClassName.oldClassName, theClasses[x])) ?
//            finalClassName += theClasses[x] + " " : finalClassName += transitionClassName.newClassName;
                
//    }
//    return finalClassName;
//};


const onChangePictureForStatement_Rating = (sequenceNumber) => {
    $(document).on("change", "#rating_file_input_" + sequenceNumber, function () {
        readURL(this, "#picture_" + sequenceNumber + "_placing_rating");
    });
    if (!isNullUndefinedEmptyString(document.getElementById("rating_portlet_body_" + sequenceNumber))) { removeHiddenClassById("rating_portlet_body_" + sequenceNumber); }
    
};

onChangePictureForStatement_Rating(1);

const onClickAddNewStatement_Rating = (() => {

    $(document).on("click", "#btn_add_new_statement", () => {
        const totalStatements = document.getElementById("rating_input_1_section").children.length;
        const newStatementSequence = totalStatements + 1;

        const addNewInputGroup = (() => {

            let inputGroup = document.getElementById("rating_group_0").cloneNode(true);
            inputGroup.setAttribute("id", "rating_group_" + newStatementSequence);
            inputGroup.setAttribute("style", "display:block;");
            document.getElementById("rating_input_1_section").appendChild(inputGroup);
//            console.log(inputGroup);

            const updateStatementNumberLabel = (() => {
                document.getElementById("question_number_0_rating").setAttribute("id", "question_number_" + newStatementSequence + "_rating");
                document.getElementById("question_number_" + newStatementSequence + "_rating").className = updateClassName("question_number_" + newStatementSequence + "_rating", { oldClassName: "question_number_0_rating", newClassName: "question_number_" + newStatementSequence + "_rating" });
                document.getElementById("question_number_" + newStatementSequence + "_rating").innerHTML = newStatementSequence+". ";
            })();

            const updateStatementInput = (() => {
                document.getElementById("rating_input_0").setAttribute("id", "rating_input_" + newStatementSequence);
                document.getElementById("rating_input_" + newStatementSequence).setAttribute("name", "rating_input_" + newStatementSequence);              
                document.getElementById("rating_input_" + newStatementSequence).className = updateClassName("rating_input_" + newStatementSequence, { oldClassName: "rating_input_0", newClassName: "rating_input_" + newStatementSequence});
            })();

            const setAttributesForRemoveStatementButton = (() => {
                document.getElementById("remove_statement_0").setAttribute("id", "remove_statement_" + newStatementSequence);
                document.getElementById("remove_statement_" + newStatementSequence).className = updateClassName("remove_statement_" + newStatementSequence, { oldClassName: "remove_statement_0", newClassName: "remove_statement_" + newStatementSequence});
            })();


            const updateNumberOfStatementsCounter = (() => {
                document.getElementById("rating_inputs_count").setAttribute("value", "" + newStatementSequence);
            })();

            const updateFileDiv = (() => {
                const oldId = "rating_file_0";
                const finalId = "rating_file_" + newStatementSequence;
                document.getElementById(oldId).setAttribute("id", finalId);
                document.getElementById(finalId).className = updateClassName(finalId, { oldClassName: oldId, newClassName: finalId });
            })(); 

            const updateFileInput = (() => {
                const oldId = "rating_file_input_0";
                const finalId = "rating_file_input_" + newStatementSequence;
                document.getElementById(oldId).setAttribute("id", finalId);
                document.getElementById(finalId).setAttribute("name", finalId);
                document.getElementById(finalId).className = updateClassName(finalId, { oldClassName: oldId, newClassName: finalId });
            })();

            const updateFileSubItems = (() => {
                const oldId = "rating_input_group_0_subitems";
                const finalId = "rating_input_group_" + newStatementSequence + "_subitems";
                document.getElementById(oldId).setAttribute("id", finalId);
                document.getElementById(finalId).setAttribute("name", finalId); //
            })();

            const updateFileSubs = (() => {
                const oldId = "rating_input_group_0_subs";
                const finalId = "rating_input_group_" + newStatementSequence + "_subs";
                document.getElementById(oldId).setAttribute("id", finalId);
            })();

            const setAttributesRatingTypeInput = (() => {
                const oldId = "ratingtype_select_0";
                const finalId = "ratingtype_select_" + newStatementSequence ;
                document.getElementById(oldId).setAttribute("id", finalId);
                document.getElementById(finalId).setAttribute("name", finalId);
            })();

            const updateAttributesNumberOfStars = (() => {                
                const oldId = "number_of_stars_0";
                const finalId = "number_of_stars_" + newStatementSequence;
                document.getElementById(oldId).setAttribute("id", finalId);
                document.getElementById(finalId).className = updateClassName(finalId, { oldClassName: oldId, newClassName: finalId });
            })();

            const updateAttributesNumberOfStars_Select = (() => {
                const oldId = "number_of_stars_select_0";
                const finalId = "number_of_stars_select_" + newStatementSequence;
                document.getElementById(oldId).setAttribute("id", finalId);
                document.getElementById(finalId).setAttribute("name", finalId);
            })();


        })();

        const addNewPortletForPreview = (() => {
            const oldId = "rating_input_0_col";
            const finalParentId = "rating_input_" + newStatementSequence + "_col";
            let portlet = document.getElementById(oldId).cloneNode(true);
            portlet.setAttribute("id", finalParentId);
            document.getElementById("rating_portlets").appendChild(portlet);
            portlet.className = updateClassName(finalParentId, { oldClassName: oldId, newClassName: finalParentId });
            
            const setAttributesQuestionNumberLabel = (() => {
                const oldId = "question_number_0_rating_label";
                const finalId = "question_number_" + newStatementSequence + "_rating_label";
                document.getElementById(finalParentId).children[0].children[0].children[0].children[0].children[0].setAttribute("id", finalId);                
                document.getElementById(finalParentId).children[0].children[0].children[0].children[0].children[0].className = updateClassName(finalId, { oldClassName: oldId, newClassName: finalId });
                document.getElementById(finalId).innerHTML = newStatementSequence+". ";
            })();

            const setAttributesRatingInputPlacing = (() => {
                const ref = "question_number_" + newStatementSequence + "_rating_label";
                const oldId = "rating_input_0_placing";
                const finalId = "rating_input_" + newStatementSequence + "_placing";
                document.getElementById(ref).nextSibling.nextSibling.children[0].setAttribute("id", finalId);
            })();
            
            const setAttributesRatingPortletBody = (() => {
                const oldId = "rating_portlet_body_0";
                const finalId = "rating_portlet_body_" + newStatementSequence;
                document.getElementById(finalParentId).children[0].children[1].setAttribute("id", finalId);
            })();
            
            const setAttributesPicturePlacing = (() => {
                const ref = "rating_portlet_body_" + newStatementSequence;
                const oldId = "picture_0_placing_rating";
                const finalId = "picture_" + newStatementSequence+"_placing_rating" ;
                document.getElementById(ref).children[0].setAttribute("id", finalId);
            })();

            const setAttributesRatingsForStatement = (() => {
                const ref = "rating_portlet_body_" + newStatementSequence;
                const oldId = "ratings_for_statement_0";
                const finalId = "ratings_for_statement_" + newStatementSequence;
                document.getElementById(ref).children[1].setAttribute("id", finalId);

            })();

            const setClassNameForLiveRating = (() => {
                const ref = "ratings_for_statement_" + newStatementSequence;
                const totalTypes = parseInt(document.getElementById(ref).children.length);

                for (let m = 0; m < totalTypes; ++m) {
                    const liveRatingId = document.getElementById(ref).children[m].children[1].getAttribute("id") + "";
                    const finalRatingId = liveRatingId.replace("0", "" + newStatementSequence);
                    document.getElementById(ref).children[m].children[1].setAttribute("id", finalRatingId);
                    document.getElementById(ref).children[m].children[1].className = updateClassName(finalRatingId, { oldClassName: liveRatingId, newClassName: finalRatingId });
                }

            })();

            const setAttributesForRatings = (() => {
                const ref = "ratings_for_statement_" + newStatementSequence;
                const totalTypes = parseInt(document.getElementById(ref).children.length);
                for (let w = 0; w < totalTypes; ++w) {
                    const typeId = document.getElementById(ref).children[w].children[0].getAttribute("id");
                    const typeIdParts = typeId.split('_');
                    let typeName = "";
                    let catenateId = (() => {
                        let strfin = "";
                        for (let u in typeIdParts) {
                            (!Object.is(typeIdParts[u],"0")) ? 
                                strfin += (typeIdParts[u] + "_")
                            :
                                strfin += newStatementSequence; 

                            if (u <= 1) { typeName += (typeIdParts[u] + "_"); }                                
                            
                        }
                        return strfin;
                    })();
                    document.getElementById(ref).children[w].children[0].setAttribute("id", catenateId);
                    document.getElementById(ref).children[w].children[0].className = updateClassName(catenateId, { oldClassName: typeId, newClassName: catenateId });

                    //setViewFor[typeName](catenateId);
                }
            })();

        })();

        const addListenersForInput = (() => {
            onKeyUp_rating_input_bySequenceNumber(newStatementSequence);
            onChangePictureForStatement_Rating(newStatementSequence);
            onSelectRatingType(newStatementSequence);
            onClickRemoveStatement_Rating(newStatementSequence);
        })();


    });

})();
