//Currently selected quiz
var selected = 0;

//curent sorting method
var sortedBy = "";

var currentPage = 1;
var pageCount = 1;
const SCORE_PER_PAGE = 20;

//Set sorting method
function sortScore(type){
  if(sortedBy != type){
    sortedBy = type;
    getQuizData(selected);
  }
}

function closeQuiz(qid){
  if (selected != qid) {
    alert("Error, please refresh");
  }else {
    $.ajax({
      method: "POST",
      url: SERVER_URL+"/api/quiz/"+qid+"/close",
      headers: {"Authorization": "Bearer " + Cookies.get("token")}
    })
    .done(function( msg ) {
      //Check if not error
      if(msg.notice.type == "error"){
        //Error
        alert("Gagal : " + msg.notice.text);
      }else if(msg.notice.type=="success"){
        //Berhasil

        alert("sukses");

        $("#quiz-"+qid).attr("data-open",0);
        $("#quiz-"+qid).html($("#quiz-"+qid).html().slice(0,-7));

        getQuizData(qid);
      }else{

        alert("Unknown response");
      }

    }).fail(function( jqXHR, textStatus ) {
      //Error dalam pengiriman
      alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
    });
  }
}

function openQuiz(qid){
  if (selected != qid) {
    alert("Error, please refresh");
  }else {
    $.ajax({
      method: "POST",
      url: SERVER_URL+"/api/quiz/"+qid+"/open",
      headers: {"Authorization": "Bearer " + Cookies.get("token")}
    })
    .done(function( msg ) {
      //Check if not error
      if(msg.notice.type == "error"){
        //Error
        alert("Gagal : " + msg.notice.text);
      }else if(msg.notice.type=="success"){
        //Berhasil

        alert("sukses");

        $("#quiz-"+qid).attr("data-open",1);
        $("#quiz-"+qid).html($("#quiz-"+qid).html()+" (open)");

        getQuizData(qid);
      }else{

        alert("Unknown response");
      }

    }).fail(function( jqXHR, textStatus ) {
      //Error dalam pengiriman
      alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
    });
  }
}

function refreshPagination(){
  $("#paginationInput").val(currentPage);
}

function prevPage(){
  if(currentPage>1){
    currentPage = currentPage - 1
  }else {
    currentPage = 1;
  }

  refreshPagination();
  getQuizData(selected);
}

function nextPage(){
  if(currentPage<pageCount){
    currentPage = currentPage + 1;
  }else{
    currentPage = pageCount;
  }

  refreshPagination();
  getQuizData(selected);
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
        isiList += `<span onclick="getQuizData('`+ value.id +`');" data-open="`+value.isOpen+`" id="quiz-`+value.id+`"
                    class="list-group-item list-group-item-action">` + value.title;
        if(value.isOpen==1){
          isiList += " (open)";
        }
        isiList += `</span>`;
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

  if(selected!=quizID){
    currentPage = 1;
  }

  //Efek aktif pada tombol
  $("#quiz-"+quizID).addClass("active");
  selected = quizID;

  //Load quiz

  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/quiz/"+quizID+"/score",
    data:{"sort":sortedBy,"page":currentPage,"items_per_page":SCORE_PER_PAGE},
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  }).done(function(msg){
    pageCount = Math.ceil(msg.total/SCORE_PER_PAGE);

    //fill data
    dataHTML = `
                  <div class="mb-3 hidden-md-up"></div>
                  <div class="row align-items-center">
                  <div class="col-lg-4">
                    <h3 class="text-md-left text-center">`+$("#quiz-"+quizID).html()+`</h3>
                  </div>
                  <div class="col-lg-8">
                    <div class="row justify-content-center">
                      <div class="dropdown text-center col-md-3">
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
                      <div class="mt-2 mt-md-0 col-md-3">
                        <button onclick="deleteQuiz('`+quizID+`');" class="btn btn-danger w-100">Delete</button>
                      </div>`;

    if($("#quiz-"+quizID).attr("data-open")==0){
      dataHTML +=  `
                        <div class="mt-2 mt-md-0 col-md-3">
                          <button onclick="openQuiz('`+quizID+`');" class="btn btn-success w-100">Reopen</button>
                        </div>`;
    }else{
      dataHTML +=  `
                        <div class="mt-2 mt-md-0 col-md-3">
                          <button onclick="closeQuiz('`+quizID+`');" class="btn btn-warning w-100">Close</button>
                        </div>`;
    }


    dataHTML +=  `
                      <div class="mt-2 mt-md-0 col-md-3">
                        <a href="`+BASE_URL+"/admin/quiz/edit/"+quizID+`" class="btn btn-primary w-100">Edit</a>
                      </div>
                    </div>
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

    $.each(msg.data,function(index,value){
      var nomor = ((currentPage-1)*SCORE_PER_PAGE)+index+1;


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

    dataHTML += `
    <nav id="paginationLoc" class="mt-2">
      <ul class="pagination justify-content-end mb-0">
        <li class="page-item">
          <a class="page-link" onclick="prevPage();" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item"><input id="paginationInput" class="no-spinners text-center page-link" type="number"></input></li>
        <li class="page-item">
            <a class="page-link" onclick="nextPage();" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
    </nav>



    `;

    $("#quizDataLoc").empty();
    $("#quizDataLoc").append(dataHTML);

    refreshPagination();
    $('#paginationInput').on('change',function(e){
      var pageInput = $("#paginationInput").val();

        pageInput = Number.parseInt(pageInput);

        if(pageInput !== currentPage){
        if(pageInput>pageCount){
          currentPage = pageCount;
        }else if(pageInput<1){
          currentPage = 1;
        }else {
          currentPage = pageInput;
        }

        refreshPagination();
        getQuizData(selected);
      }
    });

  }).fail(function(jqXHR,textStatus){
    //connection or server fail
    alert("Failed to get profile : "+textStatus+"/"+jqXHR.statusText);
  });

}

$(document).ready(function () {


  getAllQuiz();
});
