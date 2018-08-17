var assignmentID = window.location.hash.substring(1);

var sudahSubmit = false;

function addAssignment(assignmentObject){
  var pertanyaan = "";

  if(sudahSubmit){
    pertanyaan+=`<div class="alert alert-warning" role="alert">
  File lama Anda akan digantikan
</div>`;
  }

  pertanyaan += `
    <div class="card question-card mb-3">
      <h5 class="card-header">` + assignmentObject.description+ `</h5>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label>File : </label>`;

  pertanyaan += `
          <input id="assignmentUploader" name="assignment" type="file">
        </div>
      </form>
    </div>
  </div>`;



  $(".quiz-card").append(pertanyaan);

}

function submitAssignment(){


}


$( document ).ready(function() {
  if(assignmentID==""){
    console.log("assignmentID Not set");
    window.location.href = BASE_URL + "/assignment";

  }else{
    if (assignmentID.substring(0,1)=="d") {
      sudahSubmit = true;
      assignmentID = assignmentID.substring(1);
    }

    $("#judulQuiz").html("Assignment " + assignmentID);

    $.ajax({
      method: "GET",
      url: SERVER_URL+"/api/assignment/"+assignmentID,
      headers: {"Authorization": "Bearer " + Cookies.get("token")}
    })
    .done(function( msg ) {

      $("#judulQuiz").html("Assignment " + assignmentID + " - " + msg.title);

      addAssignment(msg)

      $("#assignmentUploader").fileinput({
        theme:"fa",
        maxFileCount:1,
        uploadUrl:SERVER_URL+"/api/user/assignment/"+assignmentID,
        showClose:false,
        uploadClass: "btn btn-primary",
        browseOnZoneClick: true,
        showPreview:false,
        ajaxSettings: {
            headers: {"Authorization": "Bearer " + Cookies.get("token")}
        }
      });

      $('#assignmentUploader').on('fileuploaded', function(event, data, previewId, index) {
        setTimeout(function(){window.location.href = BASE_URL + "/assignment"},1000);
      });

      $(".loader").hide();
    }).fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
      window.location.href = BASE_URL + "/assignment";
    });


  }


});
