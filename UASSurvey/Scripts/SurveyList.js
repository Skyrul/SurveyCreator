

function getSurveyById(surveyId, campaignId, surveyName) {
	
	sessionStorage.SurveyID = surveyId;
	sessionStorage.CampaignID = campaignId;
	sessionStorage.currentSurveyName = surveyName;
	window.location = Object.is(window.location.hostname, 'localhost') ? "http://localhost/Surveys/Design/Design" : "http://208.92.193.140/Surveys/Design/Design";
}

const goToReportById = (surveyId, campaignId, surveyName) => {
    sessionStorage.SurveyID = surveyId;
    sessionStorage.CampaignID = campaignId;
    sessionStorage.currentSurveyName = surveyName;
    window.location = Object.is(window.location.hostname, 'localhost') ? "http://localhost/Surveys/Reports/Index" : "http://208.92.193.140/Surveys/Reports/Index";
};

const getParametersFromSession = () => {
	return [sessionStorage.Userid, sessionStorage.AccountNumber, 1];
};

const SurveyList = function () {
	//== Private functions
	var datafromapi = null;
	const [userId, accountNum, campaignId] = getParametersFromSession();

	var form_url = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/Survey/GetSurveysForUser/" + userId + "/" + accountNum + "/" + campaignId : "http://208.92.193.140/uapi/api/Survey/GetSurveysForUser/" + userId + "/" + accountNum + "/" + campaignId;
	//var form_url = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/questions/6?userid=1&accountnumber=1" : "http://208.92.193.140/uapi/api/questions/6?userid=1&accountnumber=1";

	var getSurveyList = () => {
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

		var dataJSONArray = res;
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
			columns: [
				{
					field: "SurveyName",
					title: "Survey Name",
					responsive: { visible: 'lg' }
				},
			{
				field: "SurveyType",
				title: "Survey Type"
			},
			{
				field: "CreateDate",
				title: "Date Created"
			},
			{
				field: "CreatedBy",
				title: "Created By"
			},
			{
				field: "Status",
				title: "Status",
				width: 150,
				sortable: false,
				textAlign: 'center',
			}, 
			{
				field: "",
				width: 110,
				title: "Actions",
				sortable: false,
				overflow: 'visible',
				template: function (row, index, datatable) {
					var dropup = (datatable.getPageSize() - index) <= 4 ? 'dropup' : '';
					//console.log("index");
					//console.log(index);
					//console.log("row");
					//console.log(row);
					//debugger;
					//                    $(document).on("click", "#" + row.SurveyID + "_" + row.SurveyType + "_view", getSurveyById );
					const status = {
						"Completed": '\
						<div class="dropdown ' + dropup + '">\
							<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
								<i class="la la-ellipsis-h"></i>\
							</a>\
							<div class="dropdown-menu dropdown-menu-right">\
								<a onclick="getSurveyById('+ row.SurveyID + ', ' + row.CampaignID + ', \'' + row.SurveyName + '\')" id="' + row.SurveyID + '_' + row.SurveyType + '_view" class="dropdown-item" data-id="' + row.SurveyID + ' ' + row.SurveyType + '"><i class="la la-edit"></i> View</a>\
								<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Reports</a>\
								\
							</div>\
						</div>\
					',
                        "New": '\
						<div class="dropdown ' + dropup + '">\
							<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
								<i class="la la-ellipsis-h"></i>\
							</a>\
							<div class="dropdown-menu dropdown-menu-right">\
								<a onclick="getSurveyById('+ row.SurveyID + ', ' + row.CampaignID + ', \'' + row.SurveyName + '\')" id="' + row.SurveyID + '_' + row.SurveyType + '_view" class="dropdown-item" data-id="' + row.SurveyID + ' ' + row.SurveyType + '"><i class="la la-edit"></i> View</a>\
                        <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Publish</a>\
								<a class="dropdown-item" href="#"><i class="la la-edit"></i> Delete</a>\
								\
							</div>\
						</div>\
					',
                        "Partially Completed": '\
						<div class="dropdown ' + dropup + '">\
							<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
								<i class="la la-ellipsis-h"></i>\
							</a>\
							<div class="dropdown-menu dropdown-menu-right">\
								<a onclick="getSurveyById('+ row.SurveyID + ', ' + row.CampaignID + ', \'' + row.SurveyName + '\')" id="' + row.SurveyID + '_' + row.SurveyType + '_view" class="dropdown-item" data-id="' + row.SurveyID + ' ' + row.SurveyType + '"><i class="la la-edit"></i> View</a>\
                        <a onclick="goToReportById('+ row.SurveyID + ', ' + row.CampaignID + ', \'' + row.SurveyName + '\')" class="dropdown-item" href="#"><i class="la la-leaf"></i> Report</a>\
							</div>\
						</div>\
					',
						
					};

					return status[row.Status];

					//return '\
					//	<div class="dropdown ' + dropup + '">\
					//		<a href="#" class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown">\
					//			<i class="la la-ellipsis-h"></i>\
					//		</a>\
					//		<div class="dropdown-menu dropdown-menu-right">\
					//			<a onclick="getSurveyById('+ row.SurveyID + ', ' + row.CampaignID + ', \'' + row.SurveyName + '\')" id="' + row.SurveyID + '_' + row.SurveyType + '_view" class="dropdown-item" data-id="' + row.SurveyID + ' ' + row.SurveyType + '"><i class="la la-edit"></i> View</a>\
					//			<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Publish</a>\
					//			<a class="dropdown-item" href="#"><i class="la la-leaf"></i> Reports</a>\
					//			<a class="dropdown-item" href="#"><i class="la la-edit"></i> Delete</a>\
					//			\
					//		</div>\
					//	</div>\
					//';
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

	};

	return {
		//== Public functions
		init: function () {
			try {
				$.when(getSurveyList()).done((res) => {
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
	SurveyList.init();
});


