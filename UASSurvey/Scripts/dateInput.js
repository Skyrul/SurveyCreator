const getInitialPreviewFormat = (() => {
    return document.getElementById("datetextbox_questionGroup_1");
})();


const createLabelSeparatorForDate = (_id, _className, _separatorFormat) => {
    var _labelSeparator = [];
    for (var q = 0; q < 2; ++q) {
        _labelSeparator[q] = document.createElement("label");
        _labelSeparator[q].setAttribute("class", _className);
        _labelSeparator[q].setAttribute("id", _id + "_" + q);
        _labelSeparator[q].innerHTML = _separatorFormat;
    }
    return _labelSeparator;
};



var createNumberElement = (_id, _name, _min, _max, _className, _defaultValue) => {
    var _element = document.createElement("input");
    _element.setAttribute("id", _id);
    _element.setAttribute("name", _id);
    _element.setAttribute("value", _defaultValue);
    _element.setAttribute("type", "number");
    _element.setAttribute("min", _min);
    _element.setAttribute("max", _max);
    _element.setAttribute("class", _className);
    return _element;
};

const doDate = () => {
    document.getElementById("question_date_preview").setAttribute("style", "margin-bottom:40px;display:block;");
};

const reflectChangeToDateInputPreview = (formatSelected) => {    

    const formatter = new Function("func", "return func()");    
    let selectedSeparator = (() => { return document.getElementById('separator_format').value; })();        

    const MMDDYYYY = () => {        
        //$("#question_datepicker").datepicker("destroy");
        var currentDate = $("#question_datepicker").datepicker("getDate");
        $("#question_datepicker").datepicker({
            format: "mm" + selectedSeparator + "dd" + selectedSeparator + "yyyy",
            autoclose: true
        });
//        $("#question_datepicker").datepicker("setDate", "10/12/2012");
    };
    const DDMMYYYY = () => {        
        //$("#question_datepicker").datepicker("destroy");
        var currentDate = $("#question_datepicker").datepicker("getDate");
        $("#question_datepicker").datepicker({
            format: "dd" + selectedSeparator + "mm" + selectedSeparator + "yyyy",
            autoclose: true
        });
//        $("#question_datepicker").datepicker("setDate", "10/12/2012");

    };
    const YYYYMMDD = () => {        
        var currentDate = $("#question_datepicker").datepicker("getDate");
        $("#question_datepicker").datepicker({
            format: "yyyy" + selectedSeparator + "mm" + selectedSeparator + "dd",
            autoclose: true
        });
    };

    const Formatter = {
        "MMDDYYYY": MMDDYYYY,
        "DDMMYYYY": DDMMYYYY,
        "YYYYMMDD": YYYYMMDD
    };


    const FormatExecutor = (() => {
        selectedSeparator = (() => { return document.getElementById('separator_format').value; })();        
        Formatter[formatSelected]();
    })();
};

const changeIt = new Function("format", "funct", "return funct(format);");

const onChangeDateFormat = (obj) => {
    const formatSelected = obj.value;
    changeIt(formatSelected, reflectChangeToDateInputPreview);
};

$(function () {
    $("#question_datepicker").datepicker({
        format: "mm/dd/yyyy",
        defaultDate: +1,
        gotoCurrent: true,
        autoclose: true
    });
});

