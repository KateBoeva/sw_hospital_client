$(document).ready(function() {
    var token = getCookie("token");
    var status = getCookie("status");
    if(token == null || token == ""){
        document.getElementById("create").style.display = "none";
        document.getElementById("logout").style.display = "none";
        document.getElementById("auth").style.display = "";
    } else if(status == "1"){
        document.getElementById("auth").style.display = "none";
        document.getElementById("logout").style.display = "";
        document.getElementById("create").style.display = "";
    } else {
        document.getElementById("auth").style.display = "none";
        document.getElementById("logout").style.display = "";
        document.getElementById("create").style.display = "none";
    }
    var cityId = getCookie("cityId");
    var hospitalId = getCookie("hospitalId");
    var title = getCookie("title");
    $('#high').append(title);
    $.ajax({
        method: "GET",
        crossOrigin: true,
        datatype:"json",
        url: "http://localhost:8080/semestr-1-2.0-SNAPSHOT/health/cities/" + cityId + "/hospitals/" + hospitalId + "/doctors"
    }).done(function(doctors){
        for(var i = 0; i < doctors.length; i++){
            $('.doctors').append("<tr>" +
                "<td><p class='name' id='" + doctors[i].id + "'>"+doctors[i].surname+"</p></td>" +
                "<td>"+doctors[i].name+"</td>" +
                "<td>"+doctors[i].patronymic+"</td>" +
                "<td>"+doctors[i].specialization+"</td>" +
                "<td>"+doctors[i].experience+"</td>" +
                "<td>"+doctors[i].regalies+"</td>" +
                "<td>"+doctors[i].phone+"</td>" +
                "</tr>");
        }
        $('.name').click(function(event, ui){
            console.log("choose");
            document.cookie = "doctorId=" + $(this).attr('id');
            document.cookie = "title=" + $(this).html();
            window.location.href = "timetable.html";
        });
    }).fail(function(){
        console.log("no");
    });
    $('.logout').click(function(event, ui){
        console.log("choose");
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