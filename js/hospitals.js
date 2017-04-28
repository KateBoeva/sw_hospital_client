var token, status, cityId, title;

$(document).ready(function() {
    checkAuth();
    requestHospitals();
    title = getCookie("title");
    $('#high').append(title);
    document.cookie = "hospitalId=";
    document.cookie = "doctorId=";
});

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

function requestHospitals() {
    cityId = getCookie("cityId");
    $.ajax({
        method: "GET",
        crossOrigin: true,
        datatype:"json",
        url: "http://localhost:8080/semestr-1-3.0-SNAPSHOT/health/cities/" + cityId + "/hospitals"
    }).done(function(hospitals){
        for(var i = 0; i < hospitals.length; i++){
            $('.hospitals').append("<tr>" +
                "<td><p class='name' id='" + hospitals[i].id + "'>"+hospitals[i].name+"</p></td>" +
                "<td>"+hospitals[i].address+"</td>" +
                "</tr>");
        }
        $('.name').click(function(event, ui){
            console.log("choose");
            document.cookie = "hospitalId=" + $(this).attr('id');
            document.cookie = "title=" + $(this).html();
            window.location.href = "doctors.html";
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