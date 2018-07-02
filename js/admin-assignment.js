//Currently selected quiz
var selected = 0;

//curent sorting method
var sortedBy = "";

//Set sorting method
function sortScore(type){
  if(sortedBy != type){
    sortedBy = type;
    getAssignmentData(selected);
  }
}

// Get all quiz data and display them in list
function getAllQuiz(){

  //Request all quiz
  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/assignment",
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {
    //Check if not error
    if(typeof msg.error != "undefined"){
      //Error
      alert("Gagal : " + msg.error.text);
    }else {
      //Berhasil

      //Empty the list
      $("#quizList").empty();
      var isiList = "";
      $.each(msg,function(index, value){
        isiList += `<span onclick="getAssignmentData('`+ value.id +`');" id="quiz-`+value.id+`"
                    class="list-group-item list-group-item-action">` + value.title + `</span>`;
      });

      //Append to location
      $("#quizList").append(isiList);
    }

  }).fail(function( jqXHR, textStatus ) {
    //Error dalam pengiriman
    alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
  });
}

//delete assignment
function deleteAssignment(){
  $.ajax({
    method: "DELETE",
    url: SERVER_URL+"/api/assignment/"+selected,
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {
    //Check if not error
    if(typeof msg.error != "undefined"){
      //Error
      alert("Gagal : " + msg.error.text);
    }else {
      //Berhasil
      alert("Berhasil");

      location.reload();

    }

  }).fail(function( jqXHR, textStatus ) {
    //Error dalam pengiriman
    alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
  });
}

// Get single quiz data and display them
function getAssignmentData(assignmentID){

  //Hapus centering
  $("#quizDataLoc").removeClass("my-auto");

  //Add loader
  $("#quizDataLoc").empty();
  $("#quizDataLoc").append(`<div class="loader loader-big" id="scoreLoader"></div>`);

  //Cek apakah ada quiz yang dipilih sebelumya
  if(selected!=0){
    //Deselect last selected user
    $("#quiz-"+selected).removeClass("active");
  }

  //Efek aktif pada tombol
  $("#quiz-"+assignmentID).addClass("active");
  selected = assignmentID;

  //Load quiz

  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/assignment/"+assignmentID+"/submission",
    data:{"sort":sortedBy},
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  }).done(function(msg){
    //fill data
    dataHTML = `
                  <div class="mb-3 hidden-md-up"></div>
                  <div class="row align-items-center">
                  <div class="col-md-6">
                    <h3 class="text-md-left text-center">`+$("#quiz-"+assignmentID).html()+`</h3>
                  </div>
                  <div class="col-md-2 text-center">
                    <span data-toggle="modal" data-target="#deleteModal" class="btn btn-danger">Hapus</span>

                  </div>
                  <div class="col-md-2 mt-2 mt-md-0 text-center">
                    <a href="`+ BASE_URL +`/admin/assignment/add#`+assignmentID+`" class="btn btn-primary">Edit</a>
                  </div>
                  <div class="mt-2 mt-md-0 dropdown text-center col-md-2">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownSort" data-toggle="dropdown">
                      Sort
                    </button>
                    <div class="dropdown-menu">
                      <span class="dropdown-item" onclick="sortScore('noTEC_asc');">No Tec(asc)</span>
                      <span class="dropdown-item" onclick="sortScore('noTEC_desc');">No Tec(desc)</span>
                      <span class="dropdown-item" onclick="sortScore('nama_asc');">Nama(asc)</span>
                      <span class="dropdown-item" onclick="sortScore('nama_desc');">Nama(desc)</span>
                      <span class="dropdown-item" onclick="sortScore('waktu_asc');">Waktu(asc)</span>
                      <span class="dropdown-item" onclick="sortScore('waktu_desc');">Waktu(desc)</span>

                    </div>
                  </div>
                </div>
                <hr/>
                <div class="table-responsive-sm">
                <table class="table">
                  <thead>
                    <th>No.</th>
                    <th>no. TEC</th>
                    <th>NIM</th>
                    <th>Nama</th>
                    <th>Waktu</th>
                    <th class="text-center">Download</th>
                  </thead>
                  <tbody>
    `;

    $.each(msg,function(index,value){
      var nomor = index+1;

      dataHTML+=`
                    <tr>
                      <th>`+nomor+`</th>
                      <td>`+value.tec_regno+`</td>
                      <td>`+value.NIM+`</td>
                      <td>`+value.name+`</td>
                      <Td>`+value.uploaded_at+`</td>
                      <Td class="text-center"><a href="`+BASE_URL+"/assignment/download/"+value.filename+`"<i class="fas fa-download "></i></a></td>

                    </tr>
      `;

    });

    //close table
    dataHTML += `
                  </tbody>
                </table>
                </div>
    `;

    $("#quizDataLoc").empty();
    $("#quizDataLoc").append(dataHTML);

  }).fail(function(jqXHR,textStatus){
    //connection or server fail
    alert("Connection or server failed : "+textStatus+"/"+jqXHR.statusText);
  });

}

$(document).ready(function () {
  getAllQuiz();
});
