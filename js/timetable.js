$(document).ready(function() {
    var cityId = getCookie("cityId");
    var hospitalId = getCookie("hospitalId");
    var doctorId = getCookie("doctorId");
    var title = getCookie("title");
    $('.high').append(title);
    $.ajax({
        method: "GET",
        crossOrigin: true,
        datatype:"json",
        url: "http://localhost:8080/semestr-1-1.0-SNAPSHOT/health/cities/" + cityId + "/hospitals/" + hospitalId + "/doctors/" + doctorId + "/timetable"
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