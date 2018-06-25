const SERVER_URL = "http://localhost/Server/kader/public/index.php";

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
  Cookies.remove("nickname");
  Cookies.remove("tec_regno");
  window.location.href = BASE_URL;
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
              getProfile("/quiz");
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

  $.when( getProfileData(Cookies.get("uid")) ).then(function( data, textStatus, jqXHR ) {

    Cookies.set("name",data.name);
    Cookies.set("nickname",data.nickname);
    Cookies.set("tec_regno",data.tec_regno);
    Cookies.set("isAdmin", data.isAdmin == "1");

    window.location.href = BASE_URL + redirect;
  },function( jqXHR, textStatus, errorThrown){
    alert("Failed to get profile : "+textStatus+"/"+jqXHR.statusText);
  });

}

async function getProfileData(uid){
  return await $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/user/"+uid,
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  });
}

function reloadNavElement(){
  if(isLoggedIn()){
    $("#loginMenuTxt").text(Cookies.get("nickname") + " ");
    $("#pname").text(Cookies.get("name"));
    $("#ptecregno").text(Cookies.get("tec_regno"));
    $("#loginMenuDrop").remove();

    $('#logoutButton').click(logout);

    $(".logged-in").fadeIn(0);
  }else{
    $("#userMenuDrop").remove();
  }
}

$( document ).ready(function() {
  reloadNavElement();
  if(($.inArray(window.location.pathname,["/quiz","/quiz-do"]))!= -1) {
    if(!isLoggedIn()){
      console.log("redirect to home");
      window.location.href = BASE_URL;
    }
  }
});
