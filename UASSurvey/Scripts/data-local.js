function getQuestionDetailsById(questionThis, questionNumber) {    
//    let dataIdArray = getDataIdArray(questionThis);
	let id = questionThis;
	GlobalVariables.currentQuestionID = parseInt(id);
	var qdatafromapi = null;    
	var form_url = Object.is(window.location.hostname, 'localhost') ? "../../../uapi/api/questions/" + id : "http://208.92.193.140/uapi/api/questions/" + id;
		
	$.ajax({
		url: form_url,
		//        data: JSON.stringify(questions),
		dataType: "json",
		type: "GET",
		contentType: 'application/json',

		success: function (data) {
			//qdatafromapi = data.replace(/(\\r\\n|\\n|\\r)/gm, '');
			//qdatafromapi = qdatafromapi.replace(/[\\]/gi, '');                        
			let focusQuestion = data;
			GlobalVariables.currentQuestionType = focusQuestion["questiontype"];
			setModalConfiguration(GlobalVariables.currentQuestionType);
			clearAll();
			fillModalView(focusQuestion["questiontype"], focusQuestion, id, questionNumber);
			$("#divoutline").hide();
			$("#divdesigner").show();
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			console.warn(XMLHttpRequest.status);
			console.warn(errorThrown);
		}
	}); 

}

var DatatableDataLocal = function () {
	//== Private functions

	// demo initializer
	var datafromapi = null;
	const path = "/uapi/api/questions/" + sessionStorage.SurveyID + "?userid=" + sessionStorage.Userid + "&accountnumber=" + sessionStorage.AccountNumber;
	var form_url = Object.is(window.location.hostname, 'localhost') ? "http://localhost" : "http://208.92.193.140";	
	form_url += path;
	//var form_url = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/questions/6?userid=1&accountnumber=1000001" : "http://208.92.193.140/uapi/api/questions/6?userid=1&accountnumber=1000001";	
	//var form_url = "http://208.92.193.140/uapi/api/questions/6?userid=1&accountnumber=1";
	//var form_url = "http://localhost/uapi/api/questions/6?userid=1&accountnumber=1";
	
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
	
	var quesstionstable = function (res) {

		//var dataJSONArray = JSON.parse(res);
		var dataJSONArray = res;
		GlobalVariables.listOfQuestions=new Map();
		var datatable = $('.m_datatable').mDatatable({
			// datasource definition
			data: {
				type: 'local',
				source: dataJSONArray,
				pageSize: 10
			},

			// layout definition
			layout: {
				theme: 'default', // datatable theme
				class: '', // custom wrapper class
				scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
				// height: 450, // datatable's body's fixed height
				footer: false // display/hide footer
			},

			// column sorting
			sortable: true,

			pagination: true,

			search: {
				input: $('#generalSearch')
			},

			// columns definition
			columns: [{
				field: "QuestionNo",
				title: "#",
				width: 150,
				sortable: false,
				textAlign: 'center',
			}, {
				field: "questiontype",
				title: "Question Type"
			}, {
				field: "questiontext",
				title: "Question Text",
				responsive: { visible: 'lg' }
			},
			{
				field: "",
				width: 110,
				title: "Actions",
				sortable: false,
				overflow: 'visible',
				template: function (row, index, datatable) {
					var dropup = (datatable.getPageSize() - index) <= 4 ? 'dropup' : '';
					    //console.log("row");
         //               console.log(row);
					    //debugger;
					GlobalVariables.listOfQuestions.set(
						row.questionid,
						row.questiontext
					);

//                    $(document).on("click", "#" + row.questionid + "_" + row.questiontype + "_view", getQuestionDetailsById );
					return '\
						<div class="dropdown ' + dropup + '">\
							<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
								<i class="la la-ellipsis-h"></i>\
							</a>\
							<div class="dropdown-menu dropdown-menu-right">\
								<a onclick="getQuestionDetailsById('+ row.questionid + ',' + row.QuestionNo +')" id="'+ row.questionid + '_' + row.questiontype +'_view" class="dropdown-item" data-id="'+row.questionid+' '+row.questiontype+'"><i class="la la-edit"></i> View</a>\
								<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Delete</a>\
								\
							</div>\
						</div>\
					';
				}
			}
			]
		});
		
		var query = datatable.getDataSourceQuery();

		$('#m_form_status').on('change', function () {
			datatable.search($(this).val(), 'Status');
		}).val(typeof query.Status !== 'undefined' ? query.Status : '');

		$('#m_form_type').on('change', function () {
			datatable.search($(this).val(), 'Type');
		}).val(typeof query.Type !== 'undefined' ? query.Type : '');

		$('#m_form_status, #m_form_type').selectpicker();

	};

	_setLabels = () => {
		document.getElementsByClassName("m-topbar__username")[0].innerHTML = sessionStorage.Firstname;
		document.getElementById("names").innerHTML = sessionStorage.Firstname + " " + sessionStorage.Lastname;
		document.getElementById("email").innerHTML = sessionStorage.Email;

		(sessionStorage.currentSurveyName) ? (() => {
			document.getElementById("survey_name").innerHTML = "Survey Name: "+ sessionStorage.currentSurveyName;
		})() :
			(() => {
				document.getElementById("survey_name").innerHTML = "Survey Name: "+"This survey has no name";
			})();
	};

	return {
		//== Public functions
		init: function () {
			try {
				$.when(fetchQuestions()).done((res) => {
					quesstionstable(res); 
				});
				 
			}
			catch (err) {
				throw new Error("mdata table problem" + err);
			}
			_setLabels();
		},
		setLabels: _setLabels
	};
}();


$(document).ready(function () {
	DatatableDataLocal.init();
});


