const _AggregateMultistatement = function () {

    _idMultistatement = 0;
    _detailsMultistatement = null;
    _t1 = null;
    _t2 = null;
    _valuesMultistatement = {};
    

    _initMultistatement = (id, details) => {
        _idMultistatement = id;
        _detailsMultistatement = details;
    };

    _aggregateMultistatement = () => {
        return $.when(Statistic.getNumberOfParts(sessionStorage.SurveyID, _idMultistatement)).done((res) => {
            for (let v = 1; v <= res; ++v) {
                _selectedItemsMultistatement = new Map();
                for (let p = 0; p < _detailsMultistatement["MultiStatements"]["AllStatements"][v - 1]["Number_Of_Options"]; ++p) {
                    Statistic.getAggregate(_idMultistatement, v, _detailsMultistatement["MultiStatements"]["AllStatements"][v - 1]["Options"][p]["line"]).then((fulfilled) => {                        
                        _selectedItemsMultistatement.set(_detailsMultistatement["MultiStatements"]["AllStatements"][v - 1]["Options"][p]["line"], fulfilled);
                        //console.log("fulfilled:", fulfilled);
                        //debugger;
                    });
                }
            }            
        });
    };

    _generateChartMultistatement = () => {
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
            title: _detailsMultistatement.questiontext,
            width: 400,
            height: 300
        };

        // Instantiate and draw the chart .
        var chart = new google.visualization.PieChart(document.getElementById('Sarah_chart_div'));
        chart.draw(data, options);
    };

    _drawChartMultistatement = () => {
        // Load Charts and the corechart package.
        //google.charts.load('current', { 'packages': ['corechart'] });
        // Draw the pie chart for Sarah's pizza when Charts is loaded.
        //google.charts.setOnLoadCallback(_generateChartMultistatement);   
        return _generateChartMultistatement;

    };

    return {
        init: _initMultistatement,
        fetch: _aggregateMultistatement,
        generateChart: _generateChartMultistatement,
        getValues: () => { return _valuesMultistatement; },
        drawChart: _drawChartMultistatement
    };
}();