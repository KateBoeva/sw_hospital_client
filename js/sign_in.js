var loginInfo = {
    login:"",
    password:""
};

$(document).ready(function() {
    $('.auth').click(function(event, ui){
        console.log("click");
        loginInfo.login = $('.login').val();
        loginInfo.password = $('.password').val();
        auth();
    });
});

function auth() {
    console.log("auth");
    $.ajax({
        method: "POST",
        crossOrigin: true,
        datatype:"json",
        crossDomain: true,
        url: "http://localhost:8080/semestr-1-4.0-SNAPSHOT/auth",
        data: JSON.stringify(loginInfo),
        contentType:'application/json; charset=utf-8'
    }).done(function(tokenObject){
        document.cookie = "token=" + tokenObject.token;
        document.cookie = "status=" + tokenObject.status;
        changePage();
    }).fail(function(){
        alert("Введите корректные данные")
    });
}

function changePage() {
    var cityId = getCookie("cityId");
    var hospitalId = getCookie("hospitalId");
    var doctorId = getCookie("doctorId");
    if((doctorId == null || doctorId == "") && (hospitalId == null || hospitalId == "") && (cityId == null || cityId == "")){
        window.location.href = "cities.html";
    } else if((doctorId == null || doctorId == "") && (hospitalId == null || hospitalId == "")){
        window.location.href = "hospitals.html";
    } else if((doctorId == null || doctorId == "")){
        window.location.href = "doctors.html";
    } else {
        window.location.href = "timetable.html";
    }
}

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset);
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}