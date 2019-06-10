
const QuestionObject = {
    'campaignId': 0,
    'account_number': 0,



    'questionId':0,
    'userId':0,
    'surveyId':0,
    'questionNumber':0,
    'question':'',    
    'helpText':'',
    'controlType':'',
    'childControls': {}
};

const SurveyObject = {
    'surveyId':0,
    'userId':0,
    'AllQuestions': []  // which holds an array of QuestionObjects because one Survey has many Questions
};

const CampaignObject = {
    'campaignid':0,
    'userid': 0,
    'account_number':0,
    'AllSurveys':[]   // which holds an array of SurveyObjects
};


let AllQuestions = []; // which holds an array of QuestionObjects

let AllCampaigns = [];  // which holds an array of CampaignObjects

// a CampaignObject of the current campaign of type CampaignObject in this session
let currentCampaignObject = {
    "campaignid": 1,
    "account_number":1
}; 

let currentSurveyObject = {
    "surveyid": 6
};

const OutlineModel = {
    'Question No.': '',
    'Question text': '',
    'Question Type': '',
    'Required': '',
    'Edit': '',
    'Delete': ''    
};

const OutlineSchema = [
    { 'header': 'Question No.', 'key': 'Question No.' },
    { 'header': 'Question Text', 'key': 'Question text' },
    { 'header': 'Question Type', 'key': 'Question Type' },
    { 'header': 'Required', 'key': 'Required' },
    {
    'header': 'Edit',
    'key': 'Edit',
    'template': '<span><a class="btn btn-lg {{Edit}}" data-toggle="modal" data-target="#the_modal" data-id="{{Edit}}"><img src="../../Images/edit.png" style="width:35px;"></a></span>'
    },
    {
    'header': 'Delete',
    'key': 'Delete',
    'template': '<a class="btn btn-lg {{Delete}}" onclick="alert(\'test Delete\');"><img src="../../Images/delete.png" style="width:35px;"></a>'
    }
];


let OutlineTable = [];

const getImgPictureById = (id) => {
    return {
        'name': document.getElementById(id).getAttribute("alt"),
        'data': ((src) => {
            return ((src !== '')
                && (src !== 'undefined')
                && (src !== undefined)
                && (src !== null))
                ? src : ''
        })(document.getElementById(id).getAttribute("src"))
    };
};    

const identifyControlType = () => {
    return (GlobalVariables.currentQuestionType);
};

const getAllChoices = (allChildren) => {

    const getColumnSelected = (() => {
        return (document.getElementById("col_button_1").innerHTML).trim();
    })();

    const getTotalChoices = (() => {
        return document.getElementById("OpinionLabels").children.length - 1;
    })();


    allChildren['MultiChoice'] = {
            'Number_Of_Columns': getColumnSelected,
            'Total_Choices': getTotalChoices,
            'Choices': [
                {
                    'Choice_Input_Text': '',
                    'Type_Selected': '',
                    'Picture_Chosen': { 'data': new Object(null) },
                    'Icon_Selected': '',
                    'Emoticon_Selected': ''
                },
            ],
            'Allow_Other': false
    };

    const getAllChoiceInputText = (() => {
        for (let y = 1; y <= getTotalChoices; ++y) {

            if (Object.is(allChildren['MultiChoice']['Choices'][y - 1], undefined)) {
                allChildren['MultiChoice']['Choices'].push({});
            }
            allChildren['MultiChoice']['Choices'][y - 1]['Choice_Input_Text'] = document.getElementById('choice_input_' + y).value;
        }
    })();

    const getAllTypeSelected = (() => {
        for (let y = 1; y <= getTotalChoices; ++y) {
            if (Object.is(allChildren['MultiChoice']['Choices'][y - 1], undefined)) {
                allChildren['MultiChoice']['Choices'].push({});
            }
            allChildren['MultiChoice']['Choices'][y-1]['Type_Selected'] = (document.getElementById('type_button_' + y).innerHTML).trim();
        }
    })();

    const getAllPictureChosen = (() => {
        const getPicture = (id) => {
            return {
//                'name': document.getElementById(id).getAttribute('alt'),
                'data': ((src) => {
                    return ((src !== '')
                        && (src !== 'undefined')
                        && (src !== undefined)
                        && (src !== null))
                        ? src : ''
                })(document.getElementById(id).getAttribute('src'))
            };
        };    

        for (let y = 1; y <= getTotalChoices; ++y) {
            if (Object.is(allChildren['MultiChoice']['Choices'][y - 1], undefined)) {
                allChildren['MultiChoice']['Choices'].push({});
            }
            allChildren['MultiChoice']['Choices'][y - 1]['Picture_Chosen'] = getPicture('picture_'+y+'_placing');
        }
    })();

    const getIconSelected = (() => {
        for (let y = 1; y <= getTotalChoices; ++y) {
            if (Object.is(allChildren['MultiChoice']['Choices'][y - 1], undefined)) {
                allChildren['MultiChoice']['Choices'].push({});
            }

            if (!Object.is(document.getElementsByClassName('dropdownMenuButton_' + y)[0].children[0], undefined)) {
                allChildren['MultiChoice']['Choices'][y - 1]['Icon_Selected'] = document.getElementsByClassName('dropdownMenuButton_' + y)[0].children[0].className;
            }      
            else {
                allChildren['MultiChoice']['Choices'][y - 1]['Icon_Selected'] = '';
            }
        }
    })();

    const getAllEmoticonSelected = (() => {
        for (let y = 1; y <= getTotalChoices; ++y) {
            if (Object.is(allChildren['MultiChoice']['Choices'][y - 1], undefined)) {
                allChildren['MultiChoice']['Choices'].push({});
            }

            if (!Object.is(document.getElementsByClassName('emoticon_dropdownMenuButton_' + y)[0].children[0],undefined)) {
                allChildren['MultiChoice']['Choices'][y - 1]['Emoticon_Selected'] = document.getElementsByClassName('emoticon_dropdownMenuButton_' + y)[0].children[0].src;
            }
            else {
                allChildren['MultiChoice']['Choices'][y - 1]['Emoticon_Selected'] = '';
            }            
        }
    })();

    const getOtherChoiceCheckbox = (() => {
        allChildren['MultiChoice']['Allow_Other'] = document.getElementById('other_choice_checkbox').checked;
    })();
   
    //const getAllChildrenOfMultiChoice = (() => {
    //})();
    
    return allChildren;
};

const getAllDropdowns = (allChildren) => { 
    let arr = { 'listing': getUserInputFromTextArea('dropdown_list') };
    allChildren['Dropdown'] = arr;
    return allChildren;
};

const getAllOpinionScaleChildren = (allChildren) => {    
    allChildren['OpinionScale'] = {
        rangeValue: document.getElementById('myRange').value,
        leftExtreme: document.getElementById('leftlabel_opinionscale').value,
        rightExtreme: document.getElementById('rightlabel_opinionscale').value,
        theMiddle: document.getElementById('bottomlabel_opinionscale').value,
        labelType: document.getElementById("staglabel_button").innerHTML,
        customLabels: (() => {
            let b = 1;
            let arr = [];
            while (document.getElementById("labelInput_" + b)) {
                arr.push(document.getElementById("labelInput_" + b).value);
                ++b;
            }
            return arr;
        })()
    };
    return allChildren;
};

const getAllNumberChildren = (allChildren) => {   
    allChildren['NumberRange'] = {
        'fromNum': document.getElementById('fromNum').value,
        'toNum': document.getElementById('toNum').value
    };

    return allChildren;
};

const getAllDateChildren = (allChildren) => {
    const _dateFormat = document.getElementById('date_format_builder').value;
    const _separatorFormat = document.getElementById('separator_format').value;
    const DateChildren = { 'dateFormat': _dateFormat, 'separatorFormat': _separatorFormat };
    allChildren['Date']=DateChildren;
    return allChildren;
};

const getTotalSubitemsByGroupNumber = (groupNumber) => {
    return parseInt(document.getElementById('matrix_input_group_' + groupNumber + '_subitem_count').value);
};

const getAllMatrixChildren = (allChildren) => {
    let MatrixChildren = {};
    const _totalGroups = document.getElementById('matrix_inputs_count').value;
    for (let w = 0; w < _totalGroups; ++w) {

        let key = document.getElementById('matrix_input_group_' + (w + 1) + '_textbox').value;
        let subItemsCount = getTotalSubitemsByGroupNumber(w + 1);
        MatrixChildren[key] = { 'subItems': [] };
        for (let r = 0; r < subItemsCount; ++r) {
            MatrixChildren[key]['subItems'].push(document.getElementById('matrix_input_group_' + (w + 1) + '_subitem_' + (r + 1)).value);
        }
        subItemsCount = 0;
        key = '';
    }
    allChildren.push(MatrixChildren);
    return allChildren;
};

const getAllRating = (allChildren) => {
    const totalStatements = document.getElementById('rating_input_1_section').children.length;
    allChildren['Rating'] = {
        'TotalStatements': totalStatements,
        'AllStatements': [
            {
                'the_statement': '',
                'the_picture': { 'source': {}},
                'number_of_stars': 5,
                'rating_type': ''
            }
        ]
    };
    
    const getStatements = (() => {
        for (let q = 0; q < totalStatements; ++q) {     //picture_1_placing_rating       
            if (Object.is(allChildren['Rating']['AllStatements'][q], undefined)) {
                allChildren['Rating']['AllStatements'][q] = {};
            }
            allChildren['Rating']['AllStatements'][q]['the_statement'] = document.getElementById('rating_input_' + (q + 1)).value+'';
            allChildren['Rating']['AllStatements'][q]['the_picture'] = getImgPictureById('picture_' + (q+1) + '_placing_rating');
            allChildren['Rating']['AllStatements'][q]['number_of_stars'] = document.getElementById('number_of_stars_select_' + (q + 1)).value+'';
            allChildren['Rating']['AllStatements'][q]['rating_type'] = document.getElementById('ratingtype_select_' + (q + 1)).value+'';
        }        
    })();

    return allChildren;    
};

const getAllMultiStatements = (allChildren) => {

    const getTotalStatements = (() => {
        return document.getElementById('multi_statement_input_1_section').children.length;
    })();

    

    allChildren['MultiStatements'] = 
        {
            'Total_Statements': getTotalStatements, 
            'AllStatements': [
                {
                    'Statement_Text': '',
                    'Picture_Chosen': { 'data': new Object(null) },
                    'Number_Of_Options': 0,
                    'Options': [
                        {
                            'line': '',
                        },
                    ],
                },
            ]
        }
    ;

    //const getAllChoiceInputText = (() => {
    //    for (let y = 1; y <= getTotalStatements; ++y) {
    //        if (Object.is(allChildren["MultiStatements"]["AllStatements"][y - 1], undefined)) {
    //            allChildren["MultiStatements"]["AllStatements"].push({});
    //        }
    //        allChildren["MultiStatements"]["AllStatements"][y - 1]["Statement_Text"] = document.getElementById("choice_input_" + y).value;
    //    }
    //})();

    const getAllStatements = (() => {
        for (let y = 1; y <= getTotalStatements; ++y) {
            if (Object.is(allChildren["MultiStatements"]["AllStatements"][y - 1], undefined)) {
                allChildren["MultiStatements"]["AllStatements"].push({});
            }

            const getAllChoiceInputText = (() => {
                allChildren["MultiStatements"]["AllStatements"][y - 1]["Statement_Text"] = document.getElementById("multi_statement_input_" + y).value+'';
            })();            

            const getAllPicturesChosen = (() => {
                allChildren["MultiStatements"]["AllStatements"][y - 1]["Picture_Chosen"] = getImgPictureById("picture_"+y+"_placing_multi_statement");
            })();           

            const getAllOptions = (() => {
                const getTotalOptions = (() => {
                    return document.getElementById("multi_statement_input_group_"+y+"_subs").children.length;
                })();
                allChildren['MultiStatements']['AllStatements'][y - 1]['Number_Of_Options'] = getTotalOptions;
                for (let j = 1; j <= getTotalOptions; ++j) {
                    if (Object.is(allChildren['MultiStatements']['AllStatements'][y - 1]['Options'], undefined)) {
                        allChildren['MultiStatements']['AllStatements'][y - 1]['Options'] = [];
                        allChildren['MultiStatements']['AllStatements'][y - 1]['Options'].push({});
                    }
                    allChildren['MultiStatements']['AllStatements'][y - 1]['Options'][j - 1] = { 'line': document.getElementById('multi_statement_input_group_'+y+'_subitem_'+j).value };
                }                
            })();
        }
    })();

    return allChildren;

};

const getAllPictureChoices = (allChildren) => {    
    const totalPictures = document.getElementById("all_pictures").children.length;
    //alert("test");
    //console.log(document.getElementById("final_selection").children[1]);
    const selectionType = (() => { return document.getElementById("final_selection").children[1].innerHTML.trim(); })();
    allChildren['PictureChoices'] = {
        'SelectionType': selectionType,
        'AllPictures': [
            {'source': '', 'name': ''}
        ]
    };
    for(let t = 0; t < totalPictures; ++t) {
        allChildren['PictureChoices']['AllPictures'][t] = {
            'source': (document.getElementById("all_pictures").children[t].children[0].children[0].src + ''),
            'name': (document.getElementById("all_pictures").children[t].children[0].children[0].getAttribute("alt") + '')
        };
    }
    return allChildren;
};

const extractChildValues = (answerType_, allChildren) => {

    const GenerateChildren = new Function("func","allChildren","return func(allChildren)");
    //console.log("answerType_");
    //console.log(answerType_);
    //answerType_ = GlobalVariables.currentQuestionType;
    //debugger;
    const createChildren = {
        'longtext_': () => {  return allChildren },
        'shorttext_': () => { return allChildren },
        'yesno_': () => { return allChildren },
        'agree_': () => { return allChildren },
        'email_': () => { return allChildren },
        'file_': () => { return allChildren },
        'multichoice_': () => getAllChoices(allChildren),
        "choice_": () => getAllChoices(allChildren),
        "multistatement_": () => getAllMultiStatements(allChildren),
        "dropdown_": () => getAllDropdowns(allChildren),
        "opinionscale_": () => getAllOpinionScaleChildren(allChildren),
        "number_": () => getAllNumberChildren(allChildren),
        "date_": () => getAllDateChildren(allChildren),
        "picture_": () => getAllPictureChoices(allChildren),
        "rating_": () => getAllRating(allChildren)        
    };    

    return GenerateChildren(createChildren[answerType_], allChildren);    
};

const isChecked = (checkboxElement) => {
    return checkboxElement.checked;
};

const getRequired = () => {
    let Required = { 'required': false };
    if (isChecked(document.getElementById("required"))) {
        Required['required'] = true;
    }
    else {
        Required['required'] = false;
    }
    return Required;
};

const getQuestionPicture = () => {    
    return {
        'name': document.getElementById("img_place").getAttribute("alt"),
        'data': ((src) => {
            return ((src !== "")
                && (src !== "undefined")
                && (src !== undefined)
                && (src !== null))
                ? src : ""
        })(document.getElementById("img_place").getAttribute("src"))
    };    
};

const extractStandardValues = () => {
    let allChildren = {};
    let Required = getRequired();
    allChildren['userid'] = 1;
    allChildren['questiontext'] = document.getElementById("questionGroup_0_inputQuestion").value,
        allChildren['helpText'] = document.getElementById("questionhelp_text").value,
    allChildren['questiontype'] = identifyControlType(),
    allChildren['Required'] = Required.required;
    let QuestionPicture = getQuestionPicture();
    allChildren['QuestionPicture'] = QuestionPicture;
    allChildren['LogicJumpChecked'] = document.getElementById("logic_jump_checkbox").checked;
    //console.log("allChildren");
    //console.log(allChildren);
    //debugger;
    return allChildren;
};

const fillChildControls = () => {
/*    
    if (answerType_ === "longtext_"
        || answerType_ === "shorttext_"
        || answerType_ === "yesno_"
        || answerType_ === "agree_"
        || answerType_ === "email_"
        || answerType_ === "file_"
    ) {
    */
    return extractChildValues(GlobalVariables.currentQuestionType, extractStandardValues()); 
};


const appendToAllQuestions = (addedQuestion) => {
    AllQuestions.surveyId = addedQuestion.surveyId;    
    AllQuestions.questions.push(addedQuestion);
    localStorage.removeItem("DesignerAllQuestions");
    localStorage.setItem("DesignerAllQuestions", JSON.stringify(AllQuestions));
};

const replaceToAllQuestionsById = (questionLineObject) => {
    let control = false;
    for (let x in AllQuestions.questions) {
        if (AllQuestions.questions[x].questionId === questionLineObject.questionId) {
            questionLineObject.questionNumber = AllQuestions.questions[x].questionNumber;
            questionLineObject.controlId = AllQuestions.questions[x].controlId;
            const startIndex = x;
            const num_of_items_to_remove = 1;
            AllQuestions.questions.splice(startIndex, num_of_items_to_remove, questionLineObject);
            control = true;
            break;
        }
    }
//    console.log("questionLineObject after");
//    console.log(questionLineObject);

    if (control) {
        localStorage.removeItem("DesignerAllQuestions");
        localStorage.setItem("DesignerAllQuestions", JSON.stringify(AllQuestions));
    }
    else {
        throw new Error(questionLineObject.questionId+': Item cannot be replaced because Item was not found!');
    }
    return questionLineObject;
};

const saveQuestion = () => {
    const _userId = 'userDesignerNameId_1_Sample';
    const _question = document.getElementById("questionGroup_0_inputQuestion").value;
    const _surveyId = document.getElementById("hiddensurveyid").value;
    const _helpText = document.getElementById("helptext_place").innerHTML;
    //    const _controltype = document.getElementById("answertype_place").children[0].tagName;
    const _controltype = identifyControlType();
    const _childControls = fillChildControls();    
    let _currentQuestionNumber = totalQuestions;
    const _controlId = _currentQuestionNumber + "_" + _surveyId + "_" + _controltype;
    let salt = createRandomId();
    let questionLineObject = {};
    if (editable) {
//        alert("perform edit here");
        questionLineObject = {
            userId: _userId,
            question: _question,
            surveyId: _surveyId,
            helpText: _helpText,
            controlType: _controltype,
            childControls: _childControls,
            questionNumber: _currentQuestionNumber,
            questionId: document.getElementById("questionId").value,
            controlId: _controlId
        };
        questionLineObject = replaceToAllQuestionsById(questionLineObject);        
    }
    else {
        ++_currentQuestionNumber; // due to offset
        questionLineObject = {
            userId: _userId,
            question: _question,
            surveyId: _surveyId,
            helpText: _helpText,
            controlType: _controltype,
            childControls: _childControls,
            questionNumber: _currentQuestionNumber,
            questionId: _currentQuestionNumber + '_' + _surveyId + '_' + salt,
            controlId: _controlId
        };
        appendToAllQuestions(questionLineObject);
        ++totalQuestions;
    }    
    return questionLineObject;
};


const getOutlineTableFromLocalStorage = () => {
    const _outlineTable = localStorage.getItem("OutlineTable");
    OutlineTable = [];
    if (_outlineTable !== null || _outlineTable !== "undefined" || _outlineTable !== "") {
        OutlineTable = JSON.parse(_outlineTable);
    }
    else { OutlineTable = []; }

    if (OutlineTable === null) {
        OutlineTable = [];
    }      
    return OutlineTable;
};


const getEditLink = (theQuestion) => {
    let finalString = theQuestion.controlType + " ";
    const postText = theQuestion.surveyId + " " + theQuestion.questionId;
    if (theQuestion.controlType === "longtext_") {
        finalString += "open-LongTextDialog " + postText;
    }
    else if (theQuestion.controlType === "shorttext_") {
        finalString += "open-ShortTextDialog " + postText;
    }
    else if (theQuestion.controlType === "multichoice_") {
        finalString += "open-MultiChoiceDialog " + postText;
    } 
    else if (theQuestion.controlType === "dropdown_") {
        finalString += "open-DropDownDialog " + postText;
    }
    else if (theQuestion.controlType === "yesno_") {
        finalString += "open-YesNoDialog " + postText;
    }
    else if (theQuestion.controlType === "opinionscale_") {
        finalString += "open-OpinionScaleDialog " + postText;
    }
    else if (theQuestion.controlType === "number_") {
        finalString += "open-NumberDialog " + postText;
    }
    else if (theQuestion.controlType === "date_") {
        finalString += "open-DateDialog " + postText;
    }
    else if (theQuestion.controlType === "agree_") {
        finalString += "open-AgreeDialog " + postText;
    }
    else if (theQuestion.controlType === "email_") {
        finalString += "open-EmailDialog " + postText;
    }
    else if (theQuestion.controlType === "file_") {
        finalString += "open-FileDialog " + postText;
    }
    else if (theQuestion.controlType === "matrix_") {
        finalString += "open-MatrixDialog " + postText;
    } 
    else if (theQuestion.controlType === "picture_") {
        finalString += "open-PictureDialog " + postText;
    } 
    else if (theQuestion.controlType === "rating_") {
        finalString += "open-RatingDialog " + postText;
    } 


    return finalString;
};


const removeQuestionFromOutlineTableByEditId = (theQuestion) => {
    let control = false;
    for (let y in OutlineTable) {
        if (OutlineTable[y]["Edit"] === theQuestion["Edit"]) {
            OutlineTable.splice(y, 1, theQuestion);
            control = true;
        }
    }
    if (!control) {
        throw new Error(theQuestion["Edit"] + ": edit id was not found!");
    }
};

    const ControlTypeFriendlyNames = {
        "longtext_": "Long Text",
        "shorttext_": "Short Text",
        "multichoice_": "Multiple Choice",
        "dropdown_": "Drop down",
        "yesno_": "Yes/No Choice",
        "opinionscale_": "Opinion Scale",
        "number_": "Number",
        "date_": "Date",
        "agree_": "Agree / Disagree",
        "email_": "Email",
        "file_": "File",
        "matrix_": "Question Matrix",
        "rating_": "Rating"
    };

const updateOutline = (theQuestion) => {
    let om = OutlineModel;    
    om["Question No."] = theQuestion.questionNumber;
    om["Question text"] = theQuestion.question;
    om["Question Type"] = ControlTypeFriendlyNames[theQuestion.controlType];
    om["Required"] = theQuestion.childControls[0].required ? "Yes":"No";
    om["Edit"] = getEditLink(theQuestion);
    om["Delete"] = "/delete/" + theQuestion.controlId;

    OutlineTable = getOutlineTableFromLocalStorage();
    if (editable) { removeQuestionFromOutlineTableByEditId(om); }
    else { OutlineTable.push(om); }

    /*
    $.ajax({

        url: 'http://localhost/uapi/api/Outline',

        type: 'POST',

        dataType: 'json',

        data: OutlineTable,

        success: function (data, textStatus, xhr) {

            console.log(data);

        },

        error: function (xhr, textStatus, errorThrown) {
            alert("aldkjfldjf"+textStatus);
            alert("a;ldkfj;dlkfdjf"+errorThrown);
            console.log('Error in Operation');

        }

    });
    */



    localStorage.removeItem("OutlineTable");
    localStorage.setItem("OutlineTable", JSON.stringify(OutlineTable));
    $(document).ready(function () {
        $('#columns').columns('destroy');
        var json = OutlineTable;
        $('#columns').columns({
            data: json,
            schema: OutlineSchema
        });

    });
    };


const onSave = () => {
    
    const theQuestion = saveCurrentQuestion();
    GlobalVariables.currentQuestionType = theQuestion.questiontype;
    //console.log("theQuestion");
    //console.log(theQuestion);
    
    //  http://localhost:54145/api/questions/6?userid=1&accountnumber=1
//   updateOutline(theQuestion);

    var dataforsaving = null;
    var surl = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/questions/" : "http://208.92.193.140/uapi/api/questions/";

    $.ajax({
        url: surl,
        data: JSON.stringify(theQuestion),
        dataType: "json",
        type: "POST",
        contentType: 'application/json',
        success: function (data) {    
            if (isEditableQuestion = ((questionId) => { return parseInt(questionId) === 0; })(data)) {
                
                LogicJump.save(GlobalVariables.currentQuestionID);
            }
            else {
                LogicJump.save(data);
            }
            
            GlobalVariables.currentQuestionID = 0;
            window.location.reload(true);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.warn(XMLHttpRequest.status);
            console.warn(errorThrown);
            debugger;
            window.location.reload(true);
        }
    });         

};



function createXHR() {
    
    if (typeof XMLHttpRequest !== "undefined"){
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject !== "undefined"){
        if (typeof arguments.callee.activeXString !== "string"){
            var versions =
                ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
            "MSXML2.XMLHttp"],
            i, len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    throw new Error("something is wrong with xhr:" + ex);
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}


function addURLParam(url, name, value) {
    url += (url.indexOf('?') === -1 ? '?' : '&');
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
}

const createRandomId = (from = 1, to = 99999) => {
    return Math.floor((Math.random() * to) + from);
};

const createNewCampaign = () => { // destructors
    currentCampaignObject = CampaignObject;
    currentCampaignObject.campaignid = 1;
    currentCampaignObject.userid = 1;
    currentCampaignObject.account_number = 1;
    currentCampaignObject.AllSurveys = [];
};

const getCurrentCampaignObject = () => {
    
    currentCampaignObject = JSON.parse(localStorage.getItem("CurrentCampaign"));
    return currentCampaignObject;
};

const createSurvey = () => {
//    let survey = SurveyObject;
    return {
        'surveyid': 6,
        'userid': Object.is(document.getElementById("userId").value, "") ? currentCampaignObject.userid : document.getElementById("userId").value,
        'AllQuestions': []  // which holds an array of QuestionObjects because one Survey has many Questions
    }

};

const createQuestion = (questionId=0) => {
    return {
        //'campaignid': currentCampaignObject.campaignid,
        'campaignid': parseInt(sessionStorage.CampaignID),
        //'account_number': currentCampaignObject.account_number,
        'account_number': parseInt(sessionStorage.AccountNumber),
        'userid': parseInt(sessionStorage.Userid),
        'questionid': (Object.is(parseInt(questionId), 0)) ? 0 : parseInt(questionId),        
        //'surveyid': currentSurveyObject.surveyid,        
        'surveyid': parseInt(sessionStorage.SurveyID),
        'questiontext': document.getElementById("questionGroup_0_inputQuestion").value,        
        'questiontype': identifyControlType(),
        'Questions': fillChildControls()
    };
//    const _childControls = fillChildControls();    

};


//const getSurveyById = (currentSurveyId) => {
//    const numberOfSurveys = currentCampaignObject.AllSurveys.length;
//    for (let y = 0; y < numberOfSurveys; ++y) {
//        if (Object.is(currentCampaignObject.AllSurveys[y].surveyId, currentSurveyId)) {
//            return currentCampaignObject.AllSurveys[y];
//        }
//    }
//    return null;
//};

const appendQuestionToCurrentSurvey = (currentQuestion) => {
    currentSurveyObject.AllQuestions.push(currentQuestion);
};

const getCurrentSurveyObjectFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("CurrentSurvey"));
};

const editQuestionInCurrentSurvey = (currentQuestion) => {
//    currentSurveyObject.AllQuestions.push(currentQuestion);
    console.log("currentSurveyObject.AllQuestions");
    console.log(currentSurveyObject.AllQuestions);
};

const findQuestionFromLocalStorageById = (currentQuestionId) => {    
    if (Object.is(currentSurveyObject, null)
        || Object.is(currentSurveyObject, undefined)
        || Object.is(currentSurveyObject, 'undefined')
    ) {
        throw new Error("There is no survey. Illegal entrance!");
    }
    else {
        console.log(currentSurveyObject);
        alert("currentSurveyObject");
    }
};

const saveCurrentQuestion = () => {
    let currentQuestionId = parseInt(GlobalVariables.currentQuestionID);                                
            currentQuestion = createQuestion(currentQuestionId);
            //console.log(currentQuestion);            
            //currentQuestion['userid'] = 1;            
            hideDesigner();
            return currentQuestion;
};





//const saveCurrentQuestion = () => {
//    if (currentCampaignObject !== null) {
//        let currentSurveyId = document.getElementById("question_no").innerHTML;        
//        if (Object.is(currentSurveyId, "") || Object.is(currentSurveyId, null)) {
//            currentSurveyObject = createSurvey();
//            currentCampaignObject.AllSurveys.push(currentSurveyObject);
//            document.getElementById("hiddensurveyid").value = currentSurveyObject.surveyId;

//            currentQuestion = createQuestion();            
//            appendQuestionToCurrentSurvey(currentQuestion);
//        }
//        else {
//            currentSurveyObject = getSurveyById(currentSurveyId);
//            currentQuestion = createQuestion(1);            
//            appendQuestionToCurrentSurvey(currentQuestion);
//        }
        
//    }
//    else {        
//        currentCampaignObject = getCurrentCampaignObject();
//        if (Object.is(currentCampaignObject, null)) {
//            createNewCampaign();
//            saveCurrentQuestion();
//        }
//    }
//    localStorage.setItem("CurrentSurvey", JSON.stringify(currentSurveyObject));
//    hideDesigner();
//    return JSON.stringify(currentQuestion);
//};
