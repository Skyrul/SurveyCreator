const logoutSession = () => {
        sessionStorage.clear();
    window.location = Object.is(window.location.hostname, 'localhost') ? "http://localhost/Surveys/Account/Login" : "http://208.92.193.140/Surveys/Account/Login";
};
document.getElementsByClassName("m-topbar__username")[0].innerHTML = sessionStorage.Firstname;
document.getElementById("names").innerHTML = sessionStorage.Firstname + " " + sessionStorage.Lastname;
document.getElementById("email").innerHTML = sessionStorage.Email;

document.getElementById("logout").addEventListener("click", logoutSession);