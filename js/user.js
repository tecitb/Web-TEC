const SERVER_URL = "https://tec-rest.didithilmy.com/public/index.php";

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
  location.reload();
}

/*Login*/
function login(){
  console.log($("#emailLogin").val());
  console.log($("#passwordLogin").val());
  console.log("do");
  $.ajax({
    method: "POST",
    url: SERVER_URL+"/login",
    data: { email: $("#emailLogin").val(), password: $("#passwordLogin").val() }
  })
  .done(function( msg ) {
    console.log("done E= "+msg.message);
    if(typeof msg.error !== "undefined"){
      console.log("Error");
    }else {
      Cookies.set("token",msg.token);
      console.log(Cookies.get("token"));
      location.reload();
    }
  });
  Cookies.set("name","testing");

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
