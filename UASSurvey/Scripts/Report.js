var ReportQuestions = function () {
	//== Private functions

	// demo initializer
	var datafromapi = null;
	const path = "/uapi/api/questions/" + sessionStorage.SurveyID + "?userid=" + sessionStorage.Userid + "&accountnumber=" + sessionStorage.AccountNumber;
	var form_url = Object.is(window.location.hostname, 'localhost') ? "http://localhost" : "http://208.92.193.140";	
	form_url += path;
	
	var fetchQuestions = () => {
		return $.ajax({
			url: form_url,
			//        data: JSON.stringify(questions),
			dataType: "json",
			type: "GET",
			contentType: 'application/json',
			success: function (data) {
				// datafromapi = data.replace(/[\\]/gi, '');
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.warn(XMLHttpRequest.status);
				console.warn(errorThrown);


			}
		});
	};
	
	var setQuestions = function (res) {
		var dataJSONArray = res;
        GlobalVariables.listOfQuestions = new Map();
        res.forEach((item) => {
            let clonedRow = document.getElementById("question_row_0").cloneNode(true);
            const tableTarget = "report_data_" + item["QuestionNo"];

            clonedRow.setAttribute("id", "question_row_" + item["QuestionNo"]);
            document.getElementById("question_row_0").parentElement.appendChild(clonedRow);            
            clonedRow.setAttribute("style", "display:block;");                        
            clonedRow.children[0].children[0].setAttribute("id", "question_" + item["QuestionNo"]);
            replaceClassNameById("question_" + item["QuestionNo"], "open-question_0_id_", "open-question_" + item["QuestionNo"] + "_id_" + item["questionid"]);
            clonedRow.children[0].children[0].innerHTML = item["QuestionNo"] + ". " + item["questiontext"];
            clonedRow.children[0].children[0].setAttribute("title", item["questiontype"]);

            const cloneReportDataTable = (() => {
                let clonedTable = document.getElementById("report_data_").cloneNode(true);
                clonedTable.setAttribute("id", tableTarget);
                document.getElementById("report_data_").parentElement.appendChild(clonedTable);
            })();

            clonedRow.children[0].children[0].addEventListener("click", () => {
                const hideOtherTables = (() => {
                    for (let x = 1; x <= res.length; ++x) {
                        if (x != item["QuestionNo"]) {
                            document.getElementById("report_data_" + x).setAttribute("style", "display:none;");
                        }                        
                        else {
                            document.getElementById("report_data_" + x).setAttribute("style", "display:block;");
                        }
                    }
                })();
                let agg = new AggregateData(item["questiontype"], item["questionid"]);                                
                agg.display("detailed", tableTarget);
            });
        });
        document.getElementById("survey_name_report").innerHTML = sessionStorage.getItem("currentSurveyName");
	};	

	return {
		//== Public functions
		init: function () {
			try {
				$.when(fetchQuestions()).done((res) => {
                    setQuestions(res); 
				});
				 
			}
			catch (err) {
				throw new Error("Cannot find questions!" + err);
			}			
		}
		
	};
}();

(() => {
    ReportQuestions.init();
})();