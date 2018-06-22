const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function submitReset(){
  console.log("a");
  console.log($("#resetEmail").val());

  var tervalidasi = true;

  if(EMAIL_REGEX.test($("#resetEmail").val().toLowerCase())){
    $("#email-feedback").html("Email tidak valid");
    $("#resetEmail").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#resetEmail").addClass("is-invalid");
  }

  if(tervalidasi){
    $("#resetButton").hide();
    $("#resetButtonLoc").append(`<div id="resetLoader" class="loader loader-small"></div>`);

    $.ajax({
      method: "POST",
      url: SERVER_URL+"/api/reset",
      data: {email: $("#resetEmail").val()}
    })
    .done(function( msg ) {
      setTimeout(function(){window.location.href = BASE_URL;}, 1000);
      console.log("sukses kirim");
      console.log(msg);



    }).fail(function( jqXHR, textStatus ) {
      $("#resetButton").show();
      $("#resetLoader").remove();
      alert( "Reset failed: " + textStatus );
    });
  }

}

$( document ).ready(function() {
    if(isLoggedIn()){
      /*goto user page*/
    }else{

    }
});
