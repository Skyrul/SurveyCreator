const _AggregateRating = function () {

    _idRating = 0;
    _detailsRating = null;
    _valuesRating = {};
    _initRating = (id, details) => {
        _idRating = id;
        _detailsRating = details;
    };
    _selectedItemsRating = new Map();

    _aggregateRating = () => {
        return $.when(Statistic.getNumberOfParts(sessionStorage.SurveyID, _idRating)).done((res) => {
            for (let v = 1; v <= res; ++v) {
                console.log("_detailsRating", _detailsRating['Rating']['AllStatements'][v - 1]['the_statement']);
                debugger;
                Statistic.getAggregate(_idRating, v, '4.5').then((fulfilled) => {
                    _selectedItemsRating.set('4.5', fulfilled);
                        //debugger;
                });
            }
            //debugger;
        });
    };

    _generateChartRating = () => {
    };

    _drawChartRating = () => {

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
        init: _initRating,
        fetch: _aggregateRating,
        generateChart: _generateChartRating,
        getValues: () => { return _valuesRating; },
        drawChart: _drawChartRating
    };
}();