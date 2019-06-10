const _AggregateAgree = function () {    

    _idAgree = 0;
    _detailsAgree = null;
    _valuesAgree = {};
    _initAgree = (id, details) => {
        _idAgree = id;
        _detailsAgree = details;
    };

    _aggregateAgree = () => {
        return $.when(Statistic.getAggregate(_idAgree, 1, "I Agree"), Statistic.getAggregate(_idAgree, 1, "I Disagree")).done((one, two) => {
            
            _valuesAgree = { "I Agree": one, "I Disagree": two };
            debugger;
        });
    };

    _generateChartAgree = () => {
    };

    _drawChartAgree = () => {

        const theChart = () => {
            var data = google.visualization.arrayToDataTable([
                ['City', '2010 Population',],
                ['New York City, NY', 8175000],
                ['Los Angeles, CA', 3792000],
                ['Chicago, IL', 2695000],
                ['Houston, TX', 2099000],
                ['Philadelphia, PA', 1526000]
            ]);

            var options = {
                title: 'Population of Largest U.S. Cities',
                chartArea: { width: '50%' },
                hAxis: {
                    title: 'Total Population',
                    minValue: 0
                },
                vAxis: {
                    title: 'City'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        };
        google.charts.setOnLoadCallback(theChart);        
    };

    return {
        init: _initAgree,
        fetch: _aggregateAgree,
        generateChart: _generateChartAgree,
        getValues: () => { return _valuesAgree; },
        drawChart: _drawChartAgree
    };
}();