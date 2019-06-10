const _AggregateLongtext = function () {

    _idLongtext = 0;
    _detailsLongtext = null;

    _initLongtext = (id, details) => {
        _idLongtext = id;
        _detailsLongtext = details;
    };

    _aggregateLongtext = () => {


    };

    _generateChart = () => {
    };

    return {
        init: _initLongtext,
        fetch: _aggregateLongtext,
        generateChart: _generateChart,
        getValues: ()=> {}
    };
}();