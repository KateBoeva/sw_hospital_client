$(document).ready(function() {
    $('#sign_out').click(function(event, ui){
        document.cookie = "cityId=";
        document.cookie = "hospitalId=";
        document.cookie = "doctorId=";
        document.cookie = "token=";
        document.cookie = "status=";
        window.location.href = "cities.html";
    });
});