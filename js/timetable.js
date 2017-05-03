var token, status, cityId, hospitalId, doctorId, title;

$(document).ready(function() {
    checkAuth();
    requestTimetable();
    title = getCookie("title");
    $('#high').append(title);
});

function checkAuth() {
    token = getCookie("token");
    status = getCookie("status");
    if(token == null || token == ""){
        window.location.href = "sign_in.html";
    } else if(status == "1"){
        document.getElementById("sign_in").style.display = "none";
        document.getElementById("sign_out").style.display = "";
        document.getElementById("create").style.display = "";
    } else {
        document.getElementById("sign_in").style.display = "none";
        document.getElementById("sign_out").style.display = "";
        document.getElementById("create").style.display = "none";
    }
}

function requestTimetable() {
    cityId = getCookie("cityId");
    hospitalId = getCookie("hospitalId");
    doctorId = getCookie("doctorId");
    $.ajax({
        method: "GET",
        crossOrigin: true,
        datatype:"json",
        data: JSON.stringify(token),
        contentType:'application/json; charset=utf-8',
        url: "http://localhost:8080/semestr-1-4.0-SNAPSHOT/health/cities/" + cityId + "/hospitals/" + hospitalId + "/doctors/" + doctorId + "/timetable?token=" + token
    }).done(function(timetable){
        $('.timetable').append("<tr class='content'>" +
            "<td>"+timetable.monday+"</td>" +
            "<td>"+timetable.tuesday+"</td>" +
            "<td>"+timetable.wednesday+"</td>" +
            "<td>"+timetable.thursday+"</td>" +
            "<td>"+timetable.friday+"</td>" +
            "<td>"+timetable.saturday+"</td>" +
            "<td>"+timetable.sunday+"</td>" +
            "</tr>");
    }).fail(function(){
        console.log("no");
    });
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
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}