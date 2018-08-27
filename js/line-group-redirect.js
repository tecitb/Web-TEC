var isLoggingIn = false;
function verifyCreds() {
  if(!isLoggingIn) {
      isLoggingIn = true;
      console.log("loggingin");
      $("#signinButton").hide();
      $("#signinLoader").show();
      $.ajax({
          method: "POST",
          url: SERVER_URL + "/api/login",
          data: {email: $("#email").val(), password: $("#password").val()}
      }).done(function (msg) {
        isLoggingIn = false;
          console.log("done E= " + msg.message);
          if (typeof msg.error !== "undefined") {
              console.log("Error");
              $("#signinButton").show();
              $("#signinLoader").hide();
              $("#password").addClass("is-invalid");
              $("#email").addClass("is-invalid");

          } else {
              getLinkAndRedirect(msg.token);
          }
      }).fail(function() {
        isLoggingIn = false;
        alert("Login failed, please try again");
          $("#signinButton").show();
          $("#signinLoader").hide();
      });
  }
}

function getLinkAndRedirect(token) {
    $.ajax({
        method: "GET",
        url: SERVER_URL+"/api/linegroupredir",
        headers: {"Authorization": "Bearer " + token}
    }).done(function (msg) {
        isLoggingIn = false;
        console.log("done E= " + msg.message);
        if (typeof msg.error !== "undefined") {
            console.log("Error");
            $("#signinButton").show();
            $("#signinLoader").hide();
            alert(msg.error);
        } else {
            //TODO get link and redirect
            window.location.href = msg.link;
            $("#signinButton").show();
            $("#signinLoader").hide();
        }
    }).fail(function() {
        isLoggingIn = false;
        alert("Login failed, please try again");
        $("#signinButton").show();
        $("#signinLoader").hide();
    });
}

$( document ).ready(function() {
  $("#signinButton").on('click', function() {
      verifyCreds();
  })
});
