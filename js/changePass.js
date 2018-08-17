const PASS_REGEX = /^.{10,}$/;

function changePass(){

  // Validasi
  var tervalidasi = true;

  // Validasi password
  if(PASS_REGEX.test($("#newPassInput").val())){
    $("#newPassInput").removeClass("is-invalid");
    if($("#newPassInput").val()==$("#konfirmasiInput").val()){
      $("#konfirmasiInput").removeClass("is-invalid");
    }else {
      tervalidasi = false;
      $("#konfirmasiInput").addClass("is-invalid");
    }
  }else {
    tervalidasi = false;
    $("#newPassInput").addClass("is-invalid");
  }

  if(tervalidasi){
    $("#changeButton").hide();
    $("#changeButtonLoc").append(`<div id="changeLoader" class="loader loader-small"></div>`);

    $.ajax({
      method: "POST",
      url: SERVER_URL+"/api/change-password",
      headers: {"Authorization": "Bearer " + Cookies.get("token")},
      data: {old_password: $("#oldPassInput").val(),
             password: $("#newPassInput").val()}
    })
    .done(function( msg ) {
      $("#changeButton").show();
      $("#changeLoader").remove();

      if(typeof msg.error != "undefined"){
        alert("Gagal : " + msg.error.text);

      }else{
        alert("Sukses");
        setTimeout(function(){logout();}, 1000);
      }


    }).fail(function( jqXHR, textStatus ) {
      $("#changeButton").show();
      $("#changeLoader").remove();
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
