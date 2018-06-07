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
  console.log('hahaha');
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
    url: "https://tec-rest.didithilmy.com/public/index.php/login",
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
});

function testAJAX(){
  $.ajax({
    method: "POST",
    url: "https://tec-rest.didithilmy.com/public/index.php/login",
    data: { email: "demokader@tec.itb.ac.id", password: "passwordbaruterkini" }
  })
  .done(function( msg ) {
    alert( "Data Saved: " + msg.token );
  });
}
