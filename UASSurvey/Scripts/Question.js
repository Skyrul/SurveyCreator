function Question (questionDetails) {
    this.questionDetails = questionDetails;
    _questionId = 0;
    _Aggregator = null;
    _theType = "";
    _setType = (type) => {
        _theType = type;
    };

    this.aggregateById = function (theId) {        
        //_Aggregator = AggregateType.ontype(type);
        //_Aggregator.init(_questionId, _questionDetails);        
        //_Aggregator.fetch();        
        Statistic.aggregate(questionDetails, theId);        
    };

    _setId = (id) => {
        _questionId = id;
    };

    _setDetails = (details) => {
        _questionDetails = details;
        _setType = details.questiontype;        
    };

    

    //return {
    //    setType: _setType,
    //    aggregate: _aggregate,
    //    setId: _setId,
    //    setDetails: _setDetails
    //};
};

