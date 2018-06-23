/**
 * Created by didithilmy on 6/23/18.
 */

/* Performs checks if user has admin privileges */
$(document).ready(function () {
   if(Cookies.get("isAdmin") !== "true") {
       window.location.href = BASE_URL;
   }
});