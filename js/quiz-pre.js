var quizCount = 0;
var currPage = 1;
const QUIZPERPAGE = 6;

function addQuizCard(quizObject){

  var page_location=Math.floor(quizCount/QUIZPERPAGE)+1;

  $(".card-columns.quiz-card").append(`
    <div id="quiz-`+ quizObject.id +`" class="card">
      <h5 class="card-header">Quiz` + quizObject.id + `</h5>
      <div class="card-body">
        <h5 class="card-title">` + quizObject.title + `</h5>
        <p class="card-text">Quiz asdsadkajdlasjdasa dsad sad as dlsa ldsa ldsa </p>
        <a href="quiz-do.html#`+ quizObject.id +`" class="btn btn-primary">Kerjakan</a>
      </div>
    </div>
  `)

  if(page_location!=currPage){
    $("#quiz-"+quizObject.id).hide();
  }

  quizCount++;

}

function paginationRefresh(){
  $(".pagination").empty();
  if(quizCount>QUIZPERPAGE){
    $(".pagination").append(`<li class="page-item"><span class="page-link" onclick="prevPage()">Sebelum</a></li>`);

    var maxPage = Math.floor(quizCount/QUIZPERPAGE)+1;
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
    if((i<((currPage*6)-5))||(i>(currPage*6))){
      $("#quiz-"+i).hide();

    }else{
      $("#quiz-"+i).show();

    }
  }
}

function nextPage(){
  var maxPage = Math.floor(quizCount/QUIZPERPAGE)+1;
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
    url: "https://tec-rest.didithilmy.com/public/index.php/api/quiz",
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {
    console.log("sukses ambil kuis");
    $.each(msg, function( index, value ) {

      addQuizCard(value);

    });
    paginationRefresh();
  });

});
