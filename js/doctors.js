var token, status, cityId, hospitalId, title, mDoctors;

$(document).ready(function() {
    checkAuth();
    requestDoctors();
    title = getCookie("title");
    $('#high').append(title);
    document.cookie = "doctorId=";
    search();
});

function search() {
    $('input[type="search"]').keyup(function(){
        var search = $(this).val()
        $(".doctors").find("tr:gt(0)").remove();
        for(var i = 0; i < mDoctors.length; i++){
            if(mDoctors[i].surname.toLowerCase().indexOf(search) != -1 ||
                mDoctors[i].name.toLowerCase().indexOf(search) != -1 ||
                mDoctors[i].patronymic.toLowerCase().indexOf(search) != -1) {
                $('.doctors').append("<tr>" +
                    "<td><p class='name' id='" + mDoctors[i].id + "'>" + mDoctors[i].surname + "</p></td>" +
                    "<td>" + mDoctors[i].name + "</td>" +
                    "<td>" + mDoctors[i].patronymic + "</td>" +
                    "<td>" + mDoctors[i].specialization + "</td>" +
                    "<td>" + mDoctors[i].experience + "</td>" +
                    "<td>" + mDoctors[i].regalies + "</td>" +
                    "<td>" + mDoctors[i].phone + "</td>" +
                    "</tr>");
            }
        }
        $('.name').click(function(event, ui){
            console.log("choose");
            document.cookie = "doctorId=" + $(this).attr('id');
            document.cookie = "title=" + $(this).html();
            window.location.href = "timetable.html";
        });
    });
}

function checkAuth() {
    token = getCookie("token");
    status = getCookie("status");
    if(token == null || token == ""){
        document.getElementById("sign_in").style.display = "";
        document.getElementById("sign_out").style.display = "none";
        document.getElementById("create").style.display = "none";
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

function requestDoctors() {
    cityId = getCookie("cityId");
    hospitalId = getCookie("hospitalId");
    $.ajax({
        method: "GET",
        crossOrigin: true,
        datatype:"json",
        url: "http://localhost:8080/semestr-1-4.0-SNAPSHOT/health/cities/" + cityId + "/hospitals/" + hospitalId + "/doctors"
    }).done(function(doctors){
        mDoctors = doctors;
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