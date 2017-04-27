$(document).ready(function() {
    var token = getCookie("token");
    var status = getCookie("status");
    if(token == null || token == ""){
        window.location.href = "auth.html";
    }
    var cityId = getCookie("cityId");
    var hospitalId = getCookie("hospitalId");
    var doctorId = getCookie("doctorId");
    var title = getCookie("title");
    $('#high').append(title);
    $.ajax({
        method: "GET",
        crossOrigin: true,
        datatype:"json",
        data: JSON.stringify("edfvdgf"),
        contentType:'application/json; charset=utf-8',
        url: "http://localhost:8080/semestr-1-2.0-SNAPSHOT/timetable/" + doctorId + "/" + token
    }).done(function(timetable){
        $('.timetable').append("<tr>" +
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
    $('#logout').click(function(event, ui){
        document.cookie = "cityId=";
        document.cookie = "hospitalId=";
        document.cookie = "doctorId=";
        document.cookie = "token=";
        document.cookie = "status=";
        window.location.href = "cities.html";
    });
});

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