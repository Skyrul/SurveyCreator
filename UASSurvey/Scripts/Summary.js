const Summary = function () {

    this.questionIds = [];

    _getQuestions = () => {
        var datafromapi = null;
        const targetPath = "/uapi/api/questions/" + sessionStorage.SurveyID + "?userid=" + sessionStorage.Userid + "&accountnumber=" + sessionStorage.AccountNumber;
        var form_url = Object.is(window.location.hostname, 'localhost') ? "http://localhost" : "http://208.92.193.140";
        form_url += targetPath;
        return $.ajax({
            url: form_url,
            //        data: JSON.stringify(questions),
            dataType: "json",
            type: "GET",
            contentType: 'application/json',
            success: function (data) { datafromapi = data; },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.warn(XMLHttpRequest.status);
                console.warn(errorThrown);
            }
        });
    };

    _setQuestionIds = (questions) => {
        //let all_questions = JSON.parse(questions);
        let all_questions = questions;
        for (let q in all_questions) {
            questionIds.push(parseInt(all_questions[q]["questionid"]));
        }
        //questionIds.sort();        
        console.log(questionIds);
    };

    _getQuestionById = (id) => {
        var qdatafromapi = null;
        var form_url = Object.is(window.location.hostname, 'localhost') ? "../../../uapi/api/questions/" + id : "http://208.92.193.140/uapi/api/questions/" + id;
        return $.ajax({
            url: form_url,
            //        data: JSON.stringify(questions),
            dataType: "json",
            type: "GET",
            contentType: 'application/json',
            success: function (data) { },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.warn(XMLHttpRequest.status);
                console.warn(errorThrown);
            }
        });
    };


    _getQuestionDetailsByIds = () => {
        for (let r = 1; r <= questionIds.length; ++r) {
            $.when(_getQuestionById(questionIds[r - 1])).done((responseText) => {                                
                // for every question get the aggregate
                
                (new Question(responseText)).aggregateById(questionIds[r - 1]);                                
                //google.charts.setOnLoadCallback(drawAnthonyChart);
//                let focusQuestion = responseText;
//                new QuestionType(focusQuestion, (r), this.getNumberOfQuestions()).setElement();
            });
        }
    };

    _init = () => {
        // get the schema
        $.when(_getQuestions()).done((questions) => {
            _setQuestionIds(questions);
            _getQuestionDetailsByIds();            
        });                
        // capture data
        // generate report
        // finalize report

    };


   



    return {
        init: _init
    };
}();

Summary.init();

// Load Charts and the corechart package.
//google.charts.load('current', { 'packages': ['corechart'] });

// Draw the pie chart for Sarah's pizza when Charts is loaded.
//google.charts.setOnLoadCallback(drawSarahChart);

// Draw the pie chart for the Anthony's pizza when Charts is loaded.
//google.charts.setOnLoadCallback(drawBasic);

// Callback that draws the pie chart for Sarah's pizza.
//function drawSarahChart() {

//    // Create the data table for Sarah's pizza.
//    var data = new google.visualization.DataTable();
//    data.addColumn('string', 'Topping');
//    data.addColumn('number', 'Slices');
//    data.addRows([
//        ['Mushrooms', 1],
//        ['Onions', 1],
//        ['Olives', 2],
//        ['Zucchini', 2],
//        ['Pepperoni', 1]
//    ]);

//    // Set options for Sarah's pie chart.
//    var options = {
//        title: 'How Much Pizza Sarah Ate Last Night',
//        width: 400,
//        height: 300
//    };

//    // Instantiate and draw the chart for Sarah's pizza.
//    var chart = new google.visualization.PieChart(document.getElementById('Sarah_chart_div'));
//    chart.draw(data, options);
//}

// Callback that draws the pie chart for Anthony's pizza.
//function drawAnthonyChart() {

//    // Create the data table for Anthony's pizza.
    
//}


//function drawBasic() {

//    var data = google.visualization.arrayToDataTable([
//        ['City', '2010 Population',],
//        ['New York City, NY', 8175000],
//        ['Los Angeles, CA', 3792000],
//        ['Chicago, IL', 2695000],
//        ['Houston, TX', 2099000],
//        ['Philadelphia, PA', 1526000]
//    ]);

//    var options = {
//        title: 'Population of Largest U.S. Cities',
//        chartArea: { width: '50%' },
//        hAxis: {
//            title: 'Total Population',
//            minValue: 0
//        },
//        vAxis: {
//            title: 'City'
//        }
//    };

//    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

//    chart.draw(data, options);
//}

//var data = new google.visualization.DataTable();
//data.addColumn('string', 'Topping');
//data.addColumn('number', 'Slices');
//data.addRows([
//    ['Mushrooms', 2],
//    ['Onions', 2],
//    ['Olives', 2],
//    ['Zucchini', 0],
//    ['Pepperoni', 3]
//]);

//// Set options for Anthony's pie chart.
//var options = {
//    title: 'How Much Pizza Anthony Ate Last Night',
//    width: 400,
//    height: 300
//};

//// Instantiate and draw the chart for Anthony's pizza.
//var chart = new google.visualization.PieChart(document.getElementById('Anthony_chart_div'));
//var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
//var chart = new google.visualization.PieChart(document.getElementById('chart_div1'));
//var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
//chart.draw(data, options);
