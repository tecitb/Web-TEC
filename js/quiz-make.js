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
    <input type="text" class="form-control" id="ans-`+ questionId+`" placeholder="Jawaban yang benar">
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

    while(i<=DEFAULT_PILIHAN){
      pertanyaan += `
      <div id="ansContainer-`+jumlahSoal+`-`+i+`" class="input-group">
        <input type="text" class="form-control" id="ans-`+ jumlahSoal+`" placeholder="Jawaban yang benar">
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
  $.ajax({
    method: "POST",
    url: SERVER_URL+"/api/quiz/",
    headers: {"Authorization": "Bearer " + Cookies.get("token")},
    // data: { },
    dataType: 'json'
  })
  .done(function( msg ) {

  }).fail(function( jqXHR, textStatus ) {

  });
}

$( document ).ready(function() {

});
