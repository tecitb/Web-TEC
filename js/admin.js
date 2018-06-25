/* Performs checks if user has admin privileges */
$(document).ready(function () {
  if(isLoggedIn()){
    if(Cookies.get("isAdmin") !== "true") {
         window.location.href = BASE_URL;
     }
  }else{
    window.location.href = BASE_URL;
  }

});
