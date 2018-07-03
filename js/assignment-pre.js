var assignmentCount = 0;
var currPage = 1;
const ASSIGNMENTPERPAGE = 6;

function addAssignmentCard(assignmentObject){

  var page_location=Math.floor(assignmentCount/ASSIGNMENTPERPAGE)+1;

  var inserted = `
    <div id="quiz-`+ assignmentObject.id +`" class="card">
      <h5 class="card-header">Assignment  ` + assignmentObject.id + `</h5>
      <div class="card-body">
        <h5 class="card-title">` + assignmentObject.title + `</h5>
        <p class="card-text">`+assignmentObject.description+`</p>`;
  // if(assignmentObject.terjawab==0){
  //   inserted+=`<a href="` + BASE_URL + `/quiz-do#`+ assignmentObject.id +`" class="btn btn-primary">Kerjakan</a>
  //     </div>
  //   </div>`
  // }else {
  //   inserted+=`<span class="btn btn-success disabled">Score : `+ assignmentObject.score +`</a>
  //     </div>
  //   </div>`
  // }
  if(assignmentObject.terkirim==0){
    inserted+=`<a href="` + BASE_URL + `/assignment-do#`+ assignmentObject.id +`" class="btn btn-primary" style="white-space: normal;">Kirim</a>
      </div>
    </div>`
  }else {
    inserted+=`<a href="` + BASE_URL + `/assignment-do#d`+ assignmentObject.id +`" class="btn btn-warning" style="white-space: normal;">Kirim ulang</a>
      </div>
    </div>`
  }


  $(".card-columns.quiz-card").append(inserted);




  if(page_location!=currPage){
    $("#quiz-"+assignmentObject.id).hide();
  }

  assignmentCount++;

}

function paginationRefresh(){
  $(".pagination").empty();
  if(assignmentCount>ASSIGNMENTPERPAGE){
    $(".pagination").append(`<li class="page-item"><span class="page-link" onclick="prevPage()">Sebelum</a></li>`);

    var maxPage = Math.ceil(assignmentCount/ASSIGNMENTPERPAGE);
    for(var i=1; i <= maxPage; i++){
      if(currPage==i){
        $(".pagination").append(`<li class="page-item active"><span class="page-link">`+i+`</a></li>`);
      }else{
        $(".pagination").append(`<li class="page-item"><span class="page-link">`+i+`</a></li>`);
      }

    }

    $(".pagination").append(`<li class="page-item"><span class="page-link" onclick="nextPage()">Berikut</a></li>`);
  }
}

function pageRefresh(){
  for(var i = 1; i<=assignmentCount;i++){
    // out of range check
    if((i<(((currPage-1)*ASSIGNMENTPERPAGE)+1))||(i>(currPage*ASSIGNMENTPERPAGE))){
      $("#quiz-"+i).hide();

    }else{
      $("#quiz-"+i).show();

    }
  }
}

function nextPage(){
  var maxPage = Math.ceil(assignmentCount/ASSIGNMENTPERPAGE);
  if(currPage<maxPage){
    currPage++;
    paginationRefresh();
    pageRefresh();
  }
}

function prevPage(){
  if(currPage>1){
    currPage--;
    paginationRefresh();
    pageRefresh();
  }
}

$( document ).ready(function() {
  console.log("Start loading assignment");

  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/assignment",
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {
    console.log("sukses ambil assignment");
    $.each(msg, function( index, value ) {

      addAssignmentCard(value);

    });
    paginationRefresh();
    $(".loader").hide();
  }).fail(function( jqXHR, textStatus ) {
    alert( "Request failed: " + textStatus );
  });

});
