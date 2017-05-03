var timetable = {
    id:"",
    id_doctor:"",
    monday:"",
    tuesday:"",
    wednesday:"",
    thursday:"",
    friday:"",
    saturday:"",
    sunday:""
}, token, status, cityId, hospitalId, doctorId;

$(document).ready(function() {
    token = getCookie("token");
    status = getCookie("status");
    if(token == null || token == "" || status == "0"){
        window.location.href = "404.html";
    }
    cityId = getCookie("cityId");
    hospitalId = getCookie("hospitalId");
    doctorId = getCookie("doctorId");
    getTimetable();
    $('.change').click(function(event, ui){
        timetable.monday = $('.monday').val();
        timetable.tuesday = $('.tuesday').val();
        timetable.wednesday = $('.wednesday').val();
        timetable.thursday = $('.thursday').val();
        timetable.friday = $('.friday').val();
        timetable.saturday = $('.saturday').val();
        timetable.sunday = $('.sunday').val();
        change();
    });
});

function getTimetable(){
    $.ajax({
        method: "GET",
        crossOrigin: true,
        datatype:"json",
        data: JSON.stringify(token),
        contentType:'application/json; charset=utf-8',
        url: "http://localhost:8080/semestr-1-4.0-SNAPSHOT/health/cities/" + cityId + "/hospitals/" + hospitalId + "/doctors/" + doctorId + "/timetable?token=" + token
    }).done(function(timetable){
        $('.monday').val(timetable.monday);
        $('.tuesday').val(timetable.tuesday);
        $('.wednesday').val(timetable.wednesday);
        $('.thursday').val(timetable.thursday);
        $('.friday').val(timetable.friday);
        $('.saturday').val(timetable.saturday);
        $('.sunday').val(timetable.sunday);
    }).fail(function(){
        console.log("no");
    });
}

function change() {
    $.ajax({
        method: "POST",
        crossOrigin: true,
        datatype:"json",
        crossDomain: true,
        url: "http://localhost:8080/semestr-1-4.0-SNAPSHOT/health/cities/" + cityId + "/hospitals/" + hospitalId + "/doctors/" + doctorId + "/timetable?token=" + token,
        data: JSON.stringify(timetable),
        contentType:'application/json; charset=utf-8'
    }).done(function(){
        window.location.href = "timetable.html";
    }).fail(function(){
        alert("Введите корректные данные");
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
            end = cookie.indexOf(";", offset);
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}