const COUPON_REGEX = /^[A-Z]{8}$/;

function submitCoupon(){

  var tervalidasi = true;

  if(COUPON_REGEX.test($("#couponInput").val())){
    $("#couponInput").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#couponInput").addClass("is-invalid");
  }

  if(tervalidasi){
    $("#couponButton").hide();
    $("#couponButtonLoc").append(`<div id="couponLoader" class="loader loader-small"></div>`);

    $.ajax({
      method: "POST",
      url: SERVER_URL+"/api/useCoupon",
      headers: {"Authorization": "Bearer " + Cookies.get("token")},
      data: {coupon: $("#couponInput").val()}
    })
    .done(function( msg ) {
      $("#couponButton").show();
      $("#couponLoader").remove();

      if(typeof msg.error != "undefined"){
        $("#couponInput").addClass("is-invalid");
        $("#coupon-feedback").html("Gagal : " + msg.error.text);

      }else{
        $("#couponInput").addClass("is-valid");
        setTimeout(function(){window.location.href = BASE_URL;}, 1000);
      }


    }).fail(function( jqXHR, textStatus ) {
      $("#couponButton").show();
      $("#couponLoader").remove();
      alert( "Kesalahan koneksi atau server: " + textStatus +"/" + jqXHR.statusText );
    });
  }

}

$( document ).ready(function() {
    if(isLoggedIn()){
      /*goto user page*/
    }else{

    }
});
