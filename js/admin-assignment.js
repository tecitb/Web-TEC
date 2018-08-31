//Currently selected quiz
var selected = 0;

//curent sorting method
var sortedBy = "";

var currentPage = 1;
var pageCount = 1;
const ASSIGNMENT_PER_PAGE = 20;

//Set sorting method
function sortScore(type){
  if(sortedBy != type){
    sortedBy = type;
    getAssignmentData(selected);
  }
}

function closeAssignment(aid){
  if (selected != aid) {
    alert("Error, please refresh");
  }else {
    $.ajax({
      method: "POST",
      url: SERVER_URL+"/api/assignment/"+aid+"/close",
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

        $("#assignment-"+aid).attr("data-open",0);
        $("#assignment-"+aid).html($("#assignment-"+aid).html().slice(0,-7));

        getAssignmentData(aid);
      }else{

        alert("Unknown response");
      }

    }).fail(function( jqXHR, textStatus ) {
      //Error dalam pengiriman
      alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
    });
  }
}

function openAssignment(aid){
  if (selected != aid) {
    alert("Error, please refresh");
  }else {
    $.ajax({
      method: "POST",
      url: SERVER_URL+"/api/assignment/"+aid+"/open",
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

        $("#assignment-"+aid).attr("data-open",1);
        $("#assignment-"+aid).html($("#assignment-"+aid).html()+" (open)");



        getAssignmentData(aid);
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
  getAssignmentData(selected);
}

function nextPage(){
  if(currentPage<pageCount){
    currentPage = currentPage + 1;
  }else{
    currentPage = pageCount;
  }

  refreshPagination();
  getAssignmentData(selected);
}

// Get all quiz data and display them in list
function getAllAssignment(){

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
        isiList += `<span onclick="getAssignmentData('`+ value.id +`');" data-open="`+value.isOpen+`" id="assignment-`+value.id+`"
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
    $("#assignment-"+selected).removeClass("active");
  }

  if(selected!=assignmentID){
    currentPage = 1;
  }

  //Efek aktif pada tombol
  $("#assignment-"+assignmentID).addClass("active");
  selected = assignmentID;

  //Load quiz

  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/assignment/"+assignmentID+"/submission",
    data:{"sort":sortedBy,"page":currentPage,"items_per_page":ASSIGNMENT_PER_PAGE},
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  }).done(function(msg){
    pageCount = Math.ceil(msg.total/ASSIGNMENT_PER_PAGE);

    //fill data
    dataHTML = `
                  <div class="mb-3 hidden-md-up"></div>
                  <div class="row align-items-center">
                  <div class="col-lg-4">
                    <h3 class="text-md-left text-center">`+$("#assignment-"+assignmentID).html()+`</h3>
                  </div>
                  <div class="col-lg-8">
                    <div class="row justify-content-center">
                      <div class="mt-2 mt-md-0 dropdown text-center col-md-3">
                        <button class="w-100 btn btn-primary dropdown-toggle" type="button" id="dropdownSort" data-toggle="dropdown">
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

                      <div class="col-md-3 mt-2 mt-md-0 text-center">
                        <span data-toggle="modal" data-target="#deleteModal" class="w-100 btn btn-danger">Hapus</span>
                      </div>`;

    if($("#assignment-"+assignmentID).attr("data-open")==0){
      dataHTML += `
                        <div class="mt-2 mt-md-0 col-md-3 text-center">
                          <button onclick="openAssignment('`+assignmentID+`');" class="btn btn-success w-100">Reopen</button>
                        </div>`;
    }else{
      dataHTML += `
                        <div class="mt-2 mt-md-0 col-md-3 text-center">
                          <button onclick="closeAssignment('`+assignmentID+`');" class="btn btn-warning w-100">Close</button>
                        </div>`;
    }



    dataHTML += `
                      <div class="col-md-3 mt-2 mt-md-0 text-center">
                        <a href="`+ BASE_URL +`/admin/assignment/add#`+assignmentID+`" class="w-100 btn btn-primary">Edit</a>
                      </div>
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

    $.each(msg.data,function(index,value){
      var nomor = ((currentPage-1)*ASSIGNMENT_PER_PAGE)+index+1;

      dataHTML+=`
                    <tr>
                      <th>`+nomor+`</th>
                      <td>`+value.tec_regno+`</td>
                      <td>`+value.NIM+`</td>
                      <td>`+value.name+`</td>
                      <Td>`+value.uploaded_at+`</td>
                      <Td class="text-center"><a href="`+value.file_url+`"><i class="fas fa-download "></i></a></td>

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
    alert("Connection or server failed : "+textStatus+"/"+jqXHR.statusText);
  });

}

$(document).ready(function () {
  getAllAssignment();

});
