var loginInfo = {
    login:"",
    password:""
};

$(document).ready(function() {
    $('.register').click(function(event, ui){
        loginInfo.login = $('.login').val();
        loginInfo.password = $('.password').val();
        register();
    });
});

function register() {
    $.ajax({
        method: "POST",
        crossOrigin: true,
        datatype:"json",
        crossDomain: true,
        url: "http://localhost:8080/semestr-1-3.0-SNAPSHOT/register",
        data: JSON.stringify(loginInfo),
        contentType:'application/json; charset=utf-8'
    }).done(function(tokenObject){
        window.location.href = "sign_in.html";
    }).fail(function(){
        alert("Логин уже занят")
    });
}