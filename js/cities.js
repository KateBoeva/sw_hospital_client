var mCities, token, status;

$(document).ready(function() {
    checkAuth();
    requestCities();
    document.cookie = "cityId=";
    document.cookie = "hospitalId=";
    document.cookie = "doctorId=";
    search();
});

function search() {
    $('input[type="search"]').keyup(function(){
        var search = $(this).val();
        fillData(search);
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

function requestCities() {
    $.ajax({
        method: "GET",
        crossOrigin: true,
        datatype:"json",
        url: "http://localhost:8080/semestr-1-4.0-SNAPSHOT/health/cities"
    }).done(function(cities){
        mCities = cities;
        fillData("");
    }).fail(function(){
        console.log("no");
    });
}

function deleteCity(cityId) {
    $.ajax({
        method: "DELETE",
        crossOrigin: true,
        datatype:"json",
        url: "http://localhost:8080/semestr-1-4.0-SNAPSHOT/health/cities/" + cityId + "?token=" + token,
        contentType:'application/json; charset=utf-8'
    }).done(function(cities){
        mCities = cities;
        fillData("");
    }).fail(function(){
        console.log("no");
    });
}

function fillData(search) {
    $(".cities").find("tr:gt(0)").remove();
    for(var i = 0; i < mCities.length; i++){
        if(mCities[i].name.toLowerCase().indexOf(search) != -1) {
            $('.cities').append("<tr>" +
                "<td><p class='name' id='" + mCities[i].id + "'>" + mCities[i].name + "</p></td>" +
                "<td><p class='delete' id='0" + mCities[i].id + "'>x</p></td>" +
                "</tr>");
        }
    }
    $('.name').click(function(event, ui){
        console.log("choose");
        document.cookie = "cityId=" + $(this).attr('id');
        document.cookie = "title=" + $(this).html();
        window.location.href = "hospitals.html";
    });
    $('.delete').click(function(event, ui){
        var id = $(this).attr('id');
        console.log("delete " + id[1]);
        deleteCity(id.substring(1));
    });
    if(status == null || status != 1){
        document.getElementsByClassName("delete").style.display = "none";
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
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}