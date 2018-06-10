var quizID = window.location.hash.substring(1)
var questionCount = 0;
var currPage = 1;
var showAll = false;
const QUESTION_PER_PAGE = 10;

function addQuestion(questionObject){

  var page_location=Math.ceil(questionCount/QUESTION_PER_PAGE);

  var pertanyaan = `
    <div id="q-` + questionObject.id + `" class="card mb-3">
      <h5 class="card-header">Q` + questionObject.id + ` - ` + questionObject.question+ `</h5>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label>Jawaban : </label>`;

  if(questionObject.type == "pilgan"){
    var pilihan = questionObject.option.split(',');

    for (var i = 0; i < pilihan.length; i++) {
      pertanyaan += `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="ans`+ questionObject.id +`" value="`+i+`">
          <label class="form-check-label" for="ans`+ questionObject.id + `-`+ i +`">
            `+ pilihan[i]+`
          </label>
        </div>`;
    }

    pertanyaan += `
          </div>
        </form>
      </div>
    </div>`;

    $(".quiz-card").append(pertanyaan);


  }else if (questionObject.type == "isian") {
    pertanyaan += `
            <input type="text" class="form-control" id="ans`+ questionObject.id +`" placeholder="Jawaban Anda">
          </div>
        </form>
      </div>
    </div>`;

    $(".quiz-card").append(pertanyaan);

  }else {
    console.log("Error quiz type invalid");
    alert("Error");
    window.location.href = "/quiz-pre.html";
  }

  if(page_location!=currPage){
    $("#q-"+questionObject.id).hide();
  }

  questionCount++;

}

function paginationRefresh(){
  $(".pagination").empty();
  if(questionCount>QUESTION_PER_PAGE){
    $(".pagination").append(`<li class="page-item"><span class="page-link" onclick="prevPage()">Sebelum</a></li>`);

    var maxPage = Math.ceil(questionCount/QUESTION_PER_PAGE);
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
  for(var i = 1; i<=questionCount;i++){
    // out of range check
    if((i<(((currPage-1)*QUESTION_PER_PAGE)+1))||(i>(currPage*QUESTION_PER_PAGE))){
      $("#q-"+i).hide();

    }else{
      $("#q-"+i).show();
    }
  }
}

function nextPage(){
  var maxPage = Math.floor(questionCount/QUESTION_PER_PAGE)+1;
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

function showAll(){
  if(showAll){
    showAll=false;
  }else {
    showAll=true;
  }
}


$( document ).ready(function() {
  if(quizID==""){
    console.log("quizID Not set");
    window.location.href = "/quiz-pre.html";

  }else{
    $("#judulQuiz").val("Quiz " + quizID);

    console.log("Start loading isi quiz");

    $.ajax({
      method: "GET",
      url: SERVER_URL+"/api/quiz/"+quizID,
      headers: {"Authorization": "Bearer " + Cookies.get("token")}
    })
    .done(function( msg ) {
      console.log("sukses ambil isi kuis");
      $("#judulQuiz").val("Quiz " + quizID + " - " + value[0].title);

      $.each(msg, function( index, value ) {
        addQuestion(value)
      });

      paginationRefresh();
      $(".loader").hide();
    }).fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
      window.location.href = "/quiz-pre.html";
    });


  }


});
