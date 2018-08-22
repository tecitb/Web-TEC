//Currently selected quiz
var selected = 0;

//curent sorting method
var sortedBy = "";

//Set sorting method
function sortScore(type){
  if(sortedBy != type){
    sortedBy = type;
    getQuizData(selected);
  }
}

// Get all quiz data and display them in list
function getAllQuiz(){

  //Request all quiz
  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/quiz",
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
        isiList += `<span onclick="getQuizData('`+ value.id +`');" id="quiz-`+value.id+`"
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

function deleteQuiz(qid){
  if (selected != qid) {
    alert("Error, please refresh");
  }else {
    $("#deleteModal .modal-body").html("Yakin hapus '"+ $("#quiz-"+qid).html() +"' ?");
    $('#deleteModal').modal('show');
  }
}

function executeDelete(){
  $.ajax({
    method: "DELETE",
    url: SERVER_URL+"/api/quiz/"+selected,
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {
    alert("Sukses");
    location.reload();
  }).fail(function( jqXHR, textStatus ) {
    alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
  });
}

// Get single quiz data and display them
function getQuizData(quizID){

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
  $("#quiz-"+quizID).addClass("active");
  selected = quizID;

  //Load quiz

  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/quiz/"+quizID+"/score",
    data:{"sort":sortedBy},
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  }).done(function(msg){
    //fill data
    dataHTML = `
                  <div class="mb-3 hidden-md-up"></div>
                  <div class="row align-items-center">
                  <div class="col-sm-6">
                    <h3 class="text-md-left text-center">`+$("#quiz-"+quizID).html()+`</h3>
                  </div>
                  <div class="dropdown text-center col-sm-3">
                    <button class="w-100 btn btn-primary dropdown-toggle" type="button" id="dropdownSort" data-toggle="dropdown">
                      Sort
                    </button>
                    <div class="dropdown-menu">
                      <span class="dropdown-item" onclick="sortScore('noTEC_asc');">No Tec(asc)</span>
                      <span class="dropdown-item" onclick="sortScore('noTEC_desc');">No Tec(desc)</span>
                      <span class="dropdown-item" onclick="sortScore('nama_asc');">Nama(asc)</span>
                      <span class="dropdown-item" onclick="sortScore('nama_desc');">Nama(desc)</span>
                      <span class="dropdown-item" onclick="sortScore('score_asc');">Nilai(asc)</span>
                      <span class="dropdown-item" onclick="sortScore('score_desc');">Nilai(desc)</span>

                    </div>
                  </div>
                  <div class="mt-2 mt-sm-0 col-sm-3">
                    <button onclick="deleteQuiz('`+quizID+`');" class="btn btn-danger col-sm-3">Delete</button>
                  </div>
                </div>
                <hr/>
                <div class="table-responsive-sm">
                <table class="table">
                  <thead>
                    <th>No.</th>
                    <th>TEC no.</th>
                    <th>NIM</th>
                    <th>Nama</th>
                    <th>Score</th>
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
                      <Td>`+value.score+`</td>
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
    alert("Failed to get profile : "+textStatus+"/"+jqXHR.statusText);
  });

}

$(document).ready(function () {
  getAllQuiz();
});
