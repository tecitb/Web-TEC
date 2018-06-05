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
  Cookies.set("token","xxx");
  Cookies.set("name","testing");
}

/* Menu if loggedin */
$( document ).ready(function() {
    if(isLoggedIn()){
      $("#loginMenuNav").text(Cookies.get("name"));
      $("#loginMenuDrop").remove();

      $('#logoutButton').click(logout);


    }else{
      $("#userMenuDrop").remove();
      $("#signinButton").click(login);

    }
});
