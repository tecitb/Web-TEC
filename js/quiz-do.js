var quizID = window.location.hash.substring(1)
var questionCount = 0;
var currPage = 1;
var showAll = false;
const QUESTION_PER_PAGE = 10;

function addQuestion(questionObject){

  var page_location=Math.floor(questionCount/QUESTION_PER_PAGE)+1;

  questionCount++;

  var pertanyaan = `
    <div id="q-` + questionCount + `" data-qid="`+ questionObject.id +`" tipe-soal="` + questionObject.type +`"class="card question-card mb-3">
      <h5 class="card-header">Q` + questionCount + ` - ` + questionObject.question+ `</h5>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label>Jawaban : </label>`;

  if(questionObject.type == "pilgan"){


    pertanyaan += `
      <div class="form-check d-none">
        <input class="form-check-input" type="radio" name="ans`+ questionCount +`" value="-99" checked>
        <label class="form-check-label" for="ans`+ questionCount + `--99">
          Empty
        </label>
      </div>`;

    for (var i = 0; i < questionObject.option.length; i++) {
      pertanyaan += `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="ans`+ questionCount +`" value="`+i+`">
          <label class="form-check-label" for="ans`+ questionCount + `-`+ i +`">
            `+ questionObject.option[i]+`
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
            <input type="text" class="form-control" id="ans`+ questionCount +`" placeholder="Jawaban Anda">
          </div>
        </form>
      </div>
    </div>`;

    $(".quiz-card").append(pertanyaan);

  }else {
    console.log("Error quiz type invalid");
    alert("Error");
    window.location.href = BASE_URL + "/quiz";
  }

  if(page_location!=currPage){
    $("#q-"+questionCount).hide();
  }



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

function submitQuiz(){
  $("#submitForm div").hide();
  $("#submitButton").hide();
  $("#submitForm").append(`<div id="submitLoader" class="loader loader-small"></div>`);

  var dataJawaban = [];
  var terisi = true;

  for(var i = 1; i<=questionCount;i++){
    var jawaban;

    if($("#q-"+i).attr("tipe-soal")=="pilgan"){
      var pilihanValue = $("input[name=ans"+i+"]:checked").val();
      if(pilihanValue!=-99){
        $("#q-"+i).removeClass("border-danger");
        $("#q-"+i+" h5").removeClass("bg-danger");
        $("#q-"+i+" h5").removeClass("text-white");

        jawaban = $('[for="ans'+i+'-'+pilihanValue+'"]').html().trim();
        dataJawaban[i-1] = {};
        dataJawaban[i-1].qa_id = $("#q-"+i).attr("data-qid");
        dataJawaban[i-1].answer = jawaban;
      }else{
        $("#q-"+i).addClass("border-danger");
        $("#q-"+i+" h5").addClass("bg-danger");
        $("#q-"+i+" h5").addClass("text-white");
        terisi = false;
      }


    }else if ($("#q-"+i).attr("tipe-soal")=="isian") {
      jawaban = $("#ans"+i).val();
      if(jawaban!=""){
        $("#q-"+i).removeClass("border-danger");
        $("#q-"+i+" h5").removeClass("bg-danger");
        $("#q-"+i+" h5").removeClass("text-white");

        dataJawaban[i-1] = {};
        dataJawaban[i-1].qa_id = $("#q-"+i).attr("data-qid");
        dataJawaban[i-1].answer = jawaban;
      }else{
        $("#q-"+i).addClass("border-danger");
        $("#q-"+i+" h5").addClass("bg-danger");
        $("#q-"+i+" h5").addClass("text-white");
        terisi = false;
      }


    }else {
      console.log("Gagal ambil semua jawaban");
      alert("Error, cek koneksi dan refresh");
    }
  }

  if(terisi){
    $.ajax({
      method: "POST",
      url: SERVER_URL+"/api/answer",
      headers: {"Authorization": "Bearer " + Cookies.get("token")},
      data: {"quiz_id": quizID, "answers": dataJawaban },
      dataType: 'json'
    }).done(function( msg ) {
      if(typeof msg.notice != "undefined"){
        if(msg.notice.type == "success"){
            window.location.href = BASE_URL + "/quiz";
        }
      }

    }).fail(function( jqXHR, textStatus ) {
      console.log(textStatus);
      alert("Error, tolong coba lagi");
    });
  }else {
    $("#submitButton").show();
    $("#submitLoader").remove();
    $("#submitForm div").show();
  }



}


$( document ).ready(function() {
  if(quizID==""){
    console.log("quizID Not set");
    window.location.href = BASE_URL + "/quiz";

  }else{
    $("#judulQuiz").html("Quiz " + quizID);

    console.log("Start loading isi quiz");

    $.ajax({
      method: "GET",
      url: SERVER_URL+"/api/quiz/"+quizID,
      headers: {"Authorization": "Bearer " + Cookies.get("token")}
    })
    .done(function( msg ) {
      console.log("sukses ambil isi kuis");
      $("#judulQuiz").html("Quiz " + quizID + " - " + msg[0].title);

      $.each(msg, function( index, value ) {
        addQuestion(value)
      });

      paginationRefresh();
      $(".loader").hide();
    }).fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus );
      window.location.href = BASE_URL + "/quiz";
    });


  }


});
