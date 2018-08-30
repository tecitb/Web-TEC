var quizCount = 0;
var currPage = 1;
const QUIZPERPAGE = 6;

function addQuizCard(quizObject){

  var page_location=Math.floor(quizCount/QUIZPERPAGE)+1;

  var inserted = `
    <div id="quiz-`+ quizObject.id +`" class="card">
      <h5 class="card-header">Quiz` + quizObject.id + `</h5>
      <div class="card-body">
        <h5 class="card-title">` + quizObject.title + `</h5>
        <!--<p class="card-text">Quiz desc </p>-->`;
  if(quizObject.terjawab==0){
    if(quizObject.isOpen==0){
      inserted+=`<span class="btn btn-danger disabled">Tutup</a>
        </div>
      </div>`;
    }else{
      inserted+=`<a href="` + BASE_URL + `/quiz-do#`+ quizObject.id +`" class="btn btn-primary">Kerjakan</a>
        </div>
      </div>`
    }

  }else {
    inserted+=`<span class="btn btn-success disabled">Score : `+ quizObject.score +`</a>
      </div>
    </div>`
  }

  $(".card-columns.quiz-card").append(inserted);




  if(page_location!=currPage){
    $("#quiz-"+quizObject.id).hide();
  }

  quizCount++;

}

function paginationRefresh(){
  $(".pagination").empty();
  if(quizCount>QUIZPERPAGE){
    $(".pagination").append(`<li class="page-item"><span class="page-link" onclick="prevPage()">Sebelum</a></li>`);

    var maxPage = Math.ceil(quizCount/QUIZPERPAGE);
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
  for(var i = 1; i<=quizCount;i++){
    // out of range check
    if((i<(((currPage-1)*QUIZPERPAGE)+1))||(i>(currPage*QUIZPERPAGE))){
      $("#quiz-"+i).hide();

    }else{
      $("#quiz-"+i).show();

    }
  }
}

function nextPage(){
  var maxPage = Math.ceil(quizCount/QUIZPERPAGE);
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
  console.log("Start loading quiz");

  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/quiz",
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {
    console.log("sukses ambil kuis");
    $.each(msg, function( index, value ) {

      addQuizCard(value);

    });
    paginationRefresh();
    $(".loader").hide();
  }).fail(function( jqXHR, textStatus ) {
    alert( "Request failed: " + textStatus );
  });

});
