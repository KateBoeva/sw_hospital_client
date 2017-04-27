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
    document.cookie = "cityId=";
    document.cookie = "hospitalId=";
    document.cookie = "doctorId=";
    $.ajax({
        method: "GET",
        crossOrigin: true,
        datatype:"json",
        url: "http://localhost:8080/semestr-1-2.0-SNAPSHOT/health/cities"
    }).done(function(cities){
        for(var i = 0; i < cities.length; i++){
            $('.cities').append("<tr>" +
                "<td><p class='name' id='" + cities[i].id + "'>"+cities[i].name+"</p></td>" +
                "</tr>");
        }
        $('.name').click(function(event, ui){
            console.log("choose");
            document.cookie = "cityId=" + $(this).attr('id');
            document.cookie = "title=" + $(this).html();
            window.location.href = "hospitals.html";
        });
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

// $.ajax({
//     method: "POST",
//     dataType: 'json',
//     crossDomain: true,
//     url: "http://localhost:8080/1hw-2-1.0-SNAPSHOT/contact",
//     data: JSON.stringify(contact),
//     contentType:'application/json; charset=utf-8'
// }).done(function(){
// }).fail(function(){
//     window.location.href = "contacts.html";
// });