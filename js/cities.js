$(document).ready(function() {
    $.ajax({
        method: "GET",
        crossOrigin: true,
        datatype:"json",
        url: "http://localhost:8080/semestr-1-1.0-SNAPSHOT/health/cities"
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
});