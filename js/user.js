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

function testAJAX(){
  $.ajax({
    method: "GET",
    url: "https://tec-rest.didithilmy.com/public/index.php/api/login",
    data: { email: "demokader@tec.itb.ac.id", password: "passwordbaruterkini" }
  })
  .done(function( msg ) {
    alert( "Data Saved: " + msg );
  });
}
