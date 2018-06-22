const SERVER_URL = "https://tec-rest.didithilmy.com/public";

/* Check token exist */
function isLoggedIn(){
  if(typeof Cookies.get("token") == "undefined"){
    return false;
  }else {
    return true;
  }
}

/*Logout, delete token*/
function logout(){
  console.log("logout");
  Cookies.remove("token");
  Cookies.remove("name");
  Cookies.remove("uid");
  window.location.href = "/index.html";
}

/*Login*/
// This variable is used to keep track if a server call is ongoing.
var isLoggingIn = false;

function login(){
  if(!isLoggingIn) {
      isLoggingIn = true;
      console.log("loggingin");
      $("#signinButton").hide();
      $("#loginMenuDrop form").append('<div id="signinLoader" class="loader loader-small"></div>');
      $.ajax({
          method: "POST",
          url: SERVER_URL + "/api/login",
          data: {email: $("#emailLogin").val(), password: $("#passwordLogin").val()}
      }).done(function (msg) {
        isLoggingIn = false;
          console.log("done E= " + msg.message);
          if (typeof msg.error !== "undefined") {
              console.log("Error");
              $("#signinButton").show();
              $("#signinLoader").remove();
              $("#passwordLogin").addClass("is-invalid");
              $("#emailLogin").addClass("is-invalid");

          } else {
              Cookies.set("token", msg.token);
              Cookies.set("uid", msg.id);
              console.log(Cookies.get("token"));
              getProfile("quiz-pre.html");
          }
      }).fail(function() {
        isLoggingIn = false;
        alert("Login failed, please try again");
          $("#signinButton").show();
          $("#signinLoader").remove();
      });
  }
}

function getProfile(redirect){
  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/user/"+Cookies.get("uid"),
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  }).done(function( msg ) {
    Cookies.set("name",msg.name);
    window.location.href = redirect;
  }).fail(function( jqXHR, textStatus ) {
    alert( "Get profile failed: " + textStatus );
  });

}

function reloadNavElement(){
  if(isLoggedIn()){
    $("#loginMenuNav").text(Cookies.get("name"));
    $("#loginMenuDrop").remove();

    $('#logoutButton').click(logout);


  }else{
    $("#userMenuDrop").remove();
  }
}

$( document ).ready(function() {
  reloadNavElement();
  if(($.inArray(window.location.pathname,["/quiz-pre.html","/quiz-do.html"]))!= -1) {
    if(!isLoggedIn()){
      console.log("redirect to home");
      window.location.href = "/";
    }
  }
});
