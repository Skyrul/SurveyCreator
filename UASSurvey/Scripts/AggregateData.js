class AggregateData {

    constructor(questionType, questionId) {
        this.questionType = questionType;
        this.questionId = questionId;        
        this.path = "/uapi/api/Answers/GetAllUsersAnswersByQuestionIdAndSurveyId/" + sessionStorage.SurveyID + "/" + this.questionId;
        this.form_url = Object.is(window.location.hostname, 'localhost') ? "http://localhost" : "http://208.92.193.140";
        this.form_url += this.path;
    }

    fetchData() {                
        return $.ajax({
            url: this.form_url,
            //        data: JSON.stringify(questions),
            dataType: "json",
            type: "GET",
            contentType: 'application/json',
            success: function (data) {                
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.warn(XMLHttpRequest.status);
                console.warn(errorThrown);


            }
        });
    }

    pushToTable(res, table_target) {

    //var dataJSONArray = JSON.parse(res);
        var dataJSONArray = res;        
    GlobalVariables.listOfQuestions = new Map();
    var datatable = $('#'+table_target).mDatatable({
        // datasource definition
        data: {
            type: 'local',
            source: dataJSONArray,
            pageSize: 10
        },

        // layout definition
        layout: {
            theme: 'default', // datatable theme
            class: '', // custom wrapper class
            scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
            // height: 450, // datatable's body's fixed height
            footer: false // display/hide footer
        },

        // column sorting
        sortable: true,

        pagination: true,

        search: {
            input: $('#generalSearch')
        },

        // columns definition
        columns: [{
            field: "ContactID",
            title: "Contact ID",
            width: 150,
            sortable: true,
            textAlign: 'center',
        }, {
            field: "Answer",
            title: "Answer",
            responsive: { visible: 'lg' }
        },
        ]
    });

    
    var query = datatable.getDataSourceQuery();
    //datatable.reload(true);
    
    //console.log(Object.getOwnPropertyNames(datatable));
    //debugger;
    //$('#m_form_status').on('change', function () {
    //    datatable.search($(this).val(), 'Status');
    //}).val(typeof query.Status !== 'undefined' ? query.Status : '');

    //$('#m_form_type').on('change', function () {
    //    datatable.search($(this).val(), 'Type');
    //}).val(typeof query.Type !== 'undefined' ? query.Type : '');

    //$('#m_form_status, #m_form_type').selectpicker();

};

    printTest() {
        console.log(this.questionType);
    }

    display(typeDisplay, tableTarget) {
        try {
            $.when(this.fetchData()).done((res) => {
                this.pushToTable(res, tableTarget);
                document.getElementById(tableTarget).setAttribute("style", "display:block;");
            });

        }
        catch (err) {
            throw new Error("Report table problem" + err);
        }
        
    }
};