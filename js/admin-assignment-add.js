var assignmentId = window.location.hash.substring(1);
var editMode = false;

function kirimQuiz(){
  $("#sendFeedbackLoc").removeClass("is-invalid");
  $("#judulAssignment").removeClass("is-invalid");
  $("#sendButton").hide();
  $("#sendButtonLoc").append(`<div id="sendLoader" class="loader loader-small"></div>`);
  var verified = true;

  // CEK TERISI
  if($("#judulAssignment").val()==""){
    $("#judulAssignment").addClass("is-invalid");
    verified=false;
  }

  if($("#descAssignment").val()==""){
    $("#descAssignment").addClass("is-invalid");
    verified=false;
  }

  if(verified){
    $.ajax({
      method: getMethod(),
      url: SERVER_URL+"/api/assignment"+getURL(),
      headers: {"Authorization": "Bearer " + Cookies.get("token")},
      data: {"title":$("#judulAssignment").val(),
             "description":$("#descAssignment").val()
            },
      dataType: 'json'
    })
    .done(function( msg ) {
      $("#sendLoader").remove();
      if(typeof msg.error != "undefined"){
        $("#sendButton").show();
        $("#sendFeedbackLoc").addClass("is-invalid");
        $("#sendFeedback").html("Gagal : " + msg.error.text);
      }else{
        $("#sendFeedbackLoc").addClass("is-valid");
        setTimeout(function(){window.location.href = BASE_URL + "/admin";}, 1000);
      }


    }).fail(function( jqXHR, textStatus ) {
      $("#sendFeedbackLoc").addClass("is-invalid");
      $("#sendButton").show();
      $("#sendLoader").remove();
      alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );

    });
  }else{
    $("#sendFeedbackLoc").addClass("is-invalid");
    $("#sendFeedback").html("Gagal : Pastikan semua terisi");
    $("#sendButton").show();
    $("#sendLoader").remove();
  }


}

function getMethod(){
  if(editMode){
    return "PUT";
  }else {
    return "POST";
  }
}

function getURL(){
  if(editMode){
    return "/"+assignmentId;
  }else {
    return "";
  }
}

function getAssignment(){
  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/assignment/"+assignmentId,
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {

    $("#judulAssignment").val(msg.title);
    $("#descAssignment").val(msg.description);

    $("#sendButton").html("Edit assignment");



  }).fail(function( jqXHR, textStatus ) {
    alert( "Request failed: " + textStatus );
    window.location.href = BASE_URL + "/admin";
  });
}

$( document ).ready(function() {
  if(assignmentId!=""){
    editMode=true;
    getAssignment();
  }


});
