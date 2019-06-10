const _AggregateYesno = function () {  

    _idYesNo = 0;
    _detailsYesNo = null;
    _t1YesNo = null;
    _t2YesNo = null;
    _valuesYesno = {};

    _initYesNo = (id, details) => {        
        _idYesNo = id;
        _detailsYesNo = details;
    };

    _aggregateYesno = () => {
        return $.when(Statistic.getAggregate(_idYesNo, 1, "No"), Statistic.getAggregate(_idYesNo, 1, "Yes")).done((one, two) => {
            _t1YesNo = one;
            _t2YesNo = two;                
            _valuesYesno = { "No": _t1YesNo, "Yes": _t2YesNo };            
        });
    };

    _generateChartYesno = () => {

    };

    _drawChartYesno = () => {        
        // Load Charts and the corechart package.
        //google.charts.load('current', { 'packages': ['corechart'] });
        // Draw the pie chart for Sarah's pizza when Charts is loaded.
        const theChart = () => {
            // Create the data table .
            var data = new google.visualization.DataTable();            
            data.addColumn('string', 'Choice');
            data.addColumn('number', 'Number of People');
            data.addRows([
                ['No', _t1YesNo[0]],
                ['Yes', _t2YesNo[0]]
            ]);

            // Set options for pie chart.
            var options = {
                title: _detailsYesNo.questiontext,
                width: 400,
                height: 300
            };

            // Instantiate and draw the chart .
            var chart = new google.visualization.PieChart(document.getElementById('Sarah_chart_div'));
            chart.draw(data, options);
        };
        google.charts.setOnLoadCallback(theChart);        

    };
        _drawChartYesno1 = () => {            
            // Load Charts and the corechart package.
            //google.charts.load('current', { 'packages': ['corechart'] });
            // Draw the pie chart for Sarah's pizza when Charts is loaded.
            const theChart = () => {
                // Create the data table .
                var data1 = new google.visualization.DataTable();
                data1.addColumn('string', 'Choice');
                data1.addColumn('number', 'Number of People');
                data1.addRows([
                    ['No', _t1YesNo[0]],
                    ['Yes', _t2YesNo[0]]
                ]);

                // Set options for pie chart.
                var options = {
                    title:  "Test 2nd div",     // _detailsYesNo.questiontext,
                    width: 400,
                    height: 300
                };

                // Instantiate and draw the chart .
                // var chart = new google.visualization.PieChart(document.getElementById('Sarah_chart_div'));
                //var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                var chart = new google.visualization.PieChart(document.getElementById('chart_div1'));
                //var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
                chart.draw(data1, options);
            };
            google.charts.setOnLoadCallback(theChart);                       
        }
    

    return {
        init: _initYesNo,
        fetch: _aggregateYesno,
        generateChart: _generateChartYesno,
        getValues: () => { return _valuesYesno; },
        drawChart: _drawChartYesno,
        drawChart1: _drawChartYesno1
    };
}();

