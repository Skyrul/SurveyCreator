const _AggregateMultichoice = function () {

    _idMultichoice = 0;
    _detailsMultichoice = null;
    _t1 = null;
    _t2 = null;
    _valuesMultichoice = {};
    _selectedItemsMultichoice = new Map();

    _initMultichoice = (id, details) => {        
        _idMultichoice = id;
        _detailsMultichoice = details;
    };

    _fetchNumberOfPartsMultichoice = () => {        
        const path = "/uapi/api/Answers/GetNumberOfParts/" + sessionStorage.SurveyID + "/" + _idMultichoice;
        var form_url = Object.is(window.location.hostname, 'localhost') ? "http://localhost" : "http://208.92.193.140";
        form_url += path;
        return $.ajax({
            url: form_url,            
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
    };


    _aggregateMultichoice = () => {
        return $.when(_fetchNumberOfPartsMultichoice()).done((res) => {            
            if (_detailsMultichoice["MultiChoice"]["Allow_Other"]) {
                    Statistic.getAggregate(_idMultichoice, res, "Other").then((fulfilled) => {
                        _selectedItemsMultichoice.set("Other", fulfilled);
                        //debugger;
                    });
            }
            for (let v = 1; v <= res; ++v) {
                console.log("_detailsMultichoice", _detailsMultichoice);
                if (_detailsMultichoice["MultiChoice"]["Choices"][v - 1]) {
                    Statistic.getAggregate(_idMultichoice, v, _detailsMultichoice["MultiChoice"]["Choices"][v - 1]["Choice_Input_Text"]).then((fulfilled) => {                        
                        _selectedItemsMultichoice.set(_detailsMultichoice["MultiChoice"]["Choices"][v - 1]["Choice_Input_Text"], fulfilled);
                        //debugger;
                    });
                }
            }
            //debugger;
        });
    };

    _generateChartMultichoice = () => {
        // Create the data table .
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Choice');
        data.addColumn('number', 'Number of People');
        data.addRows([
            ['No', _t1[0]],
            ['Yes', _t2[0]]
        ]);

        // Set options for pie chart.
        var options = {
            title: _detailsMultichoice.questiontext,
            width: 400,
            height: 300
        };

        // Instantiate and draw the chart .
        var chart = new google.visualization.PieChart(document.getElementById('Sarah_chart_div'));
        chart.draw(data, options);
    };

    _drawChartMultichoice = () => {
        // Load Charts and the corechart package.
        //google.charts.load('current', { 'packages': ['corechart'] });
        // Draw the pie chart for Sarah's pizza when Charts is loaded.
        //google.charts.setOnLoadCallback(_generateChartMultichoice);   
        return _generateChartMultichoice;

    };

    return {
        init: _initMultichoice,
        fetch: _aggregateMultichoice,
        generateChart: _generateChartMultichoice,
        getValues: () => { return _valuesMultichoice; },
        drawChart: _drawChartMultichoice
    };
}();