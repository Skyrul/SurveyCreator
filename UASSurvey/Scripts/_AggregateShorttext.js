const _AggregateShorttext = function () {
    _idShorttext = 0;
    _detailsShorttext = null;

    _initShorttext = (id, details) => {
        _idShorttext = id;
        _detailsShorttext = details;
    };

    _aggregateShorttext = () => {


    };

    _generateChart = () => {
    };

    return {
        init: _initShorttext,
        fetch: _aggregateShorttext,
        generateChart: _generateChart,
        getValues: ()=> {}
    };
}();