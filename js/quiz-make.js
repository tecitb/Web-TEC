var dataPertanyaan = [];
var jumlahSoal = 0;
const DEFAULT_PILIHAN = 3;

function deletePilihan(objectId){
  $("#"+objectId).remove();
}

function tambahPilihan(questionId){
  var lastId = $("#q-1 .card-body span").attr("data-last");

  pertanyaan = `
  <div id="ansContainer-`+questionId+`-`+lastId+`" class="input-group">
    <input type="text" class="form-control ans-`+ questionId+`" placeholder="Pilihan salah">
    <div class="input-group-append">
      <button onclick="deletePilihan('ansContainer-`+questionId+`-`+lastId+`');" class="btn btn-danger" type="button">X</button>
    </div>
  </div>
  `;

  $("#q-"+questionId+" .card-body form .form-group").append(pertanyaan);

  lastId++;
  $("#q-1 .card-body span").attr("data-last",lastId);

}

function addQuiz(tipe){
  console.log(tipe);
  jumlahSoal ++;

  var pertanyaan = `
  <div id="q-` + jumlahSoal + `" tipe-soal="` + tipe +`"class="card mb-3">
    <div class="card-header">
      <h5>Q`+jumlahSoal+`</h5>
      <textarea class="form-control" id="soal-`+jumlahSoal+`" placeholder="Soal" aria-label="Soal" rows="2"></textarea>
    </div>
    <div class="card-body">
    <form>
      <div class="form-group">
        <label>Jawaban : </label>`;

  if(tipe == "pilgan"){

    var i = 1;

    pertanyaan += `
    <div id="ansContainer-`+jumlahSoal+`-a" class="input-group">
      <input type="text" class="form-control" id="ans-`+ jumlahSoal+`-a" placeholder="Pilihan benar">
    </div>
    `;

    while(i<=DEFAULT_PILIHAN){
      pertanyaan += `
      <div id="ansContainer-`+jumlahSoal+`-`+i+`" class="input-group">
        <input type="text" class="form-control ans-`+jumlahSoal+`" placeholder="Pilihan salah">
        <div class="input-group-append">
          <button onclick="deletePilihan('ansContainer-`+jumlahSoal+`-`+i+`');" class="btn btn-danger" type="button">X</button>
        </div>
      </div>
      `;
      i++;
    }

    pertanyaan += `
    </div>
    </form>
    <span data-last="`+i+`" onclick="tambahPilihan(`+ jumlahSoal +`);" class="btn w-100 btn-primary">Tambah pilihan</a>
    </div>
    </div>`;

    $(".quiz-card").append(pertanyaan);
  }else if (tipe== "isian") {
    pertanyaan += `
    <input type="text" class="form-control" id="ans-`+ jumlahSoal +`" placeholder="Jawaban yang benar">
    </div>
    </form>
    </div>
    </div>`;

    $(".quiz-card").append(pertanyaan);

  }
}

function kirimQuiz(){
  $("#sendFeedbackLoc").removeClass("is-invalid");
  $("#judulQuiz").removeClass("is-invalid");
  $("#sendButton").hide();
  $("#sendButtonLoc").append(`<div id="sendLoader" class="loader loader-small"></div>`);
  var verified = true;

  // CEK JUDUL TERISI
  if($("#judulQuiz").val()==""){
    $("#judulQuiz").addClass("is-invalid");
    verified=false;
  }

  //AMBIL JAWABAN
  for(var i = 1;i<=jumlahSoal;i++){
    var tipeSoal = $("#q-"+i).attr("tipe-soal");

    $("#q-"+i).removeClass("border-danger");
    $("#q-"+i+" .card-header").removeClass("bg-danger");
    $("#q-"+i+" .card-header").removeClass("text-white");

    dataPertanyaan[i-1] = {};

    if(tipeSoal=="pilgan"){
      dataPertanyaan[i-1].type = "pilgan";
      if(($("#ans-"+i+"-a").val()=="")||($("#soal-"+i).val()=="")){
        verified = false;
        $("#q-"+i).addClass("border-danger");
        $("#q-"+i+" .card-header").addClass("bg-danger");
        $("#q-"+i+" .card-header").addClass("text-white");
      }else{
        dataPertanyaan[i-1].question = $("#soal-"+i).val();
        dataPertanyaan[i-1].answer = $("#ans-"+i+"-a").val();
      }
      dataPertanyaan[i-1].decoy={};
      $(".ans-"+i).each(function( index) {
        if($(this).val()==""){
          verified = false;
          $("#q-"+i).addClass("border-danger");
          $("#q-"+i+" .card-header").addClass("bg-danger");
          $("#q-"+i+" .card-header").addClass("text-white");
        }else{
          dataPertanyaan[i-1].decoy[index] = $(this).val();
        }
      });

    }else if (tipeSoal=="isian") {
      dataPertanyaan[i-1].type = "isian";
      if(($("#ans-"+i).val()=="")||($("#soal-"+i).val()=="")){
        verified = false;
        $("#q-"+i).addClass("border-danger");
        $("#q-"+i+" .card-header").addClass("bg-danger");
        $("#q-"+i+" .card-header").addClass("text-white");
      }else{
        dataPertanyaan[i-1].question = $("#soal-"+i).val();
        dataPertanyaan[i-1].answer = $("#ans-"+i).val();
      }

    }else {
      verified = false;
    }
  }

  if(verified){
    $.ajax({
      method: "POST",
      url: SERVER_URL+"/api/quiz",
      headers: {"Authorization": "Bearer " + Cookies.get("token")},
      data: {"title":$("#judulQuiz").val(),
             "question_answer":dataPertanyaan
            },
      dataType: 'json'
    })
    .done(function( msg ) {
      $("#sendLoader").remove();
      if(typeof msg.error != "undefined"){
        $("#sendButton").show();
        $("#sendFeedbackLoc").addClass("is-invalid");
        $("#sendFeedback").html("Gagal : " + msg.error.text);
      }else{
        $("#sendFeedbackLoc").addClass("is-valid");
        setTimeout(function(){window.location.href = BASE_URL + "/admin";}, 1000);
      }


    }).fail(function( jqXHR, textStatus ) {
      $("#sendFeedbackLoc").addClass("is-invalid");
      $("#sendButton").show();
      $("#sendLoader").remove();
      alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );

    });
  }else{
    $("#sendFeedbackLoc").addClass("is-invalid");
    $("#sendFeedback").html("Gagal : Pastikan semua terisi");
    $("#sendButton").show();
    $("#sendLoader").remove();
  }


}
