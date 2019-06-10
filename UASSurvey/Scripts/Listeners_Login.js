const Listeners_Login = function () {
    _formCheck = () => {
        return Object.is(document.getElementById("username").value, "") || Object.is(document.getElementById("password").value, "") ? false : true;
    };

    _getUserInfo = () => {        
        if (_formCheck()) {
            document.getElementById("correct_message").setAttribute("style", "display:none;");
            const _rawData = {
                "Username": document.getElementById("username").value,
                "Password": document.getElementById("password").value
            };
            const _targetUrlPost = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/Account/" : "http://208.92.193.140/uapi/api/Account/";
            return $.ajax({
                url: _targetUrlPost,
                data: JSON.stringify(_rawData),
                dataType: "json",
                type: "POST",
                contentType: 'application/json',
                success: function (data) {
                    //alert("success: user response saved");                
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //console.warn(XMLHttpRequest.status);
                    //console.warn(errorThrown);
                    //debugger;
                    //window.location.reload(true);
                }
            });
        }      
        return Promise.reject(new Error("Missing info"));
    };

    _setUserSession = () => {
        const userInfo = _getUserInfo();        
        userInfo.then((data) => {            
            if (Object.is(data.length, 0)) { document.getElementById("correct_message").setAttribute("style", "display:block;"); }
            else {
                document.getElementById("correct_message").setAttribute("style", "display:none;");
                if (!Object.is(typeof (Storage), "undefined")) {
                    sessionStorage.Userid = data[0].Userid;
                    sessionStorage.Firstname = data[0].Firstname;
                    sessionStorage.Lastname = data[0].Lastname;
                    sessionStorage.Email = data[0].Email;
                    sessionStorage.CellPhone = data[0].CellPhone;
                    sessionStorage.AccountNumber = data[0].AccountNumber;
                    sessionStorage.Status = data[0].Status;
                    sessionStorage.Role = data[0].Role;
                    window.location = Object.is(window.location.hostname, 'localhost') ? "http://localhost/Surveys/SurveyList/SurveyList" : "http://208.92.193.140/Surveys/SurveyList/SurveyList";
                }
                else { /*sessionStorage.unsupported*/ }            
            }    
            return;
        }, (err) => {
            document.getElementById("correct_message").setAttribute("style", "display:block;");
            });
        return;
    };

    _isEnterKeydown = (event) => {
        if (Object.is(event.keyCode, 13)) {            
            document.getElementById("sign_in").click();
        }        
    };

    _postNewUser = () => {
        //if (_formCheck()) {
            document.getElementById("correct_message").setAttribute("style", "display:none;");
            const _rawData = {
                "Firstname": document.getElementById("Firstname").value,
                "Lastname": document.getElementById("Lastname").value,
                "Email": document.getElementById("Email").value,
                "CellPhone": document.getElementById("CellPhone").value,
                "BusinessPhone": document.getElementById("BusinessPhone").value,
                "Address": document.getElementById("Address").value,
                "City": document.getElementById("City").value,
                "ProvinceState": document.getElementById("ProvinceState").value,
                "PostalCode": document.getElementById("PostalCode").value,
                "Country": document.getElementById("Country").value,
                "Username": document.getElementById("Username").value,
                "Password": document.getElementById("Password").value,
                "AccountNumber": sessionStorage.AccountNumber ? sessionStorage.AccountNumber : 10003,
                "Status": sessionStorage.Status,
                "Role": sessionStorage.Role
            };
            const _targetUrlPost = Object.is(window.location.hostname, 'localhost') ? "http://localhost/uapi/api/Account/CreateNewUser/" : "http://208.92.193.140/uapi/api/Account/CreateNewUser/";
            return $.ajax({
                url: _targetUrlPost,
                data: JSON.stringify(_rawData),
                dataType: "json",
                type: "POST",
                contentType: 'application/json',
                success: function (data) {
                    alert("success: user response saved, data:"+data);                
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //console.warn(XMLHttpRequest.status);
                    //console.warn(errorThrown);
                    //debugger;
                    //window.location.reload(true);
                }
            });
        //}
        //return Promise.reject(new Error("Missing info"));
    };


    _createUser = () => {
        $.when(_postNewUser()).done((result) => {
            if (result === "true") {
                window.location = Object.is(window.location.hostname, 'localhost') ? "http://localhost/Surveys/Account/Login1" : "http://208.92.193.140/Surveys/Account/Login1";
            }
            else {
                alert("login failed");
            }

        });
    };

    _init = () => {
        (document.getElementById("sign_in")) ? (() => {
            document.getElementById("sign_in").addEventListener("click", _setUserSession);
            document.getElementById("password").addEventListener("keydown", (event) => _isEnterKeydown(event));
            document.getElementById("username").addEventListener("keydown", (event) => _isEnterKeydown(event));
            if (document.getElementById("register-submit-btn")) {
                document.getElementById("register-submit-btn").addEventListener("click", _createUser);
            }
        })() : (() => { })();             
    };

    return {
        init: _init
    };
}();

        Listeners_Login.init();
