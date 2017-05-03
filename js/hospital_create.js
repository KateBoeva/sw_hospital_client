var hospital = {
    name:"",
    address:""
}, token, status, cityId;

$(document).ready(function() {
    token = getCookie("token");
    status = getCookie("status");
    if(token == null || token == "" || status == "0"){
        window.location.href = "404.html";
    }
    $('.create').click(function(event, ui){
        hospital.name = $('.name').val();
        hospital.address = $('.address').val();
        create();
    });
});

function create() {
    cityId = getCookie("cityId");
    $.ajax({
        method: "POST",
        crossOrigin: true,
        datatype:"json",
        crossDomain: true,
        url: "http://localhost:8080/semestr-1-4.0-SNAPSHOT/health/cities/" + cityId + "/hospitals?token=" + token,
        data: JSON.stringify(hospital),
        contentType:'application/json; charset=utf-8'
    }).done(function(){
        window.location.href = "hospitals.html";
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